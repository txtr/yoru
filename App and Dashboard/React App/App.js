import React, { Component } from 'react';
import { View, StyleSheet, AsyncStorage } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LogBox } from 'react-native';

import SplashScreen from './src/Screens/SplashScreen';
import LoginScreen from './src/Screens/LoginScreen';
import MessageScreen from './src/Screens/MessageScreen';
import NamePage from './src/Screens/NamePage';
import Preferences from './src/Screens/Preferences';
import Home from './src/Screens/Home';
import CruiseMap from './src/Screens/CruiseMap'


const Stack = createStackNavigator();


function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      {console.disableYellowBox = true}
        <Stack.Screen name="Yoru:- Your Helper" component={SplashScreen} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="login" component={LoginScreen} />
        <Stack.Screen name="Yoru" component={MessageScreen} />
        <Stack.Screen name="Cruise Map" component={CruiseMap} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

