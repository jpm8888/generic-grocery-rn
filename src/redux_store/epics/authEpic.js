import {get_pref, KEY_AUTH_TOKEN, save_pref} from '../../logic/prefs';
import Constants, {debugLog} from '../../common/Constants';
import {debounceTime, map, mergeMap, pluck} from 'rxjs/operators';
import {
    AUTH_LOADING,
    completedRegistration,
    FORGOT_REQ,
    forgotPasswordSuccess,
    signedSuccess,
    SIGNUP_REQ,
    signUpSuccess,
    UPDATE_REQ,
    updatePasswordSuccess,
    VERIFY_OTP,
    VERIFY_TOKEN,
    verifySuccess,
} from '../actions/authActions';
import {from} from 'rxjs';
import {ofType} from 'redux-observable';

export const SignUp = (actions$, state$) => {
    debugLog('SignInMiddleware');
    return actions$.pipe(
        ofType(SIGNUP_REQ),
        debounceTime(500), // ignore clicks after 500
        pluck('payload'),
        mergeMap(({nav}) => {
            let {name, mobile, companyName, password} = state$.value.authReducer;
            return from(signUp(companyName, name, mobile, password)).pipe(
                map(json => signUpSuccess(json, nav))
            )
        })
    );
}

export const VerifyRegOTP = (actions$, state$) => {
    return actions$.pipe(
        ofType(VERIFY_OTP),
        debounceTime(500), // ignore clicks after 500
        mergeMap(() => {
            let {otp, otp_id, session_id, companyName, name, mobile, password} = state$.value.authReducer;
            return from(verifyOTP(otp, otp_id, session_id, companyName, name, mobile, password)).pipe(
                map(json => completedRegistration(json))
            )
        })
    );
}

export const SignIn = (actions$, state$) => {
    debugLog('SignInMiddleware');
    return actions$.pipe(
        ofType(AUTH_LOADING),
        debounceTime(500), // ignore clicks after 500
        mergeMap(action => {
            let {mobile, password} = state$.value.authReducer;
            return from(login(mobile, password)).pipe(
                map(token => signedSuccess(token))
            )
        })
    );
}

export const VerifyToken = (actions$, state$) => {
    debugLog('VerifyTokenMiddleware');
    return actions$.pipe(
        ofType(VERIFY_TOKEN),
        debounceTime(500), // ignore clicks after 500
        mergeMap(action => {
            return from(refreshToken()).pipe(
                map(token => verifySuccess(token))
            )
        })
    );
}

export const ForgotPassword = (actions$, state$) => {
    return actions$.pipe(
        ofType(FORGOT_REQ),
        debounceTime(500), // ignore clicks after 500
        mergeMap(action => {
            let {mobile} = state$.value.authReducer;
            return from(forgotPassword(mobile)).pipe(
                map(({otp_id, session_id, msg}) => forgotPasswordSuccess(otp_id, session_id, msg))
            )
        })
    );
}

export const UpdatePassword = (actions$, state$) => {
    return actions$.pipe(
        ofType(UPDATE_REQ),
        debounceTime(500), // ignore clicks after 500
        mergeMap(action => {
            let {otp_id, session_id, otp, new_password} = state$.value.authReducer;
            return from(updatePassword(otp_id, session_id, otp, new_password)).pipe(
                map((json) => updatePasswordSuccess(json))
            )
        })
    );
}

async function refreshToken(){
    let token = await get_pref(KEY_AUTH_TOKEN, '');
    if (token === '' || !token) return null;

    let url = Constants.API_BASE_URL + `auth/refresh`;


    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
    };

    let response = await fetch(url,  {method : 'POST', headers});
    let json = await response.json();

    if (json.status === 0) {
        return null;
    }

    let {access_token} = json.user;
    await save_pref(KEY_AUTH_TOKEN, access_token);
    return access_token;
}

async function login(username, password) {
    let body = new FormData();
    body.append('email', username);
    body.append('password', password);
    let url = Constants.API_BASE_URL + `auth/login`;
    let response = await fetch(url,  {method : 'POST', body : body});
    let json = await response.json();
    if (json.status === 0) {
        alert(json.msg);
        return null;
    }

    let {access_token} = json.user;
    await save_pref(KEY_AUTH_TOKEN, access_token);
    return access_token;
}

async function signUp(companyName, name, mobile, password) {
    let body = new FormData();
    body.append('name', name);
    body.append('mobile', mobile);
    body.append('company_name', companyName);
    body.append('password', password);
    let url = Constants.API_BASE_URL + `flow/gen_otp_signup`;
    let response = await fetch(url,  {method : 'POST', body : body});
    let json = await response.json();
    debugLog(json);
    return json;
}

async function verifyOTP(otp, otp_id, session_id, company_name, name, mobile, password) {
    let body = new FormData();
    body.append('company_name', company_name);
    body.append('name', name);
    body.append('mobile', mobile);
    body.append('otp', otp);
    body.append('otp_id', otp_id);
    body.append('session_id', session_id);
    body.append('password', password);
    let url = Constants.API_BASE_URL + `flow/verify_signup`;
    let response = await fetch(url,  {method : 'POST', body : body});
    let json = await response.json();
    if (json.status === 1){
        let {access_token} = json.user;
        await save_pref(KEY_AUTH_TOKEN, access_token);
    }

    debugLog(json);
    return json;
}

async function forgotPassword(mobile) {
    let body = new FormData();
    body.append('mobile', mobile);
    let url = Constants.API_BASE_URL + `flow/forgot_password`;
    let response = await fetch(url,  {method : 'POST', body : body});
    let json = await response.json();
    if (json.status === 0) {
        alert(json.msg);
        return {otp_id : 0, session_id : ''};
    }
    return json;
}

async function updatePassword(otp_id, session_id, otp, new_password) {
    let body = new FormData();
    body.append('otp_id', otp_id);
    body.append('session_id', session_id);
    body.append('otp', otp);
    body.append('new_password', new_password);
    let url = Constants.API_BASE_URL + `flow/verify_otp`;
    let response = await fetch(url,  {method : 'POST', body : body});
    let json = await response.json();
    return json;
}
