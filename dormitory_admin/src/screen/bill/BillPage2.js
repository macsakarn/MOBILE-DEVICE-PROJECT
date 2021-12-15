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
  ScrollView,
} from 'react-native';
import Colors from '../../assets/color';
import Detail from '../../components/Detail';

import axios from 'axios';
const baseURL = 'https://horchana-payment-service.herokuapp.com/api/invoice/';

export default function TextBoxPage2({route, navigation}) {
  const {
    roomId,
    roomPrice,
    name,
    tel,
    waterPrice,
    electPrice,
    invoice_month,
    status,
  } = route.params;
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
  let waitBtn =
    status == 'uncheck' || 'confirm' || 'wait' ? (
      <TouchableOpacity
        style={styles.btnWait}
        activeOpacity={0.9}
        onPress={() => {
          changeToWait();
          navigation.goBack();
        }}>
        <Image source={require('../../assets/alarm.png')} />
      </TouchableOpacity>
    ) : (
      <View></View>
    );
  let confirmBtn =
    status != 'confirm' ? (
      <TouchableOpacity
        style={styles.btnComfirm}
        activeOpacity={0.9}
        onPress={() => {
          changeToConfirm();
          navigation.goBack();
        }}>
        <Image source={require('../../assets/assignment.png')} />
      </TouchableOpacity>
    ) : (
      <View></View>
    );
  console.log(status);
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
          <Text style={{fontSize: 16, paddingVertical: 5, color: Colors.Green}}>
            {roomPrice} Bath
          </Text>
        </View>
      </View>
      <ScrollView>
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
            title={'Total bill price.'}
            value={(waterPrice + electPrice + roomPrice).toFixed(2)}
            image={require('../../assets/payment2.png')}
          />
        </View>

        <View style={[styles.section,{paddingBottom:100}]}>
          <Image
            style={styles.receiptImg}
            source={{
              uri: 'https://inex.co.th/home/wp-content/uploads/2020/10/%E0%B8%AA%E0%B8%A5%E0%B8%B4%E0%B8%9B%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B9%82%E0%B8%AD%E0%B8%99%E0%B9%80%E0%B8%87%E0%B8%B4%E0%B8%99%E0%B8%84%E0%B9%88%E0%B8%B2%E0%B8%AB%E0%B8%99%E0%B8%B1%E0%B8%87%E0%B8%AA%E0%B8%B7%E0%B8%AD.png',
            }}
          />
        </View>
      </ScrollView>
      {waitBtn}
      {confirmBtn}
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
    backgroundColor: Colors.Blue,
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
    backgroundColor: Colors.Green,
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
  receiptImg: {
    width: 350,
    height: 470,
  },
});
