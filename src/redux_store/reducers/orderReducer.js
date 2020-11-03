import {
    CANCEL_ORDER,
    CANCEL_ORDER_SUCCESS,
    FETCH_ORDER_DETAILS,
    FETCH_ORDER_HISTORY,
    FETCHED_MORE_HISTORY,
    FETCHED_ORDER_DETAILS,
    FETCHED_ORDER_HISTORY,
} from '../actions/orderActions';

const initialState = {
    isFetchingPastOrders : false,
    isFetchingMoreOrders : false,


    pastOrders : [],
    total_orders : 0,
    isRefreshing : false,

    isFetchingOrderDetails : false,
    orderDetails : undefined,

    isCancelling : false,
};


export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_ORDER_HISTORY:
            return{
                ...state,
                isFetchingPastOrders : (state.pastOrders.length === 0 && true),
                isRefreshing : true,
            };
        case FETCHED_MORE_HISTORY:
            return{
                ...state,
                isFetchingMoreOrders : true,
                isRefreshing : false,
            };
        case FETCHED_ORDER_HISTORY:
            let offset = action.payload.offset;
            let pastOrders = [];
            if (offset > 0){
                pastOrders = [...state.pastOrders, ...action.payload.orders];
            }else{
                pastOrders = action.payload.orders;
            }

            return{
                ...state,
                isFetchingPastOrders : false,
                isFetchingMoreOrders : false,
                isRefreshing : false,
                pastOrders : pastOrders,
                total_orders : action.payload.total_orders,
            };
        case FETCH_ORDER_DETAILS:
            return{
                ...state,
                isFetchingOrderDetails : true,
                orderDetails : undefined,
            };
        case FETCHED_ORDER_DETAILS:
            return{
                ...state,
                isFetchingOrderDetails : false,
                orderDetails : action.payload.order,
            };
        case CANCEL_ORDER:
            return{
                ...state,
                isCancelling : true,
            };
        case CANCEL_ORDER_SUCCESS:
            return{
                ...state,
                isCancelling : false,
                orderDetails : {
                    ...state.orderDetails,
                    status : 'cancelled'
                },
            };
        default : return state;
    }
}
