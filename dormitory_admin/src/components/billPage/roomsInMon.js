import React, {useState} from 'react';
import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';

import Colors from '../../assets/color';

export default function roomsInMon(props) {
  const renderItem = items => {
    let status_color;
    let disabled = false;
    let date = items.item.invoice_date
      .substring(0, 9)
      .split('')
      .reverse()
      .join('');
    date =
      date.substring(0, 5) + date.substring(5, 9).split('').reverse().join('');
    if (items.item.status == 'wait') {
      status_color = Colors.Blue;
      disabled = true;
    } else if (items.item.status == 'uncheck') status_color = Colors.Yellow;
    else if (items.item.status == 'confirm') status_color = Colors.Green;

    return (
      <TouchableOpacity
        style={styles.roomBtn}
        onPress={() => {
          // go to BillPage2.js
          if(disabled == false){
            props.navigation.navigate('BillDetail', {
              roomId: items.item.roomId,
              roomPrice: items.item.price.room,
              name: items.item.resident_info.name,
              tel: items.item.resident_info.tel,
              waterPrice: items.item.price.water,
              electPrice: items.item.price.electricity,
              invoice_month: items.item.invoice_month,
              status: items.item.status,
            });
          }
        }}>
        <View style={{flexDirection: 'column'}}>
          <Text style={{fontWeight: 'bold', fontSize: 18, color: Colors.Dask}}>
            {items.item.roomId}
          </Text>
          <Text style={{fontSize: 10, color: Colors.Dask}}>{date}</Text>
        </View>
        <View
          style={[
            styles.roomBtn_status,
            {backgroundColor: status_color},
          ]}></View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <View style={{flex: 1}}>
        {/* //This month , Last Month , 2 Month Ago*/}
        <Text>{props.month}</Text>
      </View>
      <View style={{flex: 1}}>
        <FlatList
          data={props.bills}
          renderItem={items => renderItem(items)}
          numColumns={4}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.White,
    flex: 1,
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: 'column',
    borderBottomWidth:0.5,
    borderBottomColor:Colors.Gray,
    // marginBottom:10
  },
  roomBtn: {
    backgroundColor: Colors.White,
    borderColor: Colors.Gray,
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 10,
    padding: 8,
    marginHorizontal: 3.5,
    marginVertical: 5,
  },
  roomBtn_status: {
    marginLeft:1,
    width: 15,
    height: 15,
    borderRadius: 180,
  },
});
