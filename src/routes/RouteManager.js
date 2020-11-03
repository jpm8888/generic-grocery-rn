import React from 'react';
import {StyleSheet} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Colors from '../common/Colors';
import Font from '../common/Font';
import SplashScreen from '../screens/SplashScreen';
import RouteUser from './RouteUser';
import RouteAuth from './RouteAuth';

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

class RouteManager extends React.Component{

    constructor(props){

        super(props);
    }

    componentDidMount(): void {

    }


    render(){
        const {isSigned, showSplash} = this.props;


        if (showSplash) {
            return(
                <NavigationContainer>
                    <StackNav.Navigator>
                        <StackNav.Screen name="SplashScreen" component={SplashScreen} options={{...options, headerShown : false}}/>
                    </StackNav.Navigator>
                </NavigationContainer>
            );
        }

        return (
            (isSigned) ? <RouteUser/> : <RouteAuth/>
        );
    }
}

const mapStateToProps = (state) => {
    const s = state.authReducer;
    return {
        isSigned: s.isSigned,
        showSplash: s.showSplash,
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        // on_change: (name, value) => on_change(name, value),
    }, dispatch);
};


const styles = StyleSheet.create({

});

export default connect(mapStateToProps, mapDispatchToProps)(RouteManager);
