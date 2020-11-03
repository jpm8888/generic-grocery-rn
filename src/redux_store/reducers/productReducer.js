import {
    MORE_PRODUCTS_START,
    PRODUCT_DETAILS_FETCH_START,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_LOAD_SUCCESS,
    PRODUCT_LOADING_START,
    PRODUCT_SET_VARIANT,
} from '../actions/productActions';

const initialState = {
    loading : false,
    products : [],
    fetching : false,


    product_details : [],
    variantIdx : 0,
    productDetailsFetching : false,

    offset : 0,
    limit : 20,
};


export default function (state = initialState, action) {
    switch (action.type) {
        case PRODUCT_LOADING_START:
            return{
                ...state,
                loading : action.payload,
                offset : 0,
            };

        case MORE_PRODUCTS_START:
            return{
                ...state,
                fetching : true,
            };
        case PRODUCT_LOAD_SUCCESS:
            return{
                ...state,
                loading : false,
                products : action.payload,
                fetching : false,
                offset : state.offset + state.limit,
            };

        case PRODUCT_SET_VARIANT:
            return{
                ...state,
                variantIdx : action.payload,
            };

        case PRODUCT_DETAILS_FETCH_START:
            return{
                ...state,
                product_details : [],
                variantIdx : 0,
                productDetailsFetching : true,
            };

        case PRODUCT_DETAILS_SUCCESS:
            return{
                ...state,
                product_details : action.payload,
                productDetailsFetching : false,
            };
        default : return state;
    }
}
