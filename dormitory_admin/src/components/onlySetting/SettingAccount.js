import React, {Component} from 'react';
import {Text, StyleSheet, View,TouchableOpacity,Image} from 'react-native';

import Colors from '../../assets/color';

export default class SettingAccount extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {number , _onPress, name} = this.props;
    return (
      <TouchableOpacity style={styles.box} onPress={_onPress}>
        <View style={{flexDirection:'row'}}>
          <Text style={styles.font}>Account</Text>
          <Text style={styles.fontEdit}>{name}</Text>
          <Text style={styles.font}>Number</Text>
          <Text style={styles.fontEdit}>{number}</Text>
        </View>

          <Image source={require('../../assets/arrow.png')} />

      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  box: {
    justifyContent: 'space-between',
    borderBottomWidth: 0.2,
    paddingVertical: 10,
    flexDirection:'row',
    alignItems:"center"
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
