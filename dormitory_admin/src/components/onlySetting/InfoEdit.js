import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';

import Colors from '../../assets/color';

import axios from 'axios';
const baseUrl = 'https://accounts-go-api.herokuapp.com';

export default class InfoEdit extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    name: '',
    number: '',
    TB: '',
    AP: '',
    JV: '',
    tel: '',
    waterBill: 0,
    electricityBill: 0,
    servicePerDate: 0,
  };

  componentDidMount() {
    const {data} = this.props;
    let a = data.address.split('ตำบล')[1];
    let b = data.address.split('อำเภอ')[1];
    let c = data.address.split('จังหวัด')[1];
    const address1 = a.split(' ')[1];
    const address2 = b.split(' ')[1];
    const address3 = c.split(' ')[1];
    const number = data.address.split(' ')[1];
    this.setState({
      name: data.name,
      number: number,
      TB: address1,
      AP: address2,
      JV: address3,
      tel: data.tel,
      waterBill: data.waterBill,
      electricityBill: data.electricityBill,
      servicePerDate: data.servicePerDate,
    });
  }

  render() {
    return (
      <>
        <View style={{marginVertical: 10}}>
          <Text style={{fontSize: 14, color: Colors.Dask}}>Name</Text>
          <TextInput
            defaultValue={this.state.name}
            style={styles.input}
            onChangeText={name => this.setState({name})}
          />
        </View>
        <View style={{marginVertical: 10}}>
          <Text style={{fontSize: 14, color: Colors.Dask}}>Phone Number</Text>
          <TextInput
            defaultValue={this.state.tel}
            style={styles.input}
            onChangeText={tel => this.setState({tel})}
          />
        </View>
        <View style={{marginVertical: 10}}>
          <Text style={{fontSize: 14, color: Colors.Dask}}>Address</Text>
          <TextInput
            defaultValue={this.state.number}
            style={styles.input}
            onChangeText={text => this.setState({number: text})}
          />
        </View>
        <View style={{marginVertical: 10}}>
          <Text style={{fontSize: 14, color: Colors.Dask}}>Subdistrict</Text>
          <TextInput
            defaultValue={this.state.TB}
            style={styles.input}
            onChangeText={text => this.setState({TB: text})}
          />
        </View>
        <View style={{marginVertical: 10}}>
          <Text style={{fontSize: 14, color: Colors.Dask}}>District</Text>
          <TextInput
            defaultValue={this.state.AP}
            style={styles.input}
            onChangeText={text => this.setState({AP: text})}
          />
        </View>
        <View style={{marginVertical: 10}}>
          <Text style={{fontSize: 14, color: Colors.Dask}}>Province</Text>
          <TextInput
            defaultValue={this.state.JV}
            style={styles.input}
            onChangeText={text => this.setState({JV: text})}
          />
        </View>
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

  _PutAPI() {
    const {navigation} = this.props;
    const {
      name,
      number,
      TB,
      AP,
      JV,
      tel,
      waterBill,
      electricityBill,
      servicePerDate,
    } = this.state;
    const data = {
      name,
      address: `เลขที่ ${number} ตำบล ${TB} อำเภอ ${AP} จังหวัด ${JV}`,
      tel,
      waterBill,
      electricityBill,
      servicePerDate,
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
        // handle error
        console.log(error);
      });
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
