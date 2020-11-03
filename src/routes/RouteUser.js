import React from 'react';
import {StyleSheet} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import ScreenUpdatePassword from '../screens/ScreenUpdatePassword';
import {createStackNavigator} from '@react-navigation/stack';
import Colors from '../common/Colors';
import Font from '../common/Font';
import ScreenCategory from '../screens/ScreenCategory';
import CustomHeader from './components/CustomHeader';
import ScreenProducts from '../screens/ScreenProducts';
import ScreenProductDetail from '../screens/ScreenProductDetail';
import ScreenCart from '../screens/ScreenCart';
import ScreenSearch from '../screens/ScreenSearch';
import ScreenAddressBook from '../screens/ScreenAddressBook';
import AddressHeader from './components/AddressHeader';
import ScreenAddressCreate from '../screens/ScreenAddressCreate';
import ScreenOrderConfirmed from '../screens/ScreenOrderConfirmed';
import ScreenOrderDetails from '../screens/ScreenOrderDetails';
import UserTabs from './UserTabs';
import NewAddressHeader from './components/NewAddressHeader';


const StackNav = createStackNavigator();
let options = {
    animationEnabled: true,
    gesturesEnabled: true,
    swipeEnabled: true
};

let screenOptions = {
    ...options,
    headerTintColor : 'white',
    headerStyle: {
        backgroundColor: Colors.secondaryDark
    },
    headerTitleStyle: {
        fontFamily: Font.MEDIUM,
    },
};

class RouteUser extends React.Component{
    constructor(props){
        super(props);

    }

    componentDidMount(): void {

    }


    render(){
        return (
            <NavigationContainer>
                <StackNav.Navigator>
                    <StackNav.Screen name="Home" component={UserTabs} options={(props)=>{
                        return {
                            ...screenOptions,
                            title : 'Home',
                            headerRight : ()=> <CustomHeader {...props}/>
                        }
                    }}/>


                    <StackNav.Screen name="ScreenCategory" component={ScreenCategory} options={(props)=>{
                        return {
                            ...screenOptions,
                            title : 'Categories',
                            headerRight : ()=> <CustomHeader {...props}/>
                        }
                    }}/>

                    <StackNav.Screen name="ScreenProducts" component={ScreenProducts} options={(props)=>{
                        return {
                            ...screenOptions,
                            title : 'Products',
                            headerRight : ()=> <CustomHeader {...props}/>
                        }
                    }}/>

                    <StackNav.Screen name="ScreenProductDetail" component={ScreenProductDetail} options={(props)=>{
                        return {
                            ...screenOptions,
                            tabBarVisible : false,
                            title : '',
                            headerRight : ()=> <CustomHeader {...props}/>
                        }
                    }}/>


                    <StackNav.Screen name="ScreenCart" component={ScreenCart} options={{...screenOptions, title : 'My Cart'}}/>
                    <StackNav.Screen name="ScreenSearch" component={ScreenSearch} options={{...screenOptions, title : 'Search'}}/>

                    <StackNav.Screen name="ScreenAddressBook" component={ScreenAddressBook} options={(props)=>{
                        return {
                            ...screenOptions,
                            title : 'Address Book',
                            headerRight : ()=> <AddressHeader {...props}/>
                        }
                    }}/>

                    <StackNav.Screen name="ScreenAddressCreate" component={ScreenAddressCreate} options={(props)=>{
                        return {
                            ...screenOptions,
                            title : 'New Address',
                            headerRight : ()=> <NewAddressHeader {...props}/>
                        }
                    }}/>

                    <StackNav.Screen name="ScreenOrderConfirmed" component={ScreenOrderConfirmed} options={(props)=>{
                        return {
                            ...screenOptions,
                            title : 'Order Confirmed',
                            headerRight : null,
                            headerLeft : null,
                        }
                    }}/>

                    <StackNav.Screen name="ScreenUpdatePassword" component={ScreenUpdatePassword} options={(props)=>{
                        return {
                            ...screenOptions,
                            title : 'Update Password',
                        }
                    }}/>

                    <StackNav.Screen name="ScreenOrderDetails" component={ScreenOrderDetails} options={(props)=>{
                        return {
                            ...screenOptions,
                            title : 'Order Details',
                        }
                    }}/>

                </StackNav.Navigator>
            </NavigationContainer>
        );
    }
}

const mapStateToProps = (state) => {
    const s = state.authReducer;
    return {

    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        // on_change: (name, value) => on_change(name, value),
    }, dispatch);
};


const styles = StyleSheet.create({

});

export default connect(mapStateToProps, mapDispatchToProps)(RouteUser);
