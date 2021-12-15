import React, {Component} from 'react';
import {Text, StyleSheet, View} from 'react-native';

import axios from 'axios';
const baseUrl = 'https://horchana-room-services.herokuapp.com/api/';
export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
    };
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  async componentDidMount() {
    const {navigation, route} = this.props;
    const {user} = route.params;
    this._unsubscribe = navigation.addListener('focus', async () => {
      try {
        const resp = await axios.get(`${baseUrl}room/get/${user}`);
        this.setState({data: resp.data[0]});
      } catch (err) {
        // Handle Error Here
        console.error(err);
      }
    });
  }

  render() {
    const {data} = this.state;
      const {route} = this.props;
      const {user} = route.params;
    if (!data) {
      return (
        <View>
        </View>
      );
    } else {
      console.log(data);
      return (
        <View>
          <Text>{user}</Text>
          <Text>ค่าใช้จ่าย</Text>
          <Text>{data.room_price}</Text>
          <Text>{data.water_price}</Text>
          <Text>{data.electric_price}</Text>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({});
