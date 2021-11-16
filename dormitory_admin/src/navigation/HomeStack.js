import React, {Component} from 'react';
import {Text, View} from 'react-native';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomePage from '../screen/home/HomePage';
import HomePage2 from '../screen/home/HomePage2';
const Stack = createNativeStackNavigator();
export default class HomeStack extends Component {
  render() {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="HomeScreen" component={HomePage} />
        <Stack.Screen name="HomeDetail" component={HomePage2} />
      </Stack.Navigator>
    );
  }
}
