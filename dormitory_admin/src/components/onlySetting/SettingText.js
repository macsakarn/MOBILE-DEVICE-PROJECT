import React, {Component} from 'react';
import {Text, StyleSheet, View, Image, TouchableOpacity} from 'react-native';

import Colors from '../../assets/color';
export default class SettingText extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {price, _onPress, title} = this.props;
    return (
      <TouchableOpacity style={styles.box} onPress={_onPress}>
        <View>
          <Text style={styles.font}>{title}</Text>
          <Text style={styles.fontEdit}>{price} Bath</Text>
        </View>
        <Image source={require('../../assets/arrow.png')} />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  box: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 0.2,
    paddingVertical: 10,
    alignItems:'center'
  },
  font: {
    lineHeight: 22,
    fontSize: 14,
    color: Colors.Dask,
  },
  fontEdit: {
    lineHeight: 22,
    fontSize: 14,
    color: Colors.Blue,
  },
});
