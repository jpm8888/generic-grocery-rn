import Constants from '../../common/Constants';
import {ofType} from 'redux-observable';
import {debounceTime, map, pluck, switchMap, takeUntil} from 'rxjs/operators';
import {from} from 'rxjs';
import {onQueryFulfilled, SEARCH_START} from '../actions/searchActions';
import {get_pref, KEY_AUTH_TOKEN} from '../../logic/prefs';

export const StartQuery = (actions$, state$) => {
    return actions$.pipe(
        ofType(SEARCH_START),
        debounceTime(1000),
        pluck('payload'),
        switchMap(({queryStr, category_id}) => {
            return from(query(queryStr, category_id)).pipe(
                map(data => onQueryFulfilled(data)),
                takeUntil(actions$.ofType(SEARCH_START)),
            )
        })
    );
}


async function query(str : string, category_id) {
    let token = await get_pref(KEY_AUTH_TOKEN, '');
    if (token === '' || !token) return null;

    if (str.trim() === '') return [];

    let url = Constants.API_BASE_URL + `common_v2/filter_product/${str}?category_id=${category_id}`;
    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
    };

    let response = await fetch(url,  {method : 'GET', headers});
    return response.json();
}

