import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Dimensions,
  StatusBar,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Colors from '../../assets/color';
import Detail from '../../components/Detail';

import axios from 'axios';
const baseUrl = 'https://horchana-room-services.herokuapp.com/api';

export default class HomePage2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      password: '',
      tel: '',
      roomId: '',
      electric_meterId: '',
      water_meterId: '',
      room_price: 0,
    };
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  async componentDidMount() {
    const {navigation} = this.props
    const {route} = this.props;
    const {room} = route.params;
    this._unsubscribe = navigation.addListener('focus', async () => {
      try {
        const resp = await axios.get(`${baseUrl}/room/get/${room}`);
        let data = resp.data[0];
        console.log("API");
        console.log(data);
        console.log("-----------------------------------------");
        this.setState({
          name: data.name,
          password: data.password,
          tel: data.tel,
          roomId: data.roomId,
          electric_meterId: data.electric_meter,
          water_meterId: data.water_meter,
          room_price: data.room_price,
        });
      } catch (err) {
        // Handle Error Here
        console.error(err);
      }
    });
  }

  render() {
    console.log(this.state);
    const {navigation} = this.props;
    const {name, password, tel, roomId, room_price} = this.state
    if (!roomId) {
      return<View></View>
    }
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
            <TouchableOpacity
              style={{flex: 0.5}}
              onPress={() => this.removeRoom()}>
              <Text style={{textAlign: 'right', color: '#fe0000'}}>DELETE</Text>
            </TouchableOpacity>
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
              {roomId}
            </Text>
            <Text
              style={{fontSize: 16, paddingVertical: 5, color: Colors.Gray}}>
              {room_price} Bath
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
    const {navigation} = this.props;
    const {name, water_meterId, electric_meterId, roomId} = this.state
    if (!electric_meterId && !water_meterId) {
      return (
        <>
          <TouchableOpacity
            style={styles.btn}
            activeOpacity={0.9}
            onPress={() => navigation.navigate('AddMeter', {type:"Water",roomId})}>
            <Image
              source={require('../../assets/add_a_photo.png')}
              style={{tintColor: Colors.Blue}}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.btn, {right: 100}]}
            activeOpacity={0.9}
            onPress={() => navigation.navigate('AddMeter', {type:"Electric",roomId})}>
            <Image
              source={require('../../assets/add_a_photo.png')}
              style={{tintColor: Colors.Yellow}}
            />
          </TouchableOpacity>
        </>
      );
    } else if (!electric_meterId) {
      return (
        <TouchableOpacity
          style={styles.btn}
          activeOpacity={0.9}
          onPress={() => navigation.navigate('AddMeter', {type:"Electric",roomId})}>
          <Image
            source={require('../../assets/add_a_photo.png')}
            style={{tintColor: Colors.Yellow}}
          />
        </TouchableOpacity>
      );
    } else if (!water_meterId) {
      return (
        <TouchableOpacity
          style={styles.btn}
          activeOpacity={0.9}
          onPress={() => navigation.navigate('AddMeter', {type:"Water",roomId})}>
          <Image
            source={require('../../assets/add_a_photo.png')}
            style={{tintColor: Colors.Blue}}
          />
        </TouchableOpacity>
      );
    } else if (!name) {
      return (
        <TouchableOpacity
          style={styles.btn}
          activeOpacity={0.9}
          onPress={() => navigation.navigate('CreateHuman', {room:roomId})}>
          <Image source={require('../../assets/person_add_alt_1.png')} />
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          style={styles.btn}
          activeOpacity={0.9}
          onPress={() => this.removeHuman()}>
          <Image
            source={require('../../assets/person_remove.png')}
            style={{tintColor: '#fe0000'}}
          />
        </TouchableOpacity>
      );
    }
  }

  removeHuman() {
    Alert.alert('Remove Resident', 'Do you want to remove Resident?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {text: 'OK', onPress: () => this._headderRemove()},
    ]);
  }

  removeRoom() {
    Alert.alert('Remove Room', 'Do you want to remove Room?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {text: 'OK', onPress: () => this._headderRemoveRoom()},
    ]);
  }

  async _headderRemove() {
    const {navigation} = this.props;
    const {roomId} = this.state

    try {
      const resp = await axios.delete(`${baseUrl}/room/removeperson/${roomId}`);
      if (resp.data.msg) {
        navigation.popToTop();
      }
    } catch (err) {
      console.error(err);
    }
  }

  async _headderRemoveRoom() {
    const {navigation, route} = this.props;
    const {roomId} = this.state

    try {
      const resp = await axios.delete(`${baseUrl}/room/removeroom/${roomId}`);
      if (resp.data.msg) {
        navigation.popToTop();
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
