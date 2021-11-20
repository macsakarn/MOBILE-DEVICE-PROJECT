import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';

import Colors from '../../assets/color';

export default showAnnounce = (props) => {
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
  let createBtn = (
    <TouchableOpacity style={styles.btnCreateMSG} onPress={() =>{
      props.navigation.navigate('TextCreate')
    }}>
      <Text style={{fontSize: 14, color: Colors.Blue, }}>create</Text>
    </TouchableOpacity>
  );
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{flex: 1}}></View>
        <View style={{flex: 1}}></View>
        <View style={{flex: 1}}></View>
        <Text style={styles.label}>Announcements</Text>
        {createBtn}
      </View>
      <View style={styles.compAllbox}>
        <FlatList
          numColumns={1}
          data={props.announcesDB.reverse()}
          keyExtractor={props.announcesDB._id}
          renderItem={msgBox}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

let {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: 'white',
    flex: 1,
    // height
  },
  header: {
    paddingVertical: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.Dask,
    textAlign: 'center',
    flex: 4,
    // borderWidth: 1,
  },
  btnCreateMSG: {
    flex: 2,
    width: 45,
    height: 35,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 10,
  },
  compAllbox: {
    flexDirection: 'column',
    // borderWidth:1,
    marginVertical:10,
    marginHorizontal: 20,
    
    flex: 8,
  },
  msg: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: 'gray',
  },
});
