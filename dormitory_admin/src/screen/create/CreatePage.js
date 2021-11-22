import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList
} from 'react-native';

import Colors from '../../assets/color';
import FloorBox from './FloorBox_createPage';
import Room from '../../components/onlyHome/Room';

import axios from 'axios';
const baseUrl =
  'https://horchana-room-services.herokuapp.com/api/room/get/allroomsdata';

export default function CreatePage({navigation}) {
  const [fName, setFName] = useState('');
  const [lName, setLName] = useState('');
  const [phone, setPhone] = useState('');
  const [rooomDB, setRoomDb] = useState(null);
  const [selectFloor, setSelectFloor] = useState(1);
  const [floor1, setFloor1] = useState([]);
  const [floor2, setFloor2] = useState([]);
  const [floor3, setFloor3] = useState([]);
  const [floor4, setFloor4] = useState([]);
  const [floor5, setFloor5] = useState([]);

  const getDB = async () => {
    var floor1 = [],
      floor2 = [],
      floor3 = [],
      floor4 = [],
      floor5 = [],
      Data = [];

    try {
      await axios.get(baseUrl).then(response => {
        Data = response.data.roomsData;
        // setRoomDb(db);
      });
    } catch (err) {
      // Handle Error Here
      // console.error(err);
    }
    Data.map(item => {
      if (item.roomId[1] == '0' && item.resident_info.name == null) floor1.push(item);
      if (item.roomId[1] == '1' && item.resident_info.name == null) floor2.push(item);
      if (item.roomId[1] == '2' && item.resident_info.name == null) floor3.push(item);
      if (item.roomId[1] == '3' && item.resident_info.name == null) floor4.push(item);
      if (item.roomId[1] == '4' && item.resident_info.name == null) floor5.push(item);
    });
    setFloor1(floor1);
    setFloor2(floor2);
    setFloor3(floor3);
    setFloor4(floor4);
    setFloor5(floor5);
    setRoomDb(Data);
  };

  useEffect(() => {
    getDB();
  }, [floor1,floor2,floor3,floor4,floor5,rooomDB]);

  // console.log(rooomDB);

  const _headderSelect = floor => {
    setSelectFloor(floor);
  };

  let compoSelectFloor = (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        borderWidth:1
      }}>
      <FloorBox
        floor={floor1.length != 0 ? 1 : 0}
        _onPress={() => _headderSelect()}
        selected={selectFloor}
      />
      <FloorBox
        floor={floor2.length != 0 ? 2 : 0}
        _onPress={() => _headderSelect()}
        selected={selectFloor}
      />
      <FloorBox
        floor={floor3.length != 0 ? 3 : 0}
        _onPress={() => _headderSelect()}
        selected={selectFloor}
      />
      <FloorBox
        floor={floor4.length != 0 ? 4 : 0}
        _onPress={() => _headderSelect()}
        selected={selectFloor}
      />
      <FloorBox
        floor={floor5.length != 0 ? 5 : 0}
        _onPress={() => _headderSelect()}
        selected={selectFloor}
      />
    </View>
  );

  const renderItem = ({item}) => {
    return (
      <Room
        title={item.roomId}
        // name={item.resident_info.name}
        // tel={item.resident_info.tel}
        onPress={() => _headderNavigate(item)}
      />
    );
  };
  const _headderNavigate = ({item}) => {
    const {navigation} = this.props;
    let data = {
      room:item.roomId,
      roomPrice:item.room_price,
      name:item.resident_info.name,
      tel:item.resident_info.tel,
      password:item.resident_info.password
    }
    navigation.navigate('HomeDetail',data);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.hd_txt}>Add new resident </Text>
        {/* <Text style={styles.hd_txt_TH}>เพิ่มผู้เช่าคนใหม่</Text> */}
      </View>
      <View style={styles.content}>
        {/* Input content */}
        <View style={{flexDirection: 'column'}}>
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
        <View style={{flexDirection: 'column', marginTop: 20}}>
          <Text style={styles.roomID_Label}>Room ID</Text>
          {/* Room ID Table */}
          
          <View style={styles.roomID_Table}>
          {compoSelectFloor}
            <FlatList
              // columnWrapperStyle={styles.colContainer}
              data={rooomDB}
              renderItem={(data) => renderItem(data)}
              numColumns={2}
              // ListHeaderComponent={this.headder()}
              ListFooterComponent={() => <View style={{height: 100}}></View>}
            />
          </View>
        </View>
        {/* Button 'Create' */}
        <View style={{marginTop: 20}}>
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
    borderColor: 'red',
  },
  header: {
    paddingVertical: 30,
    flexDirection: 'column',
    alignItems: 'center',
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
    marginHorizontal: 8,
    marginVertical: 5,
  },
  btn: {
    backgroundColor: Colors.Blue,
    justifyContent: 'center',
    height: 40,
    borderRadius: 30,
  },
});
