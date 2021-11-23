import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Dimensions,
  StatusBar,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import Colors from '../../assets/color';
import ValidationComponent from 'react-native-form-validator';

import axios from 'axios';
const baseUrl = 'https://horchana-room-services.herokuapp.com/api';

export default class CreateHuman extends ValidationComponent {
  state = {
    name: '',
    password: '',
    tel: '',
  };
  render() {
    const {navigation, route} = this.props;
    const {room} = route.params;
    return (
      <View style={styles.container}>
        <View style={styles.section}>
          <View style={styles.row}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{flex: 0.5}}>
              <Image source={require('../../assets/chevron.png')} />
            </TouchableOpacity>
            <Text style={styles.headder}>Create Resident</Text>
            <View style={{flex: 0.5}}></View>
          </View>
          <View style={{alignItems: 'center'}}>
            <Text style={styles.fontMid}>ROOM</Text>
            <Text style={styles.fontBold}>{room}</Text>
            <Text style={styles.fontLow}>1234 Bath</Text>
          </View>
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
              source={require('../../assets/account_circle.png')}
              style={{margin: 10}}
            />
            <TextInput
              ref="name"
              style={styles.input}
              placeHolder="Name"
              onChangeText={name => this.setState({name})}
            />
          </View>
          <View
            style={[
              styles.searchBox,
              {borderColor: this.isFieldInError('tel') ? '#fe0000' : '#bababa'},
            ]}>
            <Image
              source={require('../../assets/call.png')}
              style={{margin: 10}}
            />
            <TextInput
              ref="tel"
              style={styles.input}
              placeHolder="Phone number"
              keyboardType="numeric"
              onChangeText={tel => this.setState({tel})}
            />
          </View>
          <View
            style={[
              styles.searchBox,
              {
                borderColor: this.isFieldInError('password')
                  ? '#fe0000'
                  : '#bababa',
              },
            ]}>
            <Image
              source={require('../../assets/vpn_key.png')}
              style={{margin: 10}}
            />
            <TextInput
              ref="password"
              style={styles.input}
              placeHolder="Password"
              secureTextEntry={true}
              keyboardType="numeric"
              onChangeText={password => this.setState({password})}
            />
          </View>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => this._headderAPI(room)}>
            <Text
              style={{
                color: Colors.White,
                textAlign: 'center',
                fontSize: 15,
                fontWeight: '700',
              }}>
              NEW RESIDENT
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  async _headderAPI(id) {
    console.log('API addperson : ', id);
    const {navigation} = this.props;
    const {name, password, tel} = this.state;
    this.validate({
      name: {required: true, minlength: 4},
      tel: {required: true, numbers: true,minlength: 10},
      password: {required: true},
    });
    if (this.isFormValid()) {
      const data = {
        resident_info: {name, password, tel},
      };
      try {
        const resp = await axios.post(`${baseUrl}/room/addperson/${id}`,data);
        if(resp.data.msg){
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
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: "#ebebeb",
    // borderRadius: 15,
    marginVertical: 10,
    borderBottomWidth: 0.5,
    height:40
  },
  headder: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.Dask,
    textAlign: 'center',
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  fontBold: {
    fontSize: 18,
    paddingVertical: 5,
    color: Colors.Blue,
    fontWeight: 'bold',
  },
  fontMid: {
    fontSize: 16,
    paddingBottom: 5,
    paddingTop: 20,
    color: Colors.Dask,
  },
  fontLow: {fontSize: 16, paddingVertical: 5, color: Colors.Gray},
  btn: {
    backgroundColor: Colors.Blue,
    justifyContent: 'center',
    height: 40,
    borderRadius: 10,
    marginTop: 20,
  },
});
