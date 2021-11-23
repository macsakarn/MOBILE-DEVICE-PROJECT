import React from 'react';
import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';

import Colors from '../../assets/color';

export default function roomsInMon(props) {
  


  const renderItem = items => {
    let status_color;
    if (items.item.status == 'wait') status_color = Colors.Blue;
    else if (items.item.status == 'uncheck') status_color = Colors.Yellow;
    else if (items.item.status == 'confirm') status_color = Colors.Green;

    return (
      <TouchableOpacity
        style={[
          styles.roomBtn,
          {
            backgroundColor: Colors.White,
            borderColor: Colors.Gray,
            flexDirection: 'row',
          },
        ]}
        onPress={() => {
          props.navigation.navigate('BillDetail',
          {roomId:items.item.roomId, roomPrice:items.item.price.room, name:items.item.resident_info.name,tel:items.item.resident_info.tel,waterPrice:items.item.price.water,electPrice:items.item.price.electricity,invoice_month:items.item.invoice_month});
        }}
        // onPress={() => {
        //   setNum();
        // }}
      >
        <View style={{flexDirection: 'column'}}>
          <Text style={{fontWeight: 'bold', fontSize: 18, color: Colors.Dask}}>
            {items.item.roomId}
          </Text>
          <Text style={{fontSize: 10, color: Colors.Dask}}>
            {items.item.invoice_date
              .substring(0, 9)
              .split('')
              .reverse()
              .join('')}
          </Text>
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
        <Text>{props.month}</Text>
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <FlatList
          data={props.bills}
          renderItem={items => renderItem(items)}
          numColumns={2}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.White,
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 20,
    flexDirection: 'column',
  },
  roomBtn: {
    justifyContent: 'space-between',
    width: '35%',
    borderWidth: 1,
    borderRadius: 10,
    padding: 8,
    marginHorizontal: 3.5,
    marginTop: 5,
  },
  roomBtn_status: {
    width: 15,
    height: 15,
    borderRadius: 180,
  },
});
