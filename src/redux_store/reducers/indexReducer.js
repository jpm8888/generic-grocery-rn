import {ON_CHANGE_VALUE} from '../actions/types';

const initialState = {

};


export default function (state = initialState, action) {
    switch (action.type) {
        case ON_CHANGE_VALUE:
            return{
              ...state,
              [action.payload.name] : action.payload.value,
            };
        default : return state;
    }
}
