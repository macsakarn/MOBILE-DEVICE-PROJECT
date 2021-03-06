import React, {Component} from 'react';
import {Text, View} from 'react-native';

import {NavigationContainer, useIsFocused} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import BillPage from '../screen/bill/BillPage';
import BillPage2 from '../screen/bill/BillPage2';

const Stack = createNativeStackNavigator();
export default class PaymentStack extends Component {
  render() {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Bill" component={BillPage} />
        <Stack.Screen name="BillDetail" component={BillPage2} />
      </Stack.Navigator>
    );
  }
}
