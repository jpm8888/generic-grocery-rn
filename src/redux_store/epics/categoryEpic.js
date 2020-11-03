import {ofType} from 'redux-observable';
import {debounceTime, map, mergeMap} from 'rxjs/operators';
import {from} from 'rxjs';
import {fetch_category_n_insert, get_category} from '../../app/database/app/category';
import {CATEGORY_LOADING, fetchedCategory} from '../actions/categoryActions';

export const FetchCategories = (actions$, state$) => {
    return actions$.pipe(
        ofType(CATEGORY_LOADING),
        debounceTime(500),
        mergeMap(action => {
            return from(load_categories()).pipe(
                map(rows => fetchedCategory(rows))
            )
        })
    );
}


async function load_categories() {
    await fetch_category_n_insert();
    return await get_category();
}
