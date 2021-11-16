import React, {Component} from 'react';
import {Text, StyleSheet, View, Image, TouchableOpacity} from 'react-native';

import Colors from '../assets/color';
export default class SettingText extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {price, onPress, title} = this.props;
    return (
      <View style={styles.box}>
        <View>
          <Text style={styles.font}>{title}</Text>
          <Text style={styles.fontEdit}>{price} Bath</Text>
        </View>
        <TouchableOpacity>
          <Image source={require('../assets/edit.png')} />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  box: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 0.2,
    paddingVertical: 10,
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
