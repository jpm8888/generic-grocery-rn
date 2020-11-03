import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import Colors from '../common/Colors';
import Font from '../common/Font';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ScreenHome from '../screens/ScreenHome';
import CustomHeader from './components/CustomHeader';
import ScreenOrderHistory from '../screens/ScreenOrderHistory';
import ScreenProfileHome from '../screens/ScreenProfileHome';


const Tab = createBottomTabNavigator();
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
class UserTabs extends Component {
    render() {
        return (
            <Tab.Navigator screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === 'ScreenHome') {
                        iconName = 'home';
                    } else if (route.name === 'ScreenOrderHistory') {
                        iconName = 'rocket1';
                    }else if (route.name === 'ScreenProfileHome') {
                        iconName = 'user';
                    }
                    return <AntDesign name={iconName} size={size} color={color} />;
                },
                 })}
                           tabBarOptions={{
                               activeTintColor: 'tomato',
                               inactiveTintColor: 'gray',
                           }}>

                <Tab.Screen name="ScreenHome" component={ScreenHome} options={(props)=>{
                    return {
                        ...screenOptions,
                        title : 'Home',
                        headerRight : ()=> <CustomHeader {...props}/>
                    }
                }}/>

                <Tab.Screen name="ScreenOrderHistory" component={ScreenOrderHistory} options={(props)=>{
                    return {
                        ...screenOptions,
                        title : 'Orders',
                    }
                }}/>

                <Tab.Screen name="ScreenProfileHome" component={ScreenProfileHome} options={(props)=>{
                    return {
                        ...screenOptions,
                        title : 'Profile',
                    }
                }}/>
            </Tab.Navigator>
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

    }, dispatch);
};


const styles = StyleSheet.create({

});

export default connect(mapStateToProps, mapDispatchToProps)(UserTabs);
