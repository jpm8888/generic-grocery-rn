import {get_pref, KEY_AUTH_TOKEN} from '../../logic/prefs';
import Constants, {debugLog} from '../../common/Constants';
import {ofType} from 'redux-observable';
import {debounceTime, map, mergeMap, pluck} from 'rxjs/operators';
import {from} from 'rxjs';
import {FETCH_ADDRESS, fetchedAddresses, ON_SAVE_ADDRESS, saveAddressSuccess} from '../actions/addressActions';
import Toast from 'react-native-simple-toast';


export const FetchAddress = (actions$, state$) => {
    return actions$.pipe(
        ofType(FETCH_ADDRESS),
        debounceTime(500),
        mergeMap(action => {
            return from(fetchAddressFromServer()).pipe(
                map(json => fetchedAddresses(json.address_books))
            )
        })
    );
}

export const CreateAddress = (actions$, state$) => {
    return actions$.pipe(
        ofType(ON_SAVE_ADDRESS),
        debounceTime(1000),
        pluck('payload'),
        mergeMap(({nav}) => {
            let {newAddress} = state$.value.addressReducer;
            debugLog(newAddress);
            return from(saveAddressToServer(newAddress)).pipe(
                map(json => saveAddressSuccess(json, nav))
            )
        })
    );
}

async function saveAddressToServer(newAddress){
    let token = await get_pref(KEY_AUTH_TOKEN, '');
    if (token === '' || !token) return {status : 0};
    let url = Constants.API_BASE_URL + `address/add`;
    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
    };


    console.log(token);
    console.log('making request->' + url);

    let params = {
        name : newAddress.name,
        line_1 : newAddress.line_1,
        line_2 : newAddress.line_2,
        state : newAddress.state,
        pin_code : newAddress.pin_code,
        mobile : newAddress.mobile,
        landmark : newAddress.landmark,
    };

    let body = JSON.stringify(params);

    let response = await fetch(url,  {method : 'POST', headers, body});
    let res = await response.json();
    debugLog(res);
    if (res.status === 0){
        Toast.show(res.msg);
    }

    return res;
}

async function fetchAddressFromServer(){
    let token = await get_pref(KEY_AUTH_TOKEN, '');
    if (token === '' || !token) return null;
    let url = Constants.API_BASE_URL + `address/all`;
    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
    };

    let response = await fetch(url,  {method : 'GET', headers});
    return await response.json();
}
