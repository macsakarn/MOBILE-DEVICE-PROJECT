import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Dimensions,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';

import Colors from '../../assets/color';

import BoxHome from '../../components/onlyHome/BoxHome';
import FloorBox from '../../components/onlyHome/FloorBox';
import Room from '../../components/onlyHome/Room';

DATA = [
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
    roomId: 'A205',
  },
  {
    roomId: 'A306',
  },
  {
    roomId: 'A407',
  },
  {
    roomId: 'A008',
  },
];

import axios from 'axios';
const baseUrl = 'https://horchana-room-services.herokuapp.com/api';
export default class HomePage extends Component {
  state = {
    floor1: [],
    floor2: [],
    floor3: [],
    floor4: [],
    floor5: [],
    selectFloor: 1,
  };
  async componentDidMount() {
    let floor1 = [],
      floor2 = [],
      floor3 = [],
      floor4 = [],
      floor5 = [];
    axios({
      method: 'get',
      url: `${baseUrl}/room/get/roomidlist`,
    }).then((response) => {
      console.log(response.data);
    });

    DATA.map(item => {
      if (item.roomId[1] == '0') floor1.push(item);
      if (item.roomId[1] == '1') floor2.push(item);
      if (item.roomId[1] == '2') floor3.push(item);
      if (item.roomId[1] == '3') floor4.push(item);
      if (item.roomId[1] == '4') floor5.push(item);
    });
    this.setState({
      floor1,
      floor2,
      floor3,
      floor4,
      floor5,
    });
  }

  _headderSelect = floor => {
    this.setState({selectFloor: floor});
  };

  renderRoom() {
    let data;
    if (this.state.selectFloor == 1) data = this.state.floor1;
    else if (this.state.selectFloor == 2) data = this.state.floor2;
    else if (this.state.selectFloor == 3) data = this.state.floor3;
    else if (this.state.selectFloor == 4) data = this.state.floor4;
    else data = this.state.floor5;
    return (
      <FlatList
        columnWrapperStyle={{justifyContent: 'space-between'}}
        data={data}
        renderItem={data => this.renderItem(data)}
        numColumns={2}
      />
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.section}>
          <Text>Hello</Text>
          <Text style={styles.headder}>Mac Sakarn</Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginVertical: 20,
            }}>
            <BoxHome
              image={require('../../assets/Bolt.png')}
              value="1200 Kwh"
              color={Colors.Yellow}
              title="Electricity"
            />
            <BoxHome
              image={require('../../assets/water.png')}
              value="1200 Kwh"
              color={Colors.Blue}
              title="Electricity"
            />
            <BoxHome />
          </View>
        </View>
        <View style={styles.section}>
          <View style={styles.searchBox}>
            <Image
              source={require('../../assets/search.png')}
              style={{margin: 10}}
            />
            <TextInput style={styles.input} placeholder="Search your ...." />
            <TouchableOpacity style={{margin: 10}}>
              <Image source={require('../../assets/slider_02.png')} />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginVertical: 20,
            }}>
            <FloorBox
              floor={this.state.floor1.length != 0 ? 1 : 0}
              _onPress={this._headderSelect}
              selected={this.state.selectFloor}
            />
            <FloorBox
              floor={this.state.floor2.length != 0 ? 2 : 0}
              _onPress={this._headderSelect}
              selected={this.state.selectFloor}
            />
            <FloorBox
              floor={this.state.floor3.length != 0 ? 3 : 0}
              _onPress={this._headderSelect}
              selected={this.state.selectFloor}
            />
            <FloorBox
              floor={this.state.floor4.length != 0 ? 4 : 0}
              _onPress={this._headderSelect}
              selected={this.state.selectFloor}
            />
            <FloorBox
              floor={this.state.floor5.length != 0 ? 5 : 0}
              _onPress={this._headderSelect}
              selected={this.state.selectFloor}
            />
          </View>
          <View>{this.renderRoom()}</View>
        </View>
      </View>
    );
  }
  renderItem = ({item}) => {
    return <Room title={item.roomId} />;
  };
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
    marginBottom: 10,
    paddingBottom: 5,
    paddingTop: 20,
  },
  headder: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.Dask,
  },
  searchBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 0.5,
    borderRadius: 15,
  },
  input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    backgroundColor: '#fff',
    color: '#424242',
  },
});
