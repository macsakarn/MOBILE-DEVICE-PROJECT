import React, {Component} from 'react';
import {Text, StyleSheet, View, Image, TouchableOpacity} from 'react-native';

import Colors from '../../assets/color';

export default class FloorBox extends Component {
  render() {
    const {floor = 0, _onPress, selected} = this.props;
    if (floor == 0) {
      return <View style={[styles.box, {backgroundColor: '#bababa'}]}></View>;
    } else {
      return (
        <TouchableOpacity
          style={[
            styles.box,
            {borderColor: selected == floor ? Colors.Blue : Colors.Gray},
          ]}
          onPress={() => _onPress(floor)}>
          <Image
            source={require('../../assets/home.png')}
            style={{tintColor: selected == floor ? Colors.Blue : Colors.Gray}}
          />
          <Text
            style={[
              styles.font,
              {color: selected == floor ? Colors.Blue : Colors.Gray},
            ]}>
            {floor} st floor
          </Text>
        </TouchableOpacity>
      );
    }
  }
}

const styles = StyleSheet.create({
  box: {
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.BG,
    // padding:10
    width: 65,
    height: 80,
    justifyContent: 'center',
  },
  font: {
    marginVertical: 5,
  },
});
