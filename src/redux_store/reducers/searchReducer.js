import {SEARCH_END, SEARCH_RESET, SEARCH_START} from '../actions/searchActions';

const initialState = {
    queryStr : '',
    loading : false,
    data : [],
};


export default function (state = initialState, action) {
    switch (action.type) {
        case SEARCH_START:
            return{
                ...state,
                loading : true,
                queryStr: action.payload.queryStr,
            };
        case SEARCH_END:
            return{
                ...state,
                loading : false,
                data : action.payload,
            };
        case SEARCH_RESET:
            return{
                ...state,
                loading : false,
                data : [],
                queryStr : '',
            };

        default : return state;
    }
}
