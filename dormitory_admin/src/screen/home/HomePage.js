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
  StatusBar,
  SafeAreaView,
} from 'react-native';

import Colors from '../../assets/color';

import BoxHome from '../../components/onlyHome/BoxHome';
import FloorBox from '../../components/onlyHome/FloorBox';
import Room from '../../components/onlyHome/Room';

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
    data: [],
    electricity: 0,
    water: 0,
    search:""
  };

  componentWillUnmount() {
    this._unsubscribe();
  }

  async componentDidMount() {
    const {navigation} = this.props;
    this._unsubscribe = navigation.addListener('focus', async () => {
      var floor1 = [],
        floor2 = [],
        floor3 = [],
        floor4 = [],
        floor5 = [],
        DATA = [];
      try {
        const resp = await axios.get(`${baseUrl}/all`);
        DATA = resp.data;

      } catch (err) {
        // Handle Error Here
        console.error(err);
      }
      let water = 0,
        electricity = 0;
      DATA.map(item => {
        if (item.roomId[1] == '0') floor1.push(item);
        if (item.roomId[1] == '1') floor2.push(item);
        if (item.roomId[1] == '2') floor3.push(item);
        if (item.roomId[1] == '3') floor4.push(item);
        if (item.roomId[1] == '4') floor5.push(item);
        electricity += !item.electric_unit ? 0 : item.electric_unit;
        water += !item.water_unit ? 0 : item.water_unit;
      });

      this.setState({
        floor1,
        floor2,
        floor3,
        floor4,
        floor5,
        data: DATA,
        water,
        electricity
      });
    });
  }

  render() {
    const {navigation} = this.props;
    let data;
    if (this.state.selectFloor == 1) data = this.state.floor1;
    else if (this.state.selectFloor == 2) data = this.state.floor2;
    else if (this.state.selectFloor == 3) data = this.state.floor3;
    else if (this.state.selectFloor == 4) data = this.state.floor4;
    else if (this.state.selectFloor == 5) data = this.state.floor5;
    else{
      data = this.state.data
      var search = data.filter(val=>{
        return val.roomId.toLowerCase()
        .includes(this.state.search.toLowerCase())
      })
    } 
    
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          columnWrapperStyle={styles.colContainer}
          data={!search ? data: search}
          renderItem={data => this.renderItem(data)}
          numColumns={2}
          ListHeaderComponent={this.headder()}
          ListFooterComponent={() => <View style={{height: 100}}></View>}
        />
        <TouchableOpacity
          style={styles.btn}
          activeOpacity={0.9}
          onPress={() => navigation.navigate('CreateRoom')}>
          <Image source={require('../../assets/plus2.png')} />
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  onChangeSearch(search){
    // console.log(search);
    if (!search) {
      this.setState({selectFloor:1})
    }else{
      this.setState({search,selectFloor:99})
    }
  }

  headder() {
    // console.log(this.state.electricity);
    return (
      <View>
        <View style={styles.section}>
          <Text>Hey</Text>
          <Text style={styles.headder}>Mac Sakarn</Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginVertical: 20,
            }}>
            <BoxHome
              image={require('../../assets/Bolt.png')}
              value={this.state.electricity.toFixed(2)}
              color={Colors.Yellow}
              title="Electricity"
            />
            <BoxHome
              image={require('../../assets/water.png')}
              value={this.state.water.toFixed(2)}
              color={Colors.Blue}
              title="Water"
            />
            <BoxHome />
          </View>
        </View>
        <View style={[styles.section, {marginBottom: 0}]}>
          <View style={styles.searchBox}>
            <Image
              source={require('../../assets/search.png')}
              style={{margin: 10}}
            />
            <TextInput style={styles.input} placeHolder="Search your ...." onChangeText={text=>this.onChangeSearch(text)}/>
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
        </View>
      </View>
    );
  }

  renderItem = ({item}) => {
    return (
      <Room
        title={item.roomId}
        name={item.name}
        tel={item.tel}
        electric={!item.electric_unit ? 0 : item.electric_unit.toFixed(2)}
        water={!item.water_unit ? 0 : item.water_unit.toFixed(2)}
        onPress={() => this._headderNavigate(item)}
      />
    );
  };

  _headderNavigate(item) {
    const {navigation} = this.props;
    navigation.navigate('HomeDetail', {room: item.roomId});
  }

  _headderSelect = floor => {
    this.setState({selectFloor: floor});
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
    paddingTop: StatusBar.currentHeight || 0,
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
    height:40,
    color: '#424242',
  },
  colContainer: {
    backgroundColor: Colors.White,
    width,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
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
