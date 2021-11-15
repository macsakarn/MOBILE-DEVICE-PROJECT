import React, {Component} from 'react';
import {Text, View} from 'react-native';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import TextBox from '../screen/textbox/TextBoxPage';
import TextBox2 from '../screen/textbox/TextBoxPage2';

const Stack = createNativeStackNavigator();

export default class TextBoxStack extends Component {
  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="TextBox" component={TextBox} />
        <Stack.Screen name="TextCreate" component={TextBox2} />
      </Stack.Navigator>
    );
  }
}
