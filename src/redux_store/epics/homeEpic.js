import Constants, {debugLog} from '../../common/Constants';
import {ofType} from 'redux-observable';
import {debounceTime, map, mergeMap} from 'rxjs/operators';
import {from} from 'rxjs';
import {FETCH_RECENT, fetchedHome, fetchedRecent, HOME_FETCH_START} from '../actions/homeActions';
import {get_recent} from '../../app/database/app/recent';
import {get_pref, KEY_AUTH_TOKEN} from '../../logic/prefs';

export const FetchRecent = (actions$, state$) => {
    debugLog('FetchRecentMiddleware');
    return actions$.pipe(
        ofType(FETCH_RECENT),
        mergeMap(action => {
            return from(get_recent()).pipe(
                map(rows => fetchedRecent(rows))
            )
        })
    );
}


export const FetchHome = (actions$, state$) => {
    debugLog('FetchRecentMiddleware');
    return actions$.pipe(
        ofType(HOME_FETCH_START),
        debounceTime(500),
        mergeMap(action => {
            return from(fetch_home_items()).pipe(
                map(json => fetchedHome(json))
            )
        })
    );
}


async function fetch_home_items(){
    const group_type = "home";
    let token = await get_pref(KEY_AUTH_TOKEN, '');
    if (token === '' || !token) return null;

    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
    };

    let url = Constants.API_BASE_URL + `group/fetch/` + group_type;
    let response = await fetch(url,  {method : 'GET', headers});
    return await response.json();
}
