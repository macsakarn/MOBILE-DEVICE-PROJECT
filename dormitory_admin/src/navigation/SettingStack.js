import React, {Component} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import SetPage from '../screen/setting/SetPage';
import SetEdit from '../screen/setting/SetEdit';
import SetAccount from '../screen/setting/SetAccount';
import CreateAccount from '../screen/setting/CreateAccount';

const Stack = createNativeStackNavigator();

export default class SettingStack extends Component {
  render() {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="SetPage" component={SetPage} />
        <Stack.Screen name="SetEdit" component={SetEdit} />
        <Stack.Screen name="SetAccount" component={SetAccount} />
        <Stack.Screen name="CreateAccount" component={CreateAccount} />
      </Stack.Navigator>
    );
  }
}
