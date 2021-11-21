import React, {Component} from 'react';
import {Text, StyleSheet, Image, TouchableOpacity, View} from 'react-native';

export default class Tab extends Component {
  constructor(props) {
    super(props);
  }

  Under() {
    const {color} = this.props;
    if (color === '#0066FF') {
      return (
        <View
          style={{
            width: 35,
            height: 5,
            backgroundColor: color,
            borderRadius: 30,
            marginTop: 4,
          }}></View>
      );
    } else {
      return (
        <View style={{width: 35,
          height: 5,}}></View>
      );
    }
  }

  render() {
    const {color, onPress, icon} = this.props;
    return (
      <TouchableOpacity style={styles.container} onPress={onPress}>
        <Image source={icon} style={{tintColor: color}} />
        {this.Under()}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
