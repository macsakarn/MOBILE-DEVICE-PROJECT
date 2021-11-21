import React, {Component} from 'react';
import {Text, StyleSheet, View, Image} from 'react-native';
import Colors from '../assets/color'
export default class Detail extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {image = null, title, value} = this.props;
    if (!image) {
      return (
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            paddingVertical: 10,
          }}>
          <Text style={{fontSize: 16, color: Colors.Gray}}>{title}</Text>
          <Text style={{fontSize: 16, color: Colors.Blue}}>{value}</Text>
        </View>
      );
    } else {
      return (
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            paddingVertical: 10,
          }}>
          <View style={{flexDirection:'row',alignItems:'center'}}>
            <Image source={image} />
            <Text style={{fontSize: 16, color: Colors.Gray}}>{title}</Text>
          </View>
          <Text style={{fontSize: 16, color: Colors.Blue}}>{value}</Text>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({});
