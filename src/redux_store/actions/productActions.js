export const PRODUCT_KEY = 'product_';
export const PRODUCT_LOADING_START = PRODUCT_KEY +'load_start';
export const PRODUCT_LOAD_SUCCESS = PRODUCT_KEY +'load_success';
export const MORE_PRODUCTS_START = PRODUCT_KEY +'more_products_start';


export const PRODUCT_DETAILS_FETCH_START = PRODUCT_KEY +'fetch_start';
export const PRODUCT_DETAILS_SUCCESS = PRODUCT_KEY +'details_success';

export const PRODUCT_SET_VARIANT = PRODUCT_KEY +'set_variant';


export const fetch_products = (category_id) => ({
    type: PRODUCT_LOADING_START,
    payload : {category_id},
});

export const fetchedProducts = (rows) => ({
    type: PRODUCT_LOAD_SUCCESS,
    payload : rows,
});


export const fetch_more_products = (category_id) => ({
    type: MORE_PRODUCTS_START,
    payload : {category_id},
});

export const setVariant = (idx) => ({
    type: PRODUCT_SET_VARIANT,
    payload : idx,
});


export const fetch_product_details = (id) => ({
    type: PRODUCT_DETAILS_FETCH_START,
    payload : {id},
});

export const fetchedProductDetails = (productDetails = []) => ({
    type: PRODUCT_DETAILS_SUCCESS,
    payload : productDetails,
});
