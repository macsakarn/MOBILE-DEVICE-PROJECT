import React, {Component} from 'react';
import {Text, StyleSheet, View, Image, TouchableOpacity} from 'react-native';

import Colors from '../../assets/color';
export default class Room extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {
      title,
      name = 'wowza',
      tel = '00-00',
      electric = 100,
      water = 100,
      
    } = this.props;
    return (
      <TouchableOpacity style={styles.container}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={{fontWeight: 'bold', fontSize: 18, color: Colors.Dask}}>
            {title}
          </Text>
          <View style={[styles.status, {backgroundColor: Colors.Dask}]}></View>
        </View>
        <Text style={{fontSize: 12}}>{name}</Text>
        <Text style={{fontSize: 12}}>{tel}</Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginVertical: 4,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={require('../../assets/Bolt.png')}
              style={{tintColor: Colors.Yellow}}
            />
            <Text>{electric}</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={require('../../assets/water.png')}
              style={{tintColor: Colors.Blue}}
            />
            <Text>{water}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '48%',
    borderWidth: 1,
    borderRadius: 10,
    height: 110,
    padding: 10,
    marginBottom: 10,
    borderColor: Colors.Gray,
  },
  status: {
    width: 25,
    height: 25,
    borderColor: Colors.Dask,
    borderWidth: 1,
    borderRadius: 99,
  },
});
