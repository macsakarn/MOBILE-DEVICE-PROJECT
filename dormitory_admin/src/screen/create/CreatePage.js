import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Alert,StatusBar
} from 'react-native';

import Colors from '../../assets/color';
import FloorBox from './FloorBox_createPage';

import axios from 'axios';
const baseUrl_room_data =
  'https://horchana-room-services.herokuapp.com/api/room/get/allroomsdata';
const baseURL_add_resident =
  'https://horchana-room-services.herokuapp.com/api/room/addperson/';

export default function CreatePage({navigation}) {
  const [fName, setFName] = useState('');
  const [password, setpassword] = useState('');
  const [phone, setPhone] = useState('');
  const [rooomDB, setRoomDb] = useState(null);
  const [selectFloor, setSelectFloor] = useState(1);
  const [floor1, setFloor1] = useState([]);
  const [floor2, setFloor2] = useState([]);
  const [floor3, setFloor3] = useState([]);
  const [floor4, setFloor4] = useState([]);
  const [floor5, setFloor5] = useState([]);
  const [selectRoom, setSelectRoom] = useState('');

  const getDB = async () => {
    var floor1 = [],
      floor2 = [],
      floor3 = [],
      floor4 = [],
      floor5 = [],
      Data = [];

    try {
      await axios.get(baseUrl_room_data).then(response => {
        Data = response.data.roomsData;
      });
    } catch (err) {
      // Handle Error Here
      // console.error(err);
    }

    Data.map(item => {
      if (item.roomId[1] == '0' && item.resident_info.name == null)
        floor1.push(item);
      else if (item.roomId[1] == '1' && item.resident_info.name == null)
        floor2.push(item);
      else if (item.roomId[1] == '2' && item.resident_info.name == null)
        floor3.push(item);
      else if (item.roomId[1] == '3' && item.resident_info.name == null)
        floor4.push(item);
      else if (item.roomId[1] == '4' && item.resident_info.name == null)
        floor5.push(item);
    });
    setFloor1(floor1);
    setFloor2(floor2);
    setFloor3(floor3);
    setFloor4(floor4);
    setFloor5(floor5);
    // setRoomDb(Data);
  };

  useEffect(() => {
    getDB();
  }, [selectRoom]);


  const postMSG = () => {
    const data = {
      resident_info: {
        name:fName,
        password:password,
        tel:phone
      }
    };
    axios.post(baseURL_add_resident+selectRoom, data)
      .catch(error => {
        console.log(error);
      });
    setFName('');
    setpassword('');
    setPhone('')
    setSelectRoom('')
  };

  const _headderSelect = floor => {
    setSelectFloor(floor);
  };

  let compoSelectFloor = (
    <View style={styles.compoSelectFloor_style}>
      <FloorBox
        floor={floor1.length != 0 ? 1 : 0}
        _onPress={_headderSelect}
        selected={selectFloor}
      />
      <FloorBox
        floor={floor2.length != 0 ? 2 : 0}
        _onPress={_headderSelect}
        selected={selectFloor}
      />
      <FloorBox
        floor={floor3.length != 0 ? 3 : 0}
        _onPress={_headderSelect}
        selected={selectFloor}
      />
      <FloorBox
        floor={floor4.length != 0 ? 4 : 0}
        _onPress={_headderSelect}
        selected={selectFloor}
      />
      <FloorBox
        floor={floor5.length != 0 ? 5 : 0}
        _onPress={_headderSelect}
        selected={selectFloor}
      />
    </View>
  );

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={[
          styles.roomBtn,
          {
            backgroundColor: selectRoom == item.roomId ? Colors.Blue : 'white',
            borderColor: selectRoom == item.roomId ? Colors.Dask : Colors.Gray,
          },
        ]}
        onPress={() => setSelectRoom(item.roomId)}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={{fontWeight: 'bold', fontSize: 18, color: Colors.Dask}}>
            {item.roomId}
          </Text>
          <View
            style={[
              styles.roomBtn_status,
              {backgroundColor: selectRoom == item.roomId ? 'black' : 'white'},
            ]}></View>
        </View>
      </TouchableOpacity>
    );
  };

  let data;
  if (selectFloor == 1) data = floor1;
  else if (selectFloor == 2) data = floor2;
  else if (selectFloor == 3) data = floor3;
  else if (selectFloor == 4) data = floor4;
  if (selectRoom) console.log(selectRoom);
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
            <Text style={[{marginRight: 4}, styles.fpassword_phon_Label]}>
              Name
            </Text>
            <Text style={[{marginLeft: 4}, styles.fpassword_phon_Label]}>
              Password
            </Text>
          </View>
          {/* fl Inputbox */}
          <View style={{flexDirection: 'row'}}>
            <TextInput
              maxLength={30}
              onChangeText={text => setFName(text)}
              value={fName}
              style={[{marginRight: 4}, styles.fpassword_phone_Input]}
            />
            <TextInput
              maxLength={30}
              onChangeText={text => setpassword(text)}
              value={password}
              style={[{marginLeft: 4}, styles.fpassword_phone_Input]}
            />
          </View>
          {/* phone Label */}
          <View style={{flexDirection: 'row'}}>
            <Text style={[{marginTop: 10}, styles.fpassword_phon_Label]}>
              Phone number
            </Text>
          </View>
          {/* phone Inputbox */}
          <View style={{flexDirection: 'row'}}>
            <TextInput
              maxLength={10}
              onChangeText={text => setPhone(text)}
              value={phone}
              style={styles.fpassword_phone_Input}
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
              data={data}
              renderItem={data => renderItem(data)}
              numColumns={3}
              // ListHeaderComponent={this.headder()}
              // ListFooterComponent={() => <View style={{height: 100}}></View>}
            />
          </View>
        </View>
        {/* Button 'Create' */}
        <View
          style={{marginTop: 20, alignItems: 'center', marginHorizontal: 8}}>
          <TouchableOpacity
            onPress={() => {
              postMSG();
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
    borderColor: 'red',
  },
  header: {
    paddingVertical: 30,
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 10,
    paddingBottom: 5,
    paddingTop: StatusBar.currentHeight || 0,
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
  fpassword_phon_Label: {
    fontWeight: 'bold',
    marginBottom: 1,
    fontSize: 15,
    flex: 1,
  },
  fpassword_phone_Input: {
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
    // borderWidth: 1,
    // borderColor: 'red',
    marginHorizontal: 8,
    marginVertical: 5,
    justifyContent: 'space-between',
    flexDirection: 'column',
    // marginBottom: 20,
    // paddingHorizontal: 10,
  },
  compoSelectFloor_style: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingHorizontal: 10,
  },

  roomBtn: {
    width: '31%',
    borderWidth: 1,
    borderRadius: 10,
    height: 50,
    padding: 10,
    marginHorizontal: 3.5,
    marginBottom: 10,
  },
  roomBtn_status: {
    width: 25,
    height: 25,
    // borderColor: Colors.Dask,
    borderWidth: 1,
    borderRadius: 99,
  },

  btn: {
    backgroundColor: Colors.Blue,
    justifyContent: 'center',
    height: 40,
    width: '100%',
    borderRadius: 30,
  },
});
