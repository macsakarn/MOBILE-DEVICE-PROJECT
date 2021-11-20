import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
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
        <View style={{flex: 0.5}}></View>
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
          ListFooterComponent={()=><View style={{height:200}}></View>}
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
