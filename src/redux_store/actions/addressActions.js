import store from '../store';
import Toast from 'react-native-simple-toast';
import {debugLog} from '../../common/Constants';

export const ADDRESS_KEY = 'address_';
export const FETCH_ADDRESS = ADDRESS_KEY +'address';
export const FETCH_SUCCESS = ADDRESS_KEY +'success';

export const ON_SELECT = ADDRESS_KEY +'select';
export const ON_ADDRESS_CHANGE = ADDRESS_KEY +'address_change';
export const ON_SAVE_ADDRESS = ADDRESS_KEY +'save_address';
export const SAVE_SUCCESS = ADDRESS_KEY +'save_success';
export const SAVE_ERROR = ADDRESS_KEY +'save_error';

export const NA = ADDRESS_KEY +'na';


export const onChangeAddress = (name, value) => ({
    type: ON_ADDRESS_CHANGE,
    payload : {name, value},
});

export const select = (id) => ({
    type: ON_SELECT,
    payload : id,
});

export const saveAddress = (nav) => {
    let {newAddress} = store.getState().addressReducer;

    debugLog(newAddress);

    let errors = [];
    if (newAddress.name.trim() === '') errors.push("name is empty");
    if (newAddress.line_1.trim() === '') errors.push("address line 1 is empty")
    if (newAddress.state.trim() === '') errors.push("state is empty")
    if (newAddress.pin_code.trim() === '') errors.push("pin_code is empty")
    if (newAddress.mobile.trim() === '') errors.push("mobile is empty")

    if (errors.length > 0){
        Toast.show(errors[0]);
    }

    return {
        type: (errors.length === 0) ? ON_SAVE_ADDRESS : SAVE_ERROR,
        payload : {nav},
    }
};

export const saveAddressError = () => ({
    type: SAVE_ERROR,
});

export const saveAddressSuccess = (json, nav) => {

    if (json.status === 0){
        return {
            type : SAVE_ERROR,
            payload : null
        }
    }

    const {address_book} = json;

    nav.goBack();
    Toast.show('Successfully added new address.');
    return {
        type: SAVE_SUCCESS,
        payload : address_book,
    }
};


export const fetchAddress = () => ({
    type: FETCH_ADDRESS,
});

export const fetchedAddresses = (addresses) => ({
    type: FETCH_SUCCESS,
    payload : addresses,
});
