import {get_pref, KEY_AUTH_TOKEN, save_pref} from '../../logic/prefs';
import {ofType} from 'redux-observable';
import {debounceTime, map, mergeMap} from 'rxjs/operators';
import {from} from 'rxjs';
import {LOGOUT, logoutSuccess, UPDATE_PASSWORD, updatePasswordSuccess} from '../actions/settingActions';
import Constants, {debugLog} from '../../common/Constants';


export const Logout = (actions$, state$) => {
    return actions$.pipe(
        ofType(LOGOUT),
        debounceTime(1000), // ignore clicks after 500
        mergeMap(action => {
            return from(setTokenNull()).pipe(
                map(() => logoutSuccess())
            )
        })
    );
}

export const SetNewPassword = (actions$, state$) => {
    return actions$.pipe(
        ofType(UPDATE_PASSWORD),
        debounceTime(1000), // ignore clicks after 500
        mergeMap(action => {
            let {new_pass, confirm_new_pass} = state$.value.settingReducer;
            return from(setNewPassword(new_pass, confirm_new_pass)).pipe(
                map((res) => updatePasswordSuccess(res))
            )
        })
    );
}

async function setNewPassword(pass1, pass2){
    let token = await get_pref(KEY_AUTH_TOKEN, '');
    if (token === '' || !token) return null;
    let url = Constants.API_BASE_URL + `auth/set_new_password`;
    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
    };

    let body = new FormData();
    body.append('new', pass1);
    body.append('confirm_new', pass2);

    let response = await fetch(url,  {method : 'POST', headers, body});
    let res = await response.json();
    debugLog(res);
    return res;
}

async function setTokenNull(){
    let token = await save_pref(KEY_AUTH_TOKEN, null);
}
