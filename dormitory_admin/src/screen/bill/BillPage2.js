import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  TextInput,
  Alert,
} from 'react-native';
import Colors from '../../assets/color';
import Detail from '../../components/Detail';

import axios from 'axios';
const baseURL = 'https://horchana-payment-service.herokuapp.com/api/invoice/';

export default function TextBoxPage2({route, navigation}) {
  const {roomId, roomPrice, name, tel, waterPrice, electPrice, invoice_month} =
    route.params;
  //   console.log(roomId);
  const changeToConfirm = () => {
    console.log(roomId, invoice_month);
    const data = {
      roomId: roomId,
      invoice_month: invoice_month,
    };
    axios.post(`${baseURL}confirm`, data).catch(error => {
      console.log(error);
    });
  };
  const changeToWait = () => {
    console.log(roomId, invoice_month);
    const data = {
      roomId: roomId,
      invoice_month: invoice_month,
    };
    axios.post(`${baseURL}wait`, data).catch(error => {
      console.log(error);
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{flex: 0.5}}>
            <Image source={require('../../assets/chevron.png')} />
          </TouchableOpacity>
          <Text style={styles.headder}>Payment bill detail.</Text>
          <TouchableOpacity style={{flex: 0.5}}>
            {/* <Text style={{textAlign: 'right', color: '#fe0000'}}>DELETE</Text> */}
          </TouchableOpacity>
        </View>
        <View style={{alignItems: 'center'}}>
          <Text
            style={{
              fontSize: 16,
              paddingBottom: 5,
              paddingTop: 20,
              color: Colors.Dask,
            }}>
            ROOM
          </Text>
          <Text
            style={{
              fontSize: 18,
              paddingVertical: 5,
              color: Colors.Blue,
              fontWeight: 'bold',
            }}>
            {roomId}
          </Text>
          <Text style={{fontSize: 16, paddingVertical: 5, color: Colors.Gray}}>
            {roomPrice} Bath
          </Text>
        </View>
      </View>
      <View style={styles.section}>
        <Detail title={'Residents'} value={name} />
        <Detail title={'Contact'} value={tel} />
        <Detail
          title={'Usege this month'}
          value={electPrice.toFixed(2)}
          image={require('../../assets/Bolt2.png')}
        />
        <Detail
          title={'Usege this month'}
          value={waterPrice.toFixed(2)}
          image={require('../../assets/water2.png')}
        />
        <Detail
          title={'Sum bill price.'}
          value={(waterPrice + electPrice + roomPrice).toFixed(2)}
          image={require('../../assets/payment2.png')}
        />
      </View>
      <TouchableOpacity
        style={styles.btnWait}
        activeOpacity={0.9}
        onPress={() => {
          changeToWait();
          navigation.goBack();
        }}>
        <Image source={require('../../assets/alarmred.png')} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btnComfirm}
        activeOpacity={0.9}
        onPress={() => {
          changeToConfirm();
          navigation.goBack();
        }}>
        <Image source={require('../../assets/assignmentGreen.png')} />
      </TouchableOpacity>
    </View>
  );
}
let {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.BG,
    flex: 1,
  },
  section: {
    backgroundColor: Colors.White,
    width,
    paddingHorizontal: 20,
    paddingVertical: 30,
    marginBottom: 10,
  },
  headder: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.Dask,
    textAlign: 'center',
    flex: 1,
  },
  btnWait: {
    height: 75,
    width: 75,
    backgroundColor: Colors.White,
    position: 'absolute',
    bottom: 160,
    right: 10,
    borderRadius: 99,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnComfirm: {
    height: 75,
    width: 75,
    backgroundColor: Colors.White,
    position: 'absolute',
    bottom: 80,
    right: 10,
    borderRadius: 99,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
