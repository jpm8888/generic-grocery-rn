import {combineReducers} from 'redux';
import indexReducer from './indexReducer';
import categoryReducer from './categoryReducer';
import productReducer from './productReducer';
import authReducer from './authReducer';
import cartReducer from './cartReducer';
import homeReducer from './homeReducer';
import searchReducer from './searchReducer';
import addressReducer from './addressReducer';
import orderReducer from './orderReducer';
import settingReducer from './settingReducer';


export default combineReducers({
    indexReducer: indexReducer,
    categoryReducer: categoryReducer,
    productReducer: productReducer,
    authReducer: authReducer,
    cartReducer: cartReducer,
    homeReducer: homeReducer,
    searchReducer: searchReducer,
    addressReducer: addressReducer,
    orderReducer: orderReducer,
    settingReducer: settingReducer,
})
