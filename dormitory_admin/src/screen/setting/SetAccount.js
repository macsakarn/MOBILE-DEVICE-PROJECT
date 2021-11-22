import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  StatusBar,
  TextInput,
  Alert,
} from 'react-native';

import axios from 'axios';
const baseUrl = 'https://accounts-go-api.herokuapp.com';

import Colors from '../../assets/color';
import ValidationComponent from 'react-native-form-validator';

export default class SetAccount extends ValidationComponent {
  constructor(props) {
    super(props);
    const {route} = this.props;
    const {id, name, number} = route.params.item;
    this.state = {
      id: id,
      name: name,
      number: number,
    };
  }

  render() {
    const {navigation, route} = this.props;
    const {name, number} = route.params.item;
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
            style={{flex: 1}}>
            <Image source={require('../../assets/chevron.png')} />
          </TouchableOpacity>
          <Text style={styles.headder}>Accounts</Text>
          <TouchableOpacity style={{flex: 1}} onPress={() => this.removeAccount()}>
            <Text style={{textAlign: 'right', color: '#fe0000'}}>DELETE</Text>
          </TouchableOpacity>
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
              defaultValue={name}
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
              defaultValue={number}
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
              UPDATE ACCOUNT
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  async _headderAPI() {
    const {navigation} = this.props;
    const {id, name, number} = this.state;
    this.validate({
      name: {required: true},
      number: {required: true, numbers: true, minlength: 10},
    });
    if (this.isFormValid()) {
      const data = {
        id,
        name,
        number,
      };
      try {
        const resp = await axios.put(`${baseUrl}/owner/account`, data);
        if (resp.data) {
          navigation.popToTop();
        }
      } catch (err) {
        console.error(err);
      }
    } else {
      Alert.alert('Error', this.getErrorMessages(), [{text: 'OK'}]);
    }
  }

  async _headderDelete() {
    const {navigation} = this.props;
    const {name} = this.state;
    try {
      const resp = await axios.put(`${baseUrl}/owner/account/delete`, {name});
      if (resp.data.staus) {
        console.log(resp.data);
        navigation.popToTop();
      }
    } catch (err) {
      console.error(err.message);
    }
  }

  removeAccount(){
    Alert.alert(
      "Remove Account",
      "Do you want to remove Account?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { text: "OK", onPress: () =>  this._headderDelete()}
      ]
    );
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
