import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Colors from '../../assets/color';

import axios from 'axios';
const baseUrl = 'https://accounts-go-api.herokuapp.com';

export default class RateEdit extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    name: '',
    address: '',
    tel: '',
    waterBill: 0,
    electricityBill: 0,
    servicePerDate: 0,
  };
  componentDidMount() {
    const {data} = this.props;
    this.setState({
      name: data.name,
      address: data.address,
      tel: data.tel,
      waterBill: data.waterBill,
      electricityBill: data.electricityBill,
      servicePerDate: data.servicePerDate,
    });
  }

  Edit(type) {
    if (type === 'ele') {
      return (
        <View style={{marginVertical: 10}}>
          <Text style={{fontSize: 14, color: Colors.Dask}}>
            Electricity Tariff / Unit
          </Text>
          <TextInput
            keyboardType="numeric"
            defaultValue={this.state.electricityBill + ''}
            style={styles.input}
            onChangeText={electricityBill => this.setState({electricityBill})}
          />
        </View>
      );
    } else if (type === 'wat') {
      return (
        <View style={{marginVertical: 10}}>
          <Text style={{fontSize: 14, color: Colors.Dask}}>
            Water Tariff / Unit
          </Text>
          <TextInput
            keyboardType="numeric"
            defaultValue={this.state.waterBill + ''}
            style={styles.input}
            onChangeText={waterBill => this.setState({waterBill})}
          />
        </View>
      );
    } else if (type === 'dail') {
      return (
        <View style={{marginVertical: 10}}>
          <Text style={{fontSize: 14, color: Colors.Dask}}>
            Daily Service Rate
          </Text>
          <TextInput
            keyboardType="numeric"
            defaultValue={this.state.servicePerDate + ''}
            style={styles.input}
            onChangeText={servicePerDate => this.setState({servicePerDate})}
          />
        </View>
      );
    }
  }

  _PutAPI() {
    const {navigation} = this.props;
    const {name, address, tel, waterBill, electricityBill, servicePerDate} =
      this.state;
      console.log(this.state);
    const data = {
      name,
      address,
      tel,
      waterBill: parseInt(waterBill),
      electricityBill: parseInt(electricityBill),
      servicePerDate: parseInt(servicePerDate),
    };
    axios
      .put(`${baseUrl}/owner/info`, data)
      .then(function (response) {
        // handle success
        if (response.data) {
          navigation.goBack();
        }
      })
      .catch(function (error) {
        if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          }
      });
  }

  render() {
    return (
      <>
        {this.Edit(this.props.type)}
        <TouchableOpacity onPress={() => this._PutAPI()} style={styles.btn}>
          <Text
            style={{
              color: Colors.White,
              textAlign: 'center',
              fontSize: 15,
              fontWeight: '700',
            }}>
            Confirm my info
          </Text>
        </TouchableOpacity>
      </>
    );
  }
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: Colors.Blue,
    alignSelf: 'stretch',
    justifyContent: 'center',
    height: 40,
    borderRadius: 30,
    marginTop: 10,
  },
  input: {
    height: 40,
    borderBottomWidth: 0.5,
  },
});
