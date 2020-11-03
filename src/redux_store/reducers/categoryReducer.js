import {CATEGORY_LOAD_SUCCESS, CATEGORY_LOADING} from '../actions/categoryActions';

const initialState = {
    loading : false,
    categories : [],
};


export default function (state = initialState, action) {
    switch (action.type) {
        case CATEGORY_LOADING:
            return{
                ...state,
                loading : action.payload,
            };
        case CATEGORY_LOAD_SUCCESS:
            return{
                ...state,
                loading : false,
                categories : action.payload,
            };
        default : return state;
    }
}
