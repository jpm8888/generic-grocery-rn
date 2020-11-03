import {ofType} from 'redux-observable';
import {debounceTime, map, mergeMap, pluck, takeUntil} from 'rxjs/operators';
import {from} from 'rxjs';
import {fetch_product_n_insert, get_product, get_product_details} from '../../app/database/app/product';
import {
    fetchedProductDetails,
    fetchedProducts,
    MORE_PRODUCTS_START,
    PRODUCT_DETAILS_FETCH_START,
    PRODUCT_LOADING_START,
} from '../actions/productActions';
import {insert_recent} from '../../app/database/app/recent';

export const FetchProducts = (actions$, state$) => {
    return actions$.pipe(
        ofType(PRODUCT_LOADING_START),
        debounceTime(500),
        pluck('payload'),
        mergeMap(({category_id}) => {
            return from(load_products(category_id)).pipe(
                map(rows => fetchedProducts(rows)),
            )
        })
    );
}

export const FetchMoreProducts = (actions$, state$) => {
    return actions$.pipe(
        ofType(MORE_PRODUCTS_START),
        debounceTime(1000),
        pluck('payload'),
        mergeMap(({category_id}) => {
            let {products, offset} = state$.value.productReducer;
             return from(fetch_more_products_from_server(products, category_id, offset)).pipe(
                 map(rows => fetchedProducts(rows)),
                 takeUntil(actions$.ofType(MORE_PRODUCTS_START)),
            )
        })
    );
}

export const FetchProductDetails = (actions$, state$) => {
    return actions$.pipe(
        ofType(PRODUCT_DETAILS_FETCH_START),
        debounceTime(1000),
        pluck('payload'),
        mergeMap(({id}) =>
            from(load_product_detail(id)).pipe(
                map((product) => {
                    return fetchedProductDetails(product);
                }),
                takeUntil(actions$.ofType(PRODUCT_DETAILS_FETCH_START)),
            )
        ),
    );
}

async function load_product_detail(id){
    await insert_recent(id);
    return await get_product_details(id);
}

async function load_products(category_id) {
    await fetch_product_n_insert(category_id);
    return await get_product(category_id);
}


async function fetch_more_products_from_server(products, category_id, offset){
    await fetch_product_n_insert(category_id, offset);
    let rows = await get_product(category_id, offset);
    if (rows.length === 0) return products;

    let newProducts = products;
    for (let i = 0; i < rows.length; i++) {
        newProducts.push(rows[i]);
    }
    return newProducts;
}
