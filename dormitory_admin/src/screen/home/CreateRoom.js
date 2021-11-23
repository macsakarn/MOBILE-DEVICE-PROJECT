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
} from 'react-native';

import ValidationComponent from 'react-native-form-validator';
import Colors from '../../assets/color';

import BtnQR from '../../components/BtnQRcode';
export default class FormTest extends ValidationComponent {
  constructor(props) {
    super(props);
    this.state = {
      roomId: '',
      room_price: null,
      electric_meterId: '',
      water_meterId: '',
      electricCam: false,
      waterCam: false,
    };
  }

  _onPressButton() {
    const {roomID, room_price, electric_meterId, water_meterId} = this.state;
    // Call ValidationComponent validate method
    this.validate({
      roomId: {required: true,},
      room_price: {required: true, numbers: true},
      electric_meterId: {required: true,},
      water_meterId: {required: true,},
    });
  }

  _headdleBack = () => {
    this.setState({
      electricCam: false,
      waterCam: false,
    });
  };

  _headdleQR(type, value) {
    if (type == 'electric') {
      this.setState({
        electric_meterId: value,
      });
    } else {
      this.setState({
        water_meterId: value,
      });
    }
  }

  render() {
    const {navigation} = this.props;
    const {electricCam, electric_meterId, waterCam, water_meterId} = this.state;
    if (electricCam) {
      return (
        <BtnQR
          back={this._headdleBack}
          scan={this._headdleQR}
          type={'electric'}
        />
      );
    } else if (waterCam) {
      return (
        <BtnQR back={this._headdleBack} scan={this._headdleQR} type={'water'} />
      );
    }
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
              placeholder="roomId"
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
              placeholder="Price"
              keyboardType="numeric"
              onChangeText={room_price => this.setState({room_price})}
            />
          </View>
          <View
            style={[
              styles.row,
              {justifyContent: 'space-around',marginTop: StatusBar.currentHeight + 20 || 0},
            ]}>
            <View style={{alignItems: 'center'}}>
              <Text style={styles.text}>
                {!electric_meterId ? 'Electric Meter' : electric_meterId}
              </Text>
              <TouchableOpacity
                style={[styles.btn, {
                  borderColor: this.isFieldInError('electric_meterId')
                    ? '#fe0000'
                    : '#bababa',
                },]}
                onPress={() => this.setState({electricCam: true})}>
                <Image source={require('../../assets/camera.png')} />
              </TouchableOpacity>
            </View>
            <View style={{alignItems: 'center'}}>
              <Text style={styles.text}>
                {!electric_meterId ? 'Water Meter' : electric_meterId}
              </Text>
              <TouchableOpacity
                style={[styles.btn, {
                  borderColor: this.isFieldInError('water_meterId')
                    ? '#fe0000'
                    : '#bababa',
                },]}
                onPress={() => this.setState({waterCam: true})}>
                <Image source={require('../../assets/camera.png')} />
              </TouchableOpacity>
            </View>
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
    // backgroundColor: "#ebebeb",
    // borderRadius: 15,
    marginTop: StatusBar.currentHeight  || 0,
    borderBottomWidth: 0.5,
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
