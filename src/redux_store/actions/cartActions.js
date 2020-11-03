export const CART_KEY = 'cart_';
export const SYNC_CART = CART_KEY +'sync_cart';
export const DELETE_ITEM = CART_KEY +'delete_item';
export const DELETE_ITEM_SUCCESS = CART_KEY +'delete_item_success';
export const ADD_TO_CART = CART_KEY +'add_to_cart';
export const RESET_CART = CART_KEY +'reset';
export const ALREADY_IN_CART = CART_KEY +'already_in_cart';
export const INCREMENT = CART_KEY +'increment';
export const DECREMENT = CART_KEY +'decrement';
export const UPDATE_CART = CART_KEY +'add_to';

export const SAVE_STARTED = CART_KEY +'started';
export const SAVE_SUCCESS = CART_KEY +'success';



export const fetch_cart = () => ({
    type: SYNC_CART,
});

export const cartUpdated = (items, hasChanges) => ({
    type: UPDATE_CART,
    payload : {cart : items, hasChanges}
});


export const delete_from_cart = (id) => ({
    type: DELETE_ITEM,
    payload : {id},
});

export const delete_success = (cart) => ({
    type: DELETE_ITEM_SUCCESS,
    payload : {cart},
});


export const add_to_cart = (product_id, qty) => ({
    type: ADD_TO_CART,
    payload : {product_id, qty},
});

export const alreadyInCart = () => ({
    type: ALREADY_IN_CART,
    payload : false,
});


export const increment_qty = (id) => ({
    type: INCREMENT,
    payload : {id},
});

export const decrement_qty = (id) => ({
    type: DECREMENT,
    payload : {id},
});


export const save_cart = () => ({
    type: SAVE_STARTED,
    payload : {},
});

export const saveSuccess = () =>({
    type: SAVE_SUCCESS,
    payload : {},
});

export const resetCart = () =>({
    type: RESET_CART,
    payload : {},
});


// export const save_cart = () => (dispatch) => {
//     dispatch({type: SAVE_STARTED, payload : {}});
//     update_cart(dispatch).then(()=>{
//         dispatch({type: SAVE_FINISHED, payload : {}});
//     });
// }

// export const increment_qty = (id) => (dispatch) => {
//     let cart = store.getState().cartReducer.cart;
//
//     cart.map(item=>{
//         let product = item.product;
//         if (item.product_id === id){
//             let {min_qty} = product;
//             item.qty += min_qty;
//         }
//     });
//     dispatch({type: UPDATE_CART, payload : {cart, hasChanges : true}});
// }

// export const decrement_qty = (id) => (dispatch) => {
//     let {cartReducer} = store.getState();
//     let {cart} = cartReducer;
//
//     cart.map(item=>{
//         let product = item.product;
//         if (item.product_id === id){
//             let {min_qty} = product;
//             if (item.qty === min_qty) {
//                 Toast.show('minimum quantity reached.');
//                 return;
//             }
//             item.qty -= min_qty;
//         }
//     });
//
//     dispatch({type: UPDATE_CART, payload : {cart, hasChanges : true}});
// }






