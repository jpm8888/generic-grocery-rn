import {ON_CHANGE, UPDATE_PASS_FAILED, UPDATE_PASS_SUCCESS, UPDATE_PASSWORD} from '../actions/settingActions';

const initialState = {
    new_pass : '',
    confirm_new_pass : '',
    updatingPassword : false,
};


export default function (state = initialState, action) {
    switch (action.type) {
        case ON_CHANGE:
            return{
                ...state,
                [action.payload.name] : action.payload.value,
            };
        case UPDATE_PASSWORD:
            return{
                ...state,
                updatingPassword : true,
            };
        case UPDATE_PASS_SUCCESS:
            return{
                ...state,
                new_pass : '',
                confirm_new_pass : '',
                updatingPassword : false,
            };
        case UPDATE_PASS_FAILED:
            return{
                ...state,
                updatingPassword : false,
            };
        default : return state;
    }
}
