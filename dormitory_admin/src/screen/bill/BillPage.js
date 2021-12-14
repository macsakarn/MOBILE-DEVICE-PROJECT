import {NavigationContainer, useIsFocused} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  Dimensions,
  StatusBar,
  Image,
  TextInput,
  TouchableOpacity,
  FloorBox,
} from 'react-native';
import Colors from '../../assets/color';
import BoxHome from '../../components/onlyHome/BoxHome';
import RoomsInMon from '../../components/billPage/roomsInMon';

import dataDemo from '../../dataDemo/roomsBills.json';

import axios from 'axios';
const baseUrl =
  'https://horchana-payment-service.herokuapp.com/api/invoice/get/all';

export default function BillPage({navigation}) {
  const [waitRoom, setWaitRoom] = useState(0);
  const [unCheckRoom, setunCheckRoom] = useState(0);
  const [confrimRoom, setConfrimRoom] = useState(0);
  const [roomDB, setRoomDb] = useState([]);

  const isFocused = useIsFocused();

  const getDB = async () => {
    try {
      await axios.get(baseUrl).then(response => {
        const DB = response.data;
        setRoomDb(DB);
      });
    } catch (error) {}
  };
  // const getDB = () => {
  //   setRoomDb(dataDemo);
  // };

  const count_roomStatus = () => {
    var num1 = 0;
    var num2 = 0;
    var num3 = 0;
    console.log(roomDB.length);
    roomDB.forEach(items => {
      items.bills.forEach(item => {
        console.log(item.status + '****');
        if (item.status == 'wait') {
          num1 = num1 + 1;
          // setWaitRoom(waitRoom + 1);
        } else if (item.status == 'uncheck') {
          num2 = num2 + 1;
          // setunCheckRoom(unCheckRoom + 1);
        } else if (item.status == 'confirm') {
          num3 = num3 + 1;
          // setConfrimRoom(confrimRoom + 1);
        }
      });
    });
    setWaitRoom(num1);
    setunCheckRoom(num2);
    setConfrimRoom(num3);
    console.log(waitRoom, unCheckRoom, confrimRoom);
  };

  useEffect(() => {
    getDB();
    // count_roomStatus();
    console.log('Refreshed!');
    // setTimeout(() => {
    count_roomStatus();
    // }, 3000);
    // const unsubscribe = navigation.addListener('focus', () => {
    //   console.log('Refreshed!');
    //   getDB();
    //   count_roomStatus();
    // });
    // return unsubscribe;
  }, [isFocused]);

  var createBill = async () => {
    try {
      await axios
        .post(
          `https://horchana-payment-service.herokuapp.com/api/invoice/create`,
          {secretCode: '123456'},
        )
        .then(response => {
          console.log(response);
        });
    } catch (error) {}
  };

  const headder = (
    <View style={styles.section}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={{flex: 0.5}}></View>
        <Text style={[styles.headder, {flex: 1}]}>Payment</Text>
        <TouchableOpacity
          style={{flex: 0.5, alignItems: 'flex-end'}}
          onPress={createBill}>
          <Text style={{color: Colors.Blue}}>Create Bill</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginVertical: 20,
        }}>
        <BoxHome
          image={require('../../assets/alarm.png')}
          value={`${waitRoom} rooms`}
          color={Colors.Blue}
          title="Wait for upload slip"
          style={{height: 150}}
        />
        <BoxHome
          image={require('../../assets/history.png')}
          value={`${unCheckRoom} rooms`}
          color={Colors.Yellow}
          title="Paid unchecked"
        />
        <BoxHome
          image={require('../../assets/assignment.png')}
          value={`${confrimRoom} rooms`}
          color={Colors.Green}
          title="Paid Confirm"
        />
      </View>
    </View>
  );
  const renderItem = roomDB => {
    return (
      <RoomsInMon
        month={roomDB.item.month}
        bills={roomDB.item.bills}
        navigation={navigation}
      />
    );
  };
  // getDB();
  return (
    <SafeAreaView style={styles.container}>
      {headder}
      <FlatList
        data={roomDB}
        renderItem={roomDB => renderItem(roomDB)}
        numColumns={1}
        // style={{paddingBottom:0}}
      />

      <View
        style={{
          height: 70,
          backgroundColor: Colors.White,
          marginTop: 10,
        }}></View>
    </SafeAreaView>
  );
}

const {width} = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.BG,
    flex: 1,
    flexDirection: 'column',
  },
  section: {
    backgroundColor: Colors.White,
    paddingHorizontal: 20,
    marginBottom: 10,
    paddingBottom: 5,
    paddingTop: StatusBar.currentHeight || 0,
  },
  headder: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.Dask,
    textAlign: 'center',
    bottom: 5,
  },
  colContainer: {
    backgroundColor: Colors.White,
    width,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
});
