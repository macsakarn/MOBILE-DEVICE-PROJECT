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

import axios from 'axios';
const baseUrl =
  'https://horchana-payment-service.herokuapp.com/api/invoice/get/all';

export default function BillPage({navigation}) {
  const [waitRoom, setWaitRoom] = useState(0);
  const [unCheckRoom, setunCheckRoom] = useState(0);
  const [confrimRoom, setConfrimRoom] = useState(0);
  const [rooomDB, setRoomDb] = useState([]);

  const getDB = async () => {
    try {
      await axios.get(baseUrl).then(response => {
        const DB = response.data;
        setRoomDb(DB);
      });
    } catch (error) {}
  };
  const count_roomStatus = () => {
    let num1 = 0;
    let num2 = 0;
    let num3 = 0;
    const forCount = rooomDB.map(items => {
      items.bills.map(item => {
        if (item.status == 'wait') num1++;
        else if (item.status == 'uncheck') num2++;
        else if (item.status == 'confirm') num3++;
      });
    });

    setWaitRoom(num1);
    setunCheckRoom(num2);
    setConfrimRoom(num3);
  };

  useEffect(() => {
    getDB();
    count_roomStatus();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log('Refreshed!');
    });
    return unsubscribe;
  }, [navigation]);


  var createBill = async () => {
    try {
      await axios.post(`https://horchana-payment-service.herokuapp.com/api/invoice/create`,{secretCode:"123456"}).then(response => {
        console.log(response);
      });
    } catch (error) {}
  }

  const headder = (
    <View style={styles.section}>
      <View style={{flexDirection:'row',justifyContent:'space-between'}}>
        <View style={{flex:0.5}}></View>
      <Text style={[styles.headder,{flex:1}]}>Payment</Text>
      <TouchableOpacity style={{flex:0.5,alignItems:'flex-end'}} onPress={createBill}>
        <Text>Create Bills</Text>
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
  const isBack = (wait, uncheck, confirms) => {
    setWaitRoom(wait);
    setunCheckRoom(uncheck);
    setConfrimRoom(confirms);
  };
  const renderItem = rooomDB => {
    return (
      <RoomsInMon
        month={rooomDB.item.month}
        bills={rooomDB.item.bills}
        navigation={navigation}
        isBack={isBack}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {headder}
      <FlatList
        data={rooomDB}
        renderItem={rooomDB => renderItem(rooomDB)}
        numColumns={1}
      />
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
    bottom:5
  },
  colContainer: {
    backgroundColor: Colors.White,
    width,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
});
