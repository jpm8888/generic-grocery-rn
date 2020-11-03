import {
    AUTH_FAILED,
    AUTH_LOADING,
    AUTH_ON_CHANGE,
    AUTH_SUCCESS,
    COMPLETED_REGISTRATION,
    FORGOT_REQ,
    FORGOT_SUCCESS,
    NA,
    SIGNUP_REQ,
    SIGNUP_SUCCESS,
    UPDATE_REQ,
    UPDATE_SUCCESS,
    VERIFY_OTP,
} from '../actions/authActions';
import {LOGOUT_SUCCESS} from '../actions/settingActions';

const initialState = {
    loading : false,
    forgotPassLoading : false,
    signUpLoading : false,
    companyName : '',
    name : '',
    mobile : '',

    otp_id : 0,
    session_id : '', //otp session id
    otp : '',
    new_password : '',

    password : '',

    token : null,
    isSigned : false,

    showSplash : true,
};


export default function (state = initialState, action) {
    switch (action.type) {
        case NA:
            return{
                ...state,
                loading : false,
                forgotPassLoading : false,
                signUpLoading : false,
            }
        case AUTH_LOADING:
            return{
                ...state,
                loading : action.payload,
            };
        case AUTH_ON_CHANGE:
            return{
                ...state,
                [action.payload.name] : action.payload.value,
            };
        case FORGOT_REQ:
            return{
                ...state,
                forgotPassLoading : true,
            };
        case FORGOT_SUCCESS:
            return{
                ...state,
                forgotPassLoading : false,
                otp_id : action.payload.otp_id,
                session_id : action.payload.session_id,
            };
        case UPDATE_REQ:
            return{
                ...state,
                forgotPassLoading : true,
            };
        case UPDATE_SUCCESS:
            return{
                ...state,
                forgotPassLoading : false,
                otp_id : 0,
                otp : '',
                session_id : '',
                mobile : '',
                new_password: '',
            };
        case SIGNUP_REQ:
            return{
                ...state,
                signUpLoading: true,
            };
        case SIGNUP_SUCCESS:
            return{
                ...state,
                signUpLoading: false,
                otp_id : action.payload.otp_id,
                session_id : action.payload.session_id,
            };

        case VERIFY_OTP:
            return{
                ...state,
                signUpLoading: true,
            };
        case COMPLETED_REGISTRATION:
            return{
                ...state,
                signUpLoading: false,
                otp_id : 0,
                otp : '',
                session_id : '',
                mobile : '',

                token : action.payload.user.token,
                isSigned: true,
                showSplash : false,
            };
        case AUTH_SUCCESS:
            return{
                ...state,
                loading : false,
                token : action.payload,
                isSigned: (action.payload !== null),
                showSplash : false,
            };
        case AUTH_FAILED:
            return{
                ...state,
                loading : false,
                token : null,
                isSigned: false,
                showSplash : false,
            };
        case LOGOUT_SUCCESS:
            return{
                ...state,
                token : null,
                isSigned: false,
            }
        default : return state;
    }
}
