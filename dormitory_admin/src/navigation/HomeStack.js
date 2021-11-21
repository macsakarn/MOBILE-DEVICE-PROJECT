import React, {Component} from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomePage from '../screen/home/HomePage';
import HomePage2 from '../screen/home/HomePage2';
import CreateHuman from '../screen/home/CreateHuman';
import CreateRoom from '../screen/home/CreateRoom';
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
        <Stack.Screen name="CreateHuman" component={CreateHuman} />
        <Stack.Screen name="CreateRoom" component={CreateRoom} />
      </Stack.Navigator>
    );
  }
}
