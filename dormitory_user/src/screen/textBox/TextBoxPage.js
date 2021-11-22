import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  TouchableOpacity,
  StatusBar,
} from 'react-native';

// import ShowAnnounces from './showAnnounce';

import Colors from '../../assets/color';

import axios from 'axios';
const baseURL = 'https://annoucement.herokuapp.com/api/announces';

export default function TextBoxPage({navigation}) {
  const [announcesDB, setAnnouncesDB] = useState([]);

  const getDB = async () => {
    await axios.get(baseURL).then(response => {
      const db = response.data.All_Annouces;
      setAnnouncesDB(db);
    });
  };

  useEffect(() => {
    getDB();
  }, [announcesDB]);

  const msgBox = ({item}) => {
    return (
      <View style={styles.msg}>
        {/* กล่องข้อความ titel & msg */}
        <View
          style={{
            flex: 4,
            marginTop: 9,
            marginBottom: 9,
          }}>
          <Text style={{paddingTop: 5, fontSize: 14, color: 'black'}}>
            {item.title}
          </Text>
          <Text style={{paddingTop: 5, fontSize: 13}}>{item.message}</Text>
        </View>
        {/* กล่องเวลา date */}
        <View style={{flex: 1}}>
          <Text style={{paddingTop: 5, fontSize: 11, textAlign: 'center'}}>
            {item.date}
          </Text>
        </View>
      </View>
    );
  };
 
  return (
    <View style={styles.containers}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={{flex: 0.5}}></View>
          <Text style={styles.label}>Announcements</Text>
          <View style={{flex: 0.5}}></View>
        </View>
        <View style={styles.compAllbox}>
          <FlatList
            numColumns={1}
            data={announcesDB.reverse()}
            keyExtractor={announcesDB._id}
            renderItem={msgBox}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={() => <View style={{height: 200}}></View>}
          />
        </View>
      </View>
    </View>
  );
}
let {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  containers: {
    flex: 1,
  },
  container: {
    flexDirection: 'column',
    backgroundColor: 'white',
    flex: 1,
    // height
  },
  header: {
    paddingBottom: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: StatusBar.currentHeight || 0,
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.Dask,
    textAlign: 'center',
    flex: 1,
  },
  btnCreateMSG: {
    flex: 0.5,
    width: 45,
    height: 35,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  compAllbox: {
    flexDirection: 'column',
    // borderWidth:1,
    marginVertical: 10,
    marginHorizontal: 20,

    flex: 8,
  },
  msg: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: 'gray',
  },
});
