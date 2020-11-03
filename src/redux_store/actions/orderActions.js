import Toast from 'react-native-simple-toast';
import store from '../store';


export const ORDER_KEY = 'order_';
export const PLACE_ORDER = ORDER_KEY +'order';
export const PLACE_ORDER_SUCCESS = ORDER_KEY +'place_ll_success';
export const PLACE_ORDER_ERROR = ORDER_KEY +'error';

export const FETCH_ORDER_HISTORY = ORDER_KEY +'fetch_order_history';
export const FETCHED_ORDER_HISTORY = ORDER_KEY +'fetched_order_history';
export const FETCHED_MORE_HISTORY = ORDER_KEY +'fetched_more_order_history';

export const FETCH_ORDER_DETAILS = ORDER_KEY +'order_details';
export const FETCHED_ORDER_DETAILS = ORDER_KEY +'order_details_success';

export const CANCEL_ORDER = ORDER_KEY +'cancel';
export const CANCEL_ORDER_SUCCESS = ORDER_KEY +'cancel_success';

export const placeOrder = (nav) => {
    let {cart} = store.getState().cartReducer;

    let errors = [];
    if (cart.length === 0) errors.push('cart is empty');

    if (errors.length > 0){
        Toast.show(errors[0]);
    }

    return {
        type: (errors.length === 0) ? PLACE_ORDER : PLACE_ORDER_ERROR,
        payload : {nav},
    }
};


export const placeOrderSuccess = (order_id, nav) => {
    nav.navigate("ScreenOrderConfirmed", {order_id});
    return {
        type: PLACE_ORDER_SUCCESS,
        payload : {nav, order_id},
    }
};

export const placeOrderError = () => ({
    type: PLACE_ORDER_ERROR,
});


export const fetchPastOrders = () => {
    return {
        type: FETCH_ORDER_HISTORY,
        payload : {offset : 0},
    }
};


export const fetchMoreOrders = () => {
    let {pastOrders} = store.getState().orderReducer;
    let offset = pastOrders.length;

    return {
        type: FETCHED_MORE_HISTORY,
        payload : {offset},
    }
};

export const fetchOrderHistorySuccess = (orders, total_orders, offset) => {
    return {
        type: FETCHED_ORDER_HISTORY,
        payload : {orders, total_orders, offset},
    }
};

export const fetchOrderDetails = (id) => {
    return {
        type: FETCH_ORDER_DETAILS,
        payload : {id},
    }
};

export const fetchedOrderDetails = (order) => {
    return {
        type: FETCHED_ORDER_DETAILS,
        payload : {order},
    }
};

export const cancelOrder = (id) => {
    return {
        type: CANCEL_ORDER,
        payload : {id},
    }
};

export const cancelSuccess = (id) => {
    return {
        type: CANCEL_ORDER_SUCCESS,
        payload : {},
    }
};
