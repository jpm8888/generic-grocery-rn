import {combineEpics} from 'redux-observable';
import {ForgotPassword, SignIn, SignUp, UpdatePassword, VerifyRegOTP, VerifyToken} from './authEpic';
import {FetchHome, FetchRecent} from './homeEpic';
import {FetchCategories} from './categoryEpic';
import {
    AddToCart,
    DecrementQty,
    DeleteItemFromCart,
    DeleteItemFromCartSuccess,
    IncrementQty,
    SaveCart,
    SyncCart,
} from './cartEpic';
import {FetchMoreProducts, FetchProductDetails, FetchProducts} from './productEpic';
import {StartQuery} from './searchEpic';
import {CreateAddress, FetchAddress} from './addressEpic';
import {CancelOrder, CreateOrder, FetchOrderDetails, FetchPastOrders, PlaceOrderSuccess} from './orderEpic';
import {Logout, SetNewPassword} from './settingEpic';


export default combineEpics(
    Logout, SetNewPassword,
    SignIn, VerifyToken, SignUp, ForgotPassword, UpdatePassword, VerifyRegOTP,
    FetchRecent, FetchHome,
    FetchCategories,
    SyncCart, DeleteItemFromCart, DeleteItemFromCartSuccess, AddToCart, IncrementQty, DecrementQty, SaveCart,
    FetchProducts, FetchMoreProducts, FetchProductDetails,
    StartQuery,
    FetchAddress, CreateAddress,
    CreateOrder, FetchPastOrders, FetchOrderDetails, CancelOrder, PlaceOrderSuccess
);
