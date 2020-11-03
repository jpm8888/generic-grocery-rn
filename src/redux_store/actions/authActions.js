import Toast from 'react-native-simple-toast';

export const AUTH_KEY = 'auth_';
export const AUTH_LOADING = AUTH_KEY +'loading';
export const AUTH_ON_CHANGE = AUTH_KEY +'change';
export const AUTH_SUCCESS = AUTH_KEY +'auth_success';
export const AUTH_FAILED = AUTH_KEY +'auth_failed';
export const VERIFY_TOKEN = AUTH_KEY +'verify_token';

export const SIGNUP_REQ = AUTH_KEY +'signup_req';
export const SIGNUP_SUCCESS = AUTH_KEY +'signup_success';

export const FORGOT_REQ = AUTH_KEY +'forgot_req';
export const FORGOT_SUCCESS = AUTH_KEY +'forgot_success';

export const UPDATE_REQ = AUTH_KEY +'update_req';
export const UPDATE_SUCCESS = AUTH_KEY +'update_success';

export const NA = AUTH_KEY +'na';

export const VERIFY_OTP = AUTH_KEY + 'verify_otp';
export const COMPLETED_REGISTRATION = AUTH_KEY + 'completed_reg';


export const onChange = (name, value) => ({
    type: AUTH_ON_CHANGE,
    payload : {name, value},
});

export const signUp = (nav) => ({
    type: SIGNUP_REQ,
    payload : {nav},
});

export const signUpSuccess = (json, nav) => {
    const {otp_id, session_id, msg, status} = json;
    Toast.show(msg);
    if (status === 1) {
        nav.navigate('ScreenSignUpVerifyOtp');
        return {
            type: SIGNUP_SUCCESS,
            payload : {otp_id, session_id},
        }
    }
    return {
        type : NA,
    }
};

export const verifyOtp = () => {
    return {
        type: VERIFY_OTP,
        payload : null,
    }
}

export const completedRegistration = (json) => {
    Toast.show(json.msg);
    return {
        type: (json.status === 1) ? COMPLETED_REGISTRATION : NA,
        payload : json,
    }
}

export const forgotPassword = () => ({
    type: FORGOT_REQ,
    payload : null,
});

export const forgotPasswordSuccess = (otp_id, session_id, msg) => {
    Toast.show(msg);
    return {
        type: FORGOT_SUCCESS,
        payload : {otp_id, session_id},
    }
};


export const updatePassword = () => ({
    type: UPDATE_REQ,
    payload : null,
});


export const updatePasswordSuccess = (json) => {
    Toast.show(json.msg);
    return {
        type: (json.status === 1) ? UPDATE_SUCCESS : NA,
        payload : null,
    }
};

export const sign_in = () => ({
    type: AUTH_LOADING,
    payload : true,
});

export const signedSuccess = (token) => ({
    type: AUTH_SUCCESS,
    payload : token,
});

export const verifyToken = (token) => ({
    type: VERIFY_TOKEN,
    payload : token,
});

export const verifySuccess = (token) => ({
    type: (token) ? AUTH_SUCCESS : AUTH_FAILED,
    payload : token,
});


