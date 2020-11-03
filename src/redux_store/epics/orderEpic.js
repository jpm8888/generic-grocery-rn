import {get_pref, KEY_AUTH_TOKEN} from '../../logic/prefs';
import Constants, {debugLog} from '../../common/Constants';
import {ofType} from 'redux-observable';
import {debounceTime, map, mergeMap, pluck, takeUntil} from 'rxjs/operators';
import {from} from 'rxjs';
import {
    CANCEL_ORDER,
    cancelSuccess,
    FETCH_ORDER_DETAILS,
    FETCH_ORDER_HISTORY,
    FETCHED_MORE_HISTORY,
    fetchedOrderDetails,
    fetchOrderHistorySuccess,
    PLACE_ORDER,
    PLACE_ORDER_SUCCESS,
    placeOrderSuccess,
} from '../actions/orderActions';
import {resetCart} from '../actions/cartActions';


export const CreateOrder = (actions$, state$) => {
    return actions$.pipe(
        ofType(PLACE_ORDER),
        debounceTime(1000),
        pluck('payload'),
        mergeMap(({nav}) => {
            let {selectedId} = state$.value.addressReducer;
            // let {cart} = state$.value.cartReducer;
            return from(placeOrderToServer(selectedId)).pipe(
                map(json => placeOrderSuccess(json.order.uid, nav)),
            )
        })
    );
}

export const PlaceOrderSuccess = (actions$, state$) => {
    return actions$.pipe(
        ofType(PLACE_ORDER_SUCCESS),
        pluck('payload'),
        map(action => resetCart()),
    );
}

export const FetchPastOrders = (actions$, state$) => {
    return actions$.pipe(
        ofType(FETCH_ORDER_HISTORY, FETCHED_MORE_HISTORY),
        debounceTime(1000),
        pluck('payload'),
        mergeMap(({offset}) => {
            return from(fetchPastOrdersFromServer(offset)).pipe(
                map(json => fetchOrderHistorySuccess(json.orders, json.total_orders, offset)),
            )
        })
    );
}

export const FetchOrderDetails = (actions$, state$) => {
    return actions$.pipe(
        ofType(FETCH_ORDER_DETAILS),
        debounceTime(1000),
        pluck('payload'),
        mergeMap(({id}) => {
            return from(fetchOrderDetailsFromServer(id)).pipe(
                map(order => fetchedOrderDetails(order)),
                takeUntil(actions$.ofType(FETCH_ORDER_DETAILS)),
            )
        })
    );
}

export const CancelOrder = (actions$, state$) => {
    return actions$.pipe(
        ofType(CANCEL_ORDER),
        debounceTime(1000),
        pluck('payload'),
        mergeMap(({id}) => {
            return from(cancelOrderFromServer(id)).pipe(
                map(order => cancelSuccess()),
                takeUntil(actions$.ofType(CANCEL_ORDER)),
            )
        })
    );
}


async function placeOrderToServer(address_id){
    let token = await get_pref(KEY_AUTH_TOKEN, '');
    if (token === '' || !token) return null;
    let url = Constants.API_BASE_URL + `order/place`;
    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
    };

    // let arr = cart.map(item=>{
    //     return {product_id : item.id, qty : item.qty};
    // });

    // console.log(cart);

    let params = {
        'address_id' : address_id,
        //'products' : arr,
    };


    let body = JSON.stringify(params);

    let response = await fetch(url,  {method : 'POST', headers, body});
    let res = await response.json();
    debugLog(res);
    return res;
}

async function fetchPastOrdersFromServer(offset){
    let token = await get_pref(KEY_AUTH_TOKEN, '');
    if (token === '' || !token) return null;
    let url = Constants.API_BASE_URL + `order/fetch/${offset}`;
    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
    };

    let response = await fetch(url,  {method : 'GET', headers});
    let res = await response.json();
    debugLog(res);
    return res;
}

async function fetchOrderDetailsFromServer(id){
    let token = await get_pref(KEY_AUTH_TOKEN, '');
    if (token === '' || !token) return null;
    let url = Constants.API_BASE_URL + `order/details/${id}`;
    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
    };

    let response = await fetch(url,  {method : 'GET', headers});
    let res = await response.json();
    debugLog(res);
    if (res.status === 1) return res.order;
    return undefined;
}

async function cancelOrderFromServer(id){
    let token = await get_pref(KEY_AUTH_TOKEN, '');
    if (token === '' || !token) return null;
    let url = Constants.API_BASE_URL + `order/cancel/${id}`;
    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
    };

    let response = await fetch(url,  {method : 'GET', headers});
    return await response.json();
}
