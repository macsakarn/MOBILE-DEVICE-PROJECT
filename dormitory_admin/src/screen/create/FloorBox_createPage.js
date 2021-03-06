import React, {Component} from 'react';
import {Text, StyleSheet, View, Image, TouchableOpacity} from 'react-native';

import Colors from '../../assets/color';

export default class FloorBox extends Component {
  render() {
    const {floor = 0, _onPress, selected} = this.props;
    let arr = ['st','nd','rd','th','th']

    if (floor == 0) {
      return null
      // <View style={[styles.box, {backgroundColor: '#bababa'}]}></View>;
    } else {
      return (
        <TouchableOpacity
          style={[
            styles.box,
            {borderColor: selected == floor ? Colors.Dask : Colors.Gray, backgroundColor: selected == floor ? Colors.Blue : 'white'},
          ]}
          onPress={() => _onPress(floor)}>
          {/* <Image
            source={require('../../assets/home.png')}
            style={{tintColor: selected == floor ? Colors.Blue : Colors.Gray, paddingTop:3}}
          /> */}
          <Text
            style={[
              styles.font,
              {color: selected == floor ? Colors.Dask : Colors.Gray},
            ]}>
            {floor}{arr[floor-1]}
          </Text>
        </TouchableOpacity>
      );
    }
  }
}

const styles = StyleSheet.create({
  box: {
    alignItems: 'center',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: Colors.BG,
    // padding:10,
    width: 30,
    height: 30,
    justifyContent: 'center',
  
  },
  font: {
    marginVertical: 3,
  },
});
