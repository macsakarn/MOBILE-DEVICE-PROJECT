import React, {Component} from 'react';
import {Text, StyleSheet, View,TouchableOpacity,Image} from 'react-native';

import Colors from '../assets/color';

export default class SettingAccount extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {number , onPress, name} = this.props;
    return (
      <View style={styles.box}>
        <View style={{flexDirection:'row'}}>
          <Text style={styles.font}>Account</Text>
          <Text style={styles.fontEdit}>{name}</Text>
          <Text style={styles.font}>Number</Text>
          <Text style={styles.fontEdit}>{number}</Text>
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
    justifyContent: 'space-between',
    borderBottomWidth: 0.2,
    paddingVertical: 10,
    flexDirection:'row'
  },
  font: {
    lineHeight: 22,
    fontSize: 14,
    color: Colors.Dask
  },
  fontEdit: {
    lineHeight: 22,
    fontSize: 14,
    color: Colors.Blue,
    paddingHorizontal:12
  },
});
