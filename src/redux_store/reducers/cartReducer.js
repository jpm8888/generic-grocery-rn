import {
    ADD_TO_CART,
    ALREADY_IN_CART,
    DELETE_ITEM,
    DELETE_ITEM_SUCCESS,
    RESET_CART,
    SAVE_STARTED,
    SAVE_SUCCESS,
    UPDATE_CART,
} from '../actions/cartActions';
import moment from 'moment';

const initialState = {
    cart : [],
    updated_at : moment().format('YYYY:MM::DD_HH:mm:ss'),
    loading : false,

    hasChanges : false,
    saveButtonLoading : false,
    addCartButtonLoading : false,
    buyButtonLoading : false,
    deleteButtonLoading : false,
};


export default function (state = initialState, action) {
    switch (action.type) {
        case ADD_TO_CART:
            return{
                ...state,
                addCartButtonLoading : action.payload,
            }
        case ALREADY_IN_CART:
            return{
                ...state,
                addCartButtonLoading : false,
            }
        case SAVE_STARTED:
            return{
                ...state,
                saveButtonLoading : true,
            }

        case SAVE_SUCCESS:
            return{
                ...state,
                hasChanges: false,
                saveButtonLoading : false,
            }
        case UPDATE_CART:
            return{
              ...state,
                cart : action.payload.cart,
                updated_at: moment().format('YYYY:MM::DD_HH:mm:ss'),
                loading: false,
                hasChanges: action.payload.hasChanges,
                saveButtonLoading : false,
                addCartButtonLoading : false,
            };
        case DELETE_ITEM:
            return {
                ...state,
                deleteButtonLoading : true,
            }
        case DELETE_ITEM_SUCCESS:
            return {
                ...state,
                deleteButtonLoading : false,
                cart : action.payload.cart,
                hasChanges: true,
                updated_at: moment().format('YYYY:MM::DD_HH:mm:ss'),
            }
        case RESET_CART:
            return{
                ...state,
                cart : [],
            }
        default : return state;
    }
}
