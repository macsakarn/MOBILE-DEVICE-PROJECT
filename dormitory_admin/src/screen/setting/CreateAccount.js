import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  StatusBar,
  TextInput,
  Alert
} from 'react-native';

import axios from 'axios';
const baseUrl = 'https://accounts-go-api.herokuapp.com';

import Colors from '../../assets/color';
import ValidationComponent from 'react-native-form-validator';

export default class CreateAccount extends ValidationComponent {
  constructor(props) {
    super(props);
    const {route} = this.props;
    this.state = {
      id: route.params.last+1,
      name: '',
      number: '',
    };
  }

  render() {
    const {navigation} = this.props;
    return (
      <View style={styles.container}>
        <View
          style={[
            styles.section,
            {
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            },
          ]}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{flex: 0.5}}>
            <Image source={require('../../assets/chevron.png')} />
          </TouchableOpacity>
          <Text style={styles.headder}>Create Accounts</Text>
          <View style={{flex: 0.5}}></View>
        </View>
        <View style={styles.section}>
          <View
            style={[
              styles.searchBox,
              {
                borderColor: this.isFieldInError('name')
                  ? '#fe0000'
                  : '#bababa',
              },
            ]}>
            <Image
              source={require('../../assets/account_balance.png')}
              style={{margin: 10}}
            />
            <TextInput
              ref="name"
              placeholder="Bank"
              onChangeText={name => this.setState({name})}
            />
          </View>
          <View
            style={[
              styles.searchBox,
              {
                borderColor: this.isFieldInError('number')
                  ? '#fe0000'
                  : '#bababa',
              },
            ]}>
            <Image
              source={require('../../assets/payment2.png')}
              style={{margin: 10}}
            />
            <TextInput
              ref="number"
              placeholder="Account number"
              onChangeText={number => this.setState({number})}
              keyboardType="numeric"
            />
          </View>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => this._headderAPI()}>
            <Text
              style={{
                color: Colors.White,
                textAlign: 'center',
                fontSize: 15,
                fontWeight: '700',
              }}>
              NEW ACCOUNT
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  async _headderAPI(){
    const {navigation} = this.props;
    const {id, name, number} = this.state
    this.validate({
      name: {required: true},
      number: {required: true, numbers: true, minlength:10},
    });
    if (this.isFormValid()) {
      const data = {
        id,name,number
      };
      try {
        const resp = await axios.post(`${baseUrl}/owner/account`,data);
        if(resp.data){
          navigation.popToTop()
        }
      } catch (err) {
        console.error(err);
      }
    } else {
      Alert.alert('Error', this.getErrorMessages(), [{text: 'OK'}]);
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
    paddingHorizontal: 20,
    paddingBottom: 30,
    marginBottom: 10,
    paddingTop: StatusBar.currentHeight || 0,
  },
  headder: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.Dask,
    textAlign: 'center',
    flex: 1,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: "#ebebeb",
    // borderRadius: 15,
    marginVertical: 10,
    borderBottomWidth: 0.5,
  },
  btn: {
    backgroundColor: Colors.Blue,
    justifyContent: 'center',
    height: 40,
    borderRadius: 10,
    marginTop: 20,
  },
});
