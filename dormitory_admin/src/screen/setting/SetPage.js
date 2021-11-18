import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Dimensions,
  Image,
  ScrollView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
const baseUrl = 'https://accounts-go-api.herokuapp.com';

import Colors from '../../assets/color';

import SettingText from '../../components/onlySetting/SettingText';
import SettingAccount from '../../components/onlySetting/SettingAccount';
export default class SetPage extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    info: null,
    accounts: null,
  };

  async componentDidMount() {
    const concurrentRequests = [
      axios.get(`${baseUrl}/owner/info`),
      axios.get(`${baseUrl}/owner/account`),
    ];
    Promise.all(concurrentRequests)
      .then(result => {
        this.setState({info: result[0].data, accounts: result[1].data});
      })
      .catch(err => {
        console.log(err);
      });
  }

  Accounts() {
    const {account} = this.state.accounts;
    return account.map((item, index) => {
      return (
        <SettingAccount
          name={item.name}
          number={item.number}
          key={index}
          _onPress={() =>
            this._handleBasic({name: 'account', change: item.id}, item)
          }
        />
      );
    });
  }

  _handleBasic(type, data) {
    const {navigation} = this.props;
    navigation.navigate('SetEdit', {type, data});
  }

  render() {
    if (!this.state.info || !this.state.accounts) {
      return (
        <View style={styles.container}>
          <View style={styles.section}>
            <Text style={styles.headder}>Setting</Text>
          </View>
        </View>
      );
    } else {
      const {info} = this.state;
      const address = info.address.split('อำเภอ');

      return (
        <View style={styles.container}>
          <StatusBar backgroundColor="#fff" barStyle="dark-content" />
          <ScrollView>
            <View style={styles.section}>
              <Text style={styles.headder}>Setting</Text>
              <TouchableOpacity
                onPress={() => {
                  this._handleBasic({name: 'info', change: 'profile'}, info);
                }}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View>
                  <Text style={[styles.font, {fontWeight: 'bold'}]}>
                    {info.name}
                  </Text>
                  <Text style={styles.font}>{info.tel}</Text>
                  <Text style={styles.font}>{address[0]}</Text>
                  <Text style={styles.font}>อำเภอ{address[1]}</Text>
                </View>
                <Image source={require('../../assets/arrow.png')} />
              </TouchableOpacity>
            </View>
            <View style={styles.section}>
              <Text style={styles.samiHeadder}>Service Rate</Text>
              <SettingText
                price={info.electricityBill}
                title="Electricity Tariff / Unit"
                _onPress={() =>
                  this._handleBasic({name: 'rate', change: 'ele'}, info)
                }
              />
              <SettingText
                price={info.waterBill}
                title="Water Tariff / Unit"
                _onPress={() =>
                  this._handleBasic({name: 'rate', change: 'wat'}, info)
                }
              />
              <SettingText
                price={info.servicePerDate}
                title="Daily Service Rate"
                _onPress={() =>
                  this._handleBasic({name: 'rate', change: 'dail'}, info)
                }
              />
            </View>
            <View style={[styles.section, {marginBottom: 100}]}>
              <Text style={styles.samiHeadder}>Account</Text>
              {this.Accounts()}
            </View>
          </ScrollView>
        </View>
      );
    }
  }
}

const {width} = Dimensions.get('screen');
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.BG,
    flex: 1,
  },
  section: {
    backgroundColor: Colors.White,
    width,
    padding: 20,
    marginBottom: 10,
  },
  font: {
    lineHeight: 22,
    fontSize: 14,
    color: Colors.Dask,
  },
  headder: {
    fontSize: 25,
    fontWeight: 'bold',
    color: Colors.Dask,
    marginBottom: 20,
    alignSelf: 'center',
  },
  samiHeadder: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.Dask,
  },
  
});
