import {
    FETCH_ADDRESS,
    FETCH_SUCCESS,
    ON_ADDRESS_CHANGE,
    ON_SAVE_ADDRESS,
    ON_SELECT,
    SAVE_ERROR,
    SAVE_SUCCESS,
} from '../actions/addressActions';
import {PLACE_ORDER, PLACE_ORDER_SUCCESS} from '../actions/orderActions';

const initialState = {
    loading : false,
    placeOrderLoading : false,
    saveAddressLoading : false,

    addresses : [],

    selectedId : 0,

    newAddress : {
        id : 0,
        name : '',
        line_1 : '',
        line_2 : '',
        state : '',
        pin_code : '',
        mobile : '',
        landmark : '',
    }
};


export default function (state = initialState, action) {
    switch (action.type) {
        case ON_ADDRESS_CHANGE:
            return{
                ...state,
                newAddress: {
                    ...state.newAddress,
                    [action.payload.name] : action.payload.value,
                }
            };
        case FETCH_ADDRESS:
            return{
                ...state,
                loading : true,
            };
        case FETCH_SUCCESS:
            return{
                ...state,
                addresses : action.payload,
                selectedId : 0,
                loading : false,
            };
        case ON_SELECT:
            return{
                ...state,
                selectedId : action.payload,
            };
        case ON_SAVE_ADDRESS:
            return{
                ...state,
                saveAddressLoading : true,
            };
        case SAVE_SUCCESS:
            return{
                ...state,
                saveAddressLoading : false,
                addresses: [action.payload, ...state.addresses],
                newAddress : {
                    id : 0,
                    name : '',
                    line_1 : '',
                    line_2 : '',
                    state : '',
                    pin_code : '',
                    mobile : '',
                    landmark : '',
                },
            };
        case SAVE_ERROR:
            return {
                ...state,
                saveAddressLoading : false,
            };
        case PLACE_ORDER:
            return{
               ...state,
                placeOrderLoading: true,
            };
        case PLACE_ORDER_SUCCESS:
            return {
                ...state,
                placeOrderLoading: false,
                selectedId : 0,
            }

        default : return state;
    }
}
