// In App.js in a new project

import * as React from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider} from 'react-redux';
import store from './src/redux_store/store';
import Colors from './src/common/Colors';
import Font from './src/common/Font';
import RouteManager from './src/routes/RouteManager';

const Stack = createStackNavigator();

function App() {

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

  return (
      <Provider store = { store }>
        <View style={styles.container}>
          <StatusBar  backgroundColor={Colors.primaryLight} />
          <RouteManager/>
        </View>
      </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});

export default App;
