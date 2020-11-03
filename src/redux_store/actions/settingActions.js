import Toast from 'react-native-simple-toast';
import store from '../store';


export const SETTINGS_KEY = 'settings_';
export const LOGOUT = SETTINGS_KEY + 'logout';
export const LOGOUT_SUCCESS = SETTINGS_KEY + 'logout_success';

export const ON_CHANGE = SETTINGS_KEY + 'change';

export const UPDATE_PASSWORD = SETTINGS_KEY + 'update_pass';
export const UPDATE_PASS_SUCCESS = SETTINGS_KEY + 'pass_success';
export const UPDATE_PASS_FAILED = SETTINGS_KEY + 'pass_failed';


export const on_change = (name, value) => {
    return {
        type: ON_CHANGE,
        payload : {name, value},
    }
};

export const logout = () => {
    return {
        type: LOGOUT,
        payload : null,
    }
};

export const logoutSuccess = () => {
    Toast.show('Logout success');
    return {
        type: LOGOUT_SUCCESS,
        payload : null,
    }
};

export const updatePassword = () => {
    let {new_pass, confirm_new_pass} = store.getState().settingReducer;
    if (new_pass === '' || new_pass !== confirm_new_pass){
        Toast.show('Error : Password mismatch');
        return {
            type : UPDATE_PASS_FAILED,
        }
    }

    return {
        type: UPDATE_PASSWORD,
        payload : null,
    }
};

export const updatePasswordSuccess = (json) => {
    Toast.show(json.msg);
    return {
        type: json.status === 1 ? UPDATE_PASS_SUCCESS : UPDATE_PASS_FAILED,
        payload : null,
    }
};
