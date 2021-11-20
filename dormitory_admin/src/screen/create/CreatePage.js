import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';

import Colors from '../../assets/color';
import Room from '../../components/onlyHome/Room';

import axios from 'axios';
const baseUrl = 'https://horchana-room-services.herokuapp.com/api';

export default function CreatePage() {
  const [fName, setFName] = useState('');
  const [lName, setLName] = useState('');
  const [phone, setPhone] = useState('');
  const [roomID_db, setRoomID] = useState(null);

  useEffect(() => {
    const getDB = async () => {
      try {
        await axios.get(`${baseUrl}/room/get/roomidlist`).then(resp => {
          const db = resp.data;
          setRoomID(db);
        });
      } catch (err) {
        console.error(err);
      }
    };
    getDB();
    console.log(roomID_db);
  }, []);
  renderItem = ({item}) => {
    return <Room title={item.roomId} />;
  };

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
          <View style={styles.roomID_Table}>
            <FlatList
              columnWrapperStyle={styles.colContainer}
              data={roomID_db}
              renderItem={data => renderItem(data)}
              numColumns={2}
              // ListHeaderComponent={this.headder()}
              // ListFooterComponent={() => <View style={{height: 100}}></View>}
            />
          </View>
        </View>
        {/* Button 'Create' */}
        <View style={{borderWidth: 1, marginTop: 20}}>
          <TouchableOpacity
            onPress={() => {
              // confirmationAlert();
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
const {width} = Dimensions.get('screen');
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
  colContainer: {
    backgroundColor: Colors.White,
    width,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
});
