import React from 'react';
import {StyleSheet} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import ScreenWelcome from '../screens/ScreenWelcome';
import ScreenSignUp from '../screens/ScreenSignUp';
import ScreenSignIn from '../screens/ScreenSignIn';
import Colors from '../common/Colors';
import Font from '../common/Font';
import ScreenForgotPass from '../screens/ScreenForgotPass';
import ScreenSignUpVerifyOtp from '../screens/ScreenSignUpVerifyOtp';

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

class RouteAuth extends React.Component{

    constructor(props){

        super(props);
    }

    componentDidMount(): void {

    }


    render(){
        return (
            <NavigationContainer>
                <StackNav.Navigator>
                    <StackNav.Screen name="ScreenWelcome" component={ScreenWelcome} options={{...options, headerShown : false, title : 'Welcome'}}/>
                    <StackNav.Screen name="ScreenSignUp" component={ScreenSignUp} options={{...screenOptions, title : 'Sign Up'}}/>
                    <StackNav.Screen name="ScreenSignUpVerifyOtp" component={ScreenSignUpVerifyOtp} options={{...screenOptions, title : 'Verification'}}/>
                    <StackNav.Screen name="ScreenSignIn" component={ScreenSignIn} options={{...screenOptions, title : 'Sign In'}}/>
                    <StackNav.Screen name="ScreenForgotPass" component={ScreenForgotPass} options={{...screenOptions, title : 'Forgot Password'}}/>
                </StackNav.Navigator>
            </NavigationContainer>
        );
    }
}

const mapStateToProps = (state) => {
    const s = state.authReducer;
    return {
        // isSigned: s.isSigned,
        // showSplash: s.showSplash,
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        // on_change: (name, value) => on_change(name, value),
    }, dispatch);
};


const styles = StyleSheet.create({

});

export default connect(mapStateToProps, mapDispatchToProps)(RouteAuth);
