import React, {Component} from 'react';
import {Text, View} from 'react-native';

import {NavigationContainer, useIsFocused} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

//Stack Screen
import HomeStack from './HomeStack';
import PaymentStack from './PaymentStack';
import TextBoxStack from './TextBoxStack';
import SettingStack from './SettingStack';

//Screen
import CreatePage from '../screen/create/CreatePage';


//Custom TabBar
import TabBar from '../components/TabBar';
export default class MainNavigate extends Component {
  render() {
    return (
      <NavigationContainer>
        <Tab.Navigator
          tabBar={props => <TabBar {...props} />}
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName='Home'
          >
          <Tab.Screen name="Payment" component={PaymentStack} />
          <Tab.Screen name="Create" component={CreatePage} />
          <Tab.Screen name="Home" component={HomeStack} />
          <Tab.Screen name="TextBox" component={TextBoxStack} />
          <Tab.Screen name="Settings" component={SettingStack} />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}
