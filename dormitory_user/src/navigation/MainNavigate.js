import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();

//screen
import HomePage from '../screen/home/HomePage';
import RecordBill from '../screen/record/RecordBill';
import SettingPage from '../screen/setting/SettingPage';
import TextBoxPage from '../screen/textBox/TextBoxPage';
import UploadBill from '../screen/upload/UploadBill';

//cuttom navigation
import TabBar from '../components/TabBar';

export default class MainNavigate extends Component {
  render() {
    const {user} = this.props
    return (
      <NavigationContainer>
        <Tab.Navigator
          tabBar={props => <TabBar {...props} />}
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName="HomePage">
          <Tab.Screen name="RecordBill" component={RecordBill} initialParams={{user}}/>
          <Tab.Screen name="UploadBill" component={UploadBill} initialParams={{user}}/>
          <Tab.Screen name="HomePage" component={HomePage} initialParams={{user}}/>
          <Tab.Screen name="TextBoxPage" component={TextBoxPage} initialParams={{user}}/>
          <Tab.Screen name="SettingPage" component={SettingPage} initialParams={{user}}/>
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}
