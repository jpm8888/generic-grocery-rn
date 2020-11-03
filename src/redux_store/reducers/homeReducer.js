import {HOME_FETCH_END, HOME_FETCH_START, RECENT_LOADED} from '../actions/homeActions';

const initialState = {
    recent : [],
    fetchingHome : false,
    data : [],
};


export default function (state = initialState, action) {
    switch (action.type) {
        case RECENT_LOADED:
            return{
                ...state,
                recent: action.payload,
            };
        case HOME_FETCH_START:
            return{
                ...state,
                fetchingHome: true,
            };
        case HOME_FETCH_END:
            return{
                ...state,
                fetchingHome: false,
                data : action.payload.data,
            };
        default : return state;
    }
}
