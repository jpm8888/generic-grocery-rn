import Constants from '../../common/Constants';
import {ofType} from 'redux-observable';
import {debounceTime, map, mergeMap, pluck} from 'rxjs/operators';
import {from, of} from 'rxjs';
import {get_pref, KEY_AUTH_TOKEN} from '../../logic/prefs';
import {
    ADD_TO_CART,
    alreadyInCart,
    cartUpdated,
    DECREMENT,
    DELETE_ITEM,
    DELETE_ITEM_SUCCESS,
    delete_success,
    INCREMENT,
    SAVE_STARTED,
    saveSuccess,
    SYNC_CART,
} from '../actions/cartActions';
import Toast from 'react-native-simple-toast';
import store from '../store';

export const SyncCart = (actions$, state$) => {
    return actions$.pipe(
        ofType(SYNC_CART),
        debounceTime(500),
        mergeMap(action => {
            return from(sync_cart()).pipe(
                map(json => cartUpdated(json.items, false))
            )
        })
    );
}

export const DeleteItemFromCart = (actions$, state$) => {
    return actions$.pipe(
        ofType(DELETE_ITEM),
        debounceTime(500),
        pluck('payload'),
        map(({id}) => {
            let {cart} = state$.value.cartReducer;
            let new_cart = cart.filter((d)=> (d.product_id !== id));
            Toast.show('removed from cart...');
            return delete_success(new_cart);
        })
    );
}

export const DeleteItemFromCartSuccess = (actions$, state$) => {
    return actions$.pipe(
        ofType(DELETE_ITEM_SUCCESS),
        pluck('payload'),
        mergeMap(action => {
            let {cart} = state$.value.cartReducer;
            if (cart.length === 0){
                return from(update_cart()).pipe(
                    map(action => saveSuccess())
                )
            }
            return [];
        })
    );
}


export const AddToCart = (actions$, state$) => {
    return actions$.pipe(
        ofType(ADD_TO_CART),
        debounceTime(500),
        pluck('payload'),
        mergeMap(({product_id, qty}) => {
            let cart = state$.value.cartReducer.cart;
            let found = false;

            cart.map((c)=>{
                if (c.product_id === product_id) found = true;
            });

            if (found){
                Toast.show('item already in cart...');
                return of(alreadyInCart());
            }else{
                Toast.show('item added to cart...');
            }

            return from(add_to_cart({product_id, qty})).pipe(
                map(json => cartUpdated(json.items, false))
            )
        })
    );
}

export const IncrementQty = (actions$, state$) => {
    return actions$.pipe(
        ofType(INCREMENT),
        debounceTime(500), // ignore clicks after 500
        pluck('payload'),
        map(({id}) => {
            let cart = state$.value.cartReducer.cart;
            cart.map(item=>{
                let product = item.product;
                if (item.product_id === id){
                    let {min_qty} = product;
                    item.qty += min_qty;
                }
            });
            return cartUpdated(cart, true);
        })
    );
}

export const DecrementQty = (actions$, state$) => {
    return actions$.pipe(
        ofType(DECREMENT),
        debounceTime(500), // ignore clicks after 500
        pluck('payload'),
        map(({id}) => {
            let cart = state$.value.cartReducer.cart;
            cart.map(item=>{
                let product = item.product;
                if (item.product_id === id){
                    let {min_qty} = product;
                    if (item.qty === min_qty) {
                        Toast.show('minimum quantity reached.');
                        return [];
                    }
                    item.qty -= min_qty;
                }
            });
            return cartUpdated(cart, true);
        })
    );
}


export const SaveCart = (actions$, state$) => {
    return actions$.pipe(
        ofType(SAVE_STARTED),
        debounceTime(500), // ignore clicks after 500
        mergeMap(action => {
            return from(update_cart()).pipe(
                map(action => saveSuccess())
            )
        })
    );
}

async function add_to_cart(product){
    await update_cart(product);
    return await sync_cart();
}


async function sync_cart(){
    let token = await get_pref(KEY_AUTH_TOKEN, '');
    if (token === '' || !token) return null;
    let url = Constants.API_BASE_URL + `cart/all`;
    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
    };

    let response = await fetch(url,  {method : 'POST', headers});
    return await response.json();
}


async function update_cart(newProduct = undefined){
    let token = await get_pref(KEY_AUTH_TOKEN, '');
    if (token === '' || !token) return null;
    let url = Constants.API_BASE_URL + `cart/update_cart`;
    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
    };

    let cart = store.getState().cartReducer.cart;

    let body = [];
    cart.map((c)=>{
        body.push({
            product_id : c.product_id,
            qty : c.qty,
        });
    });

    if (newProduct) body.push(newProduct);

    let strBody = JSON.stringify(body);

    let response = await fetch(url,  {method : 'POST', headers, body : strBody});
    return await response.json();

}
