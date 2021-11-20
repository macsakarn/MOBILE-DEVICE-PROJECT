import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native';

import Colors from '../../assets/color';

export default function CreatePage() {
  const [fName, setFName] = useState('');
  const [lName, setLName] = useState('');
  const [phone, setPhone] = useState('');

  const DATA = [
    {
      roomId: 'A001',
    },
    {
      roomId: 'A002',
    },
    {
      roomId: 'A003',
    },
    {
      roomId: 'A104',
    },
    {
      roomId: 'A105',
    },
    {
      roomId: 'A106',
    },
    {
      roomId: 'A107',
    },
    {
      roomId: 'A208',
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.hd_txt}>Add new resident </Text>
        {/* <Text style={styles.hd_txt_TH}>เพิ่มผู้เช่าคนใหม่</Text> */}
      </View>
      <View style={styles.content}>
        {/* Input content */}
        <View style={{flexDirection: 'column', borderWidth: 1}}>
          {/* fl Label */}
          <View style={{flexDirection: 'row'}}>
            <Text style={[{marginRight: 4}, styles.flname_phon_Label]}>
              First name
            </Text>
            <Text style={[{marginLeft: 4}, styles.flname_phon_Label]}>
              Last name
            </Text>
          </View>
          {/* fl Inputbox */}
          <View style={{flexDirection: 'row'}}>
            <TextInput
              maxLength={30}
              onChangeText={text => setFName(text)}
              value={fName}
              style={[{marginRight: 4}, styles.flname_phone_Input]}
            />
            <TextInput
              maxLength={30}
              onChangeText={text => setLName(text)}
              value={lName}
              style={[{marginLeft: 4}, styles.flname_phone_Input]}
            />
          </View>
          {/* phone Label */}
          <View style={{flexDirection: 'row'}}>
            <Text style={[{marginTop: 10}, styles.flname_phon_Label]}>
              Phone number
            </Text>
          </View>
          {/* phone Inputbox */}
          <View style={{flexDirection: 'row'}}>
            <TextInput
              maxLength={10}
              onChangeText={text => setPhone(text)}
              value={phone}
              style={styles.flname_phone_Input}
            />
          </View>
        </View>
        {/* Room ID content */}
        <View style={{flexDirection: 'column', borderWidth: 1, marginTop: 20}}>
          <Text style={styles.roomID_Label}>Room ID</Text>
          {/* Room ID Table */}
          <View style={styles.roomID_Table}></View>
        </View>
        {/* Button 'Create' */}
        <View style={{borderWidth: 1, marginTop: 20}}>
          <TouchableOpacity
            onPress={() => {
              confirmationAlert();
            }}
            style={styles.btn}>
            <Text
              style={{
                color: Colors.White,
                textAlign: 'center',
                fontSize: 12,
                fontWeight: '700',
              }}>
              CREATE
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: 'white',
    flex: 1,
    borderWidth: 1,
    borderColor: 'red',
  },
  header: {
    paddingVertical: 30,
    flexDirection: 'column',
    alignItems: 'center',
    borderWidth: 1,
  },
  hd_txt: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.Dask,
    textAlign: 'center',
    // borderWidth: 1,
  },
  hd_txt_TH: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'gray',
    textAlign: 'center',
    // borderWidth: 1,
    marginTop: 8,
  },
  content: {
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: 'blue',
    flexDirection: 'column',
  },
  flname_phon_Label: {
    fontWeight: 'bold',
    marginBottom: 1,
    fontSize: 15,
    flex: 1,
  },
  flname_phone_Input: {
    borderWidth: 1,
    borderRadius: 12,
    borderColor: Colors.Gray,
    flex: 1,
    paddingVertical: 5,
  },
  roomID_Label: {
    fontWeight: 'bold',
    marginBottom: 1,
    fontSize: 15,
    // flex: 1,
  },
  roomID_Table: {
    borderWidth: 1,
    borderColor: 'red',
    marginHorizontal: 15,
    marginVertical: 5,
  },
  btn: {
    backgroundColor: Colors.Blue,
    justifyContent: 'center',
    height: 40,
    borderRadius: 30,
  },
});
