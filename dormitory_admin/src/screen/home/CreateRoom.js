import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  StatusBar,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';

import ValidationComponent from 'react-native-form-validator';
import Colors from '../../assets/color';

import axios from 'axios';
const baseUrl = 'https://horchana-room-services.herokuapp.com/api';
export default class FormTest extends ValidationComponent {
  constructor(props) {
    super(props);
    this.state = {
      roomId: '',
      room_price: null,
    };
  }

  render() {
    const {navigation} = this.props;
    return (
      <View style={styles.container}>
        <View style={[styles.section, styles.row]}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{flex: 0.5}}>
            <Image source={require('../../assets/chevron.png')} />
          </TouchableOpacity>
          <Text style={styles.headder}>NEW ROOM</Text>
          <View style={{flex: 0.5}}></View>
        </View>
        <View style={styles.section}>
          <View
            style={[
              styles.searchBox,
              {
                borderColor: this.isFieldInError('roomId')
                  ? '#fe0000'
                  : '#bababa',
              },
            ]}>
            <Image
              source={require('../../assets/account_circle.png')}
              style={{margin: 10}}
            />
            <TextInput
              ref="roomId"
              placeHolder="roomId"
              onChangeText={roomId => this.setState({roomId})}
            />
          </View>
          <View
            style={[
              styles.searchBox,
              {
                borderColor: this.isFieldInError('room_price')
                  ? '#fe0000'
                  : '#bababa',
              },
            ]}>
            <Image
              source={require('../../assets/home.png')}
              style={{margin: 10}}
            />
            <TextInput
              ref="room_price"
              placeHolder="Price"
              keyboardType="numeric"
              onChangeText={room_price => this.setState({room_price})}
            />
          </View>
          <TouchableOpacity
            style={styles.btnAPI}
            onPress={() => this._onPressButton()}>
            <Text
              style={{
                color: Colors.White,
                textAlign: 'center',
                fontSize: 15,
                fontWeight: '700',
              }}>
              NEW ROOM
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  async _onPressButton() {
    const {navigation} = this.props
    const {roomId,room_price} = this.state
    this.validate({
      roomId: {required: true},
      room_price: {required: true, numbers: true},
    });
    if (this.isFormValid()) {
      const data = {
        roomId,
        electric_meterId: null,
        water_meterId: null,
        room_price:parseInt(room_price),
        resident_info: {
          name: null,
          password: null,
          tel: null,
          entrance_date: null,
          entrance_code: null,
        },
      }
      try {
        const resp = await axios.post(`${baseUrl}/room/create`, data);
        if (resp.data.msg) {
          navigation.popToTop();
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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: StatusBar.currentHeight || 0,
    borderBottomWidth: 0.5,
    height:40
  },
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    width: 55,
    height: 55,
    borderRadius: 40,
    borderColor: '#bababa',
    borderWidth: 2,
  },
  text: {
    backgroundColor: '#ddd',
    height: 20,
    width: 100,
    marginBottom: 10,
    textAlign: 'center',
  },
  btnAPI: {
    backgroundColor: Colors.Blue,
    justifyContent: 'center',
    height: 40,
    borderRadius: 10,
    marginTop: StatusBar.currentHeight + 20 || 0,
  },
});
