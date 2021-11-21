import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Dimensions,
  StatusBar,
  Image,
  TouchableOpacity,
  Alert
} from 'react-native';
import Colors from '../../assets/color';
import Detail from '../../components/Detail';

import axios from 'axios';
const baseUrl = 'https://horchana-room-services.herokuapp.com/api';
export default class HomePage2 extends Component {
  render() {
    const {navigation, route} = this.props;
    const {room,roomPrice,name,tel,password} = route.params;
    return (
      <View style={styles.container}>
        <View style={styles.section}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{flex: 0.5}}>
              <Image source={require('../../assets/chevron.png')} />
            </TouchableOpacity>
            <Text style={styles.headder}>ROOM DETAILS</Text>
            <View style={{flex: 0.5}}></View>
          </View>
          <View style={{alignItems: 'center'}}>
            <Text
              style={{
                fontSize: 16,
                paddingBottom: 5,
                paddingTop: 20,
                color: Colors.Dask,
              }}>
              ROOM
            </Text>
            <Text
              style={{
                fontSize: 18,
                paddingVertical: 5,
                color: Colors.Blue,
                fontWeight: 'bold',
              }}>
              {room}
            </Text>
            <Text
              style={{fontSize: 16, paddingVertical: 5, color: Colors.Gray}}>
              {roomPrice} Bath
            </Text>
          </View>
        </View>
        <View style={styles.section}>
          <Detail title={'Residents'} value={name} />
          <Detail title={'Contact'} value={tel} />
          <Detail title={'password'} value={password} />
          <Detail
            title={'Usege today'}
            value={'1000'}
            image={require('../../assets/Bolt2.png')}
          />
          <Detail
            title={'Usege this month'}
            value={'1000'}
            image={require('../../assets/Bolt2.png')}
          />
          <Detail
            title={'Usege today'}
            value={'1000'}
            image={require('../../assets/water2.png')}
          />
          <Detail
            title={'Usege this month'}
            value={'1000'}
            image={require('../../assets/water2.png')}
          />
        </View>
        {this.CreateHuman()}
      </View>
    );
  }

  CreateHuman() {
    const {navigation, route} = this.props;
    const {name = null,room} = route.params;
    if (!name) {
      return (
        <TouchableOpacity
          style={styles.btn}
          activeOpacity={0.9}
          onPress={() => navigation.navigate('CreateHuman', {room})}>
          <Image source={require('../../assets/person_add_alt_1.png')} />
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          style={styles.btn}
          activeOpacity={0.9}
          onPress={() => this.removeHuman()}>
          <Image source={require('../../assets/person_remove.png')} />
        </TouchableOpacity>
      )
    }
  }

  removeHuman(){
    Alert.alert(
      "Remove Resident",
      "Do you want to remove Resident?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { text: "OK", onPress: () =>  this._headderremove()}
      ]
    );
  }

  async _headderremove(){
    const {navigation, route} = this.props;
    const {room} = route.params;
    console.log(room);
    try {
      const resp = await axios.delete(`${baseUrl}/room/removeperson/${room}`);
      if(resp.data.msg){
        navigation.popToTop()
      }
    } catch (err) {
      console.error(err);
    }
  }
}
const {width} = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.BG,
    flex: 1,
  },
  section: {
    backgroundColor: Colors.White,
    width,
    paddingHorizontal: 20,
    paddingBottom: 30,
    marginBottom: 10,
    paddingTop: StatusBar.currentHeight || 0,
  },
  headder: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.Dask,
    textAlign: 'center',
    flex: 1,
  },
  btn: {
    height: 75,
    width: 75,
    backgroundColor: Colors.White,
    position: 'absolute',
    bottom: 80,
    right: 10,
    borderRadius: 99,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
