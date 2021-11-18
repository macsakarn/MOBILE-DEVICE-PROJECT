import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView
} from 'react-native';
import Colors from '../../assets/color';

export default class SetEdit extends Component {
  typeEdit(type, data) {
    if (type.name === 'info') {
      return this.InfoCompo(data);
    } else if (type.name === 'rate') {
      return this.RateCompo(data, type.change);
    } else if (type.name === 'account') {
      return this.AccountCompo(data);
    }
    return null;
  }

  render() {
    const {navigation, route} = this.props;
    const {type, data} = route.params;
    return (
      <KeyboardAvoidingView style={styles.container}>
        <View
          style={[
            styles.section,
            {
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            },
          ]}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={require('../../assets/chevron.png')} />
          </TouchableOpacity>
          <Text style={styles.headder}>Edit Info</Text>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.btn}>
            <Text style={{color: Colors.Dask}}>Save</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.section}>{this.typeEdit(type, data)}</View>
      </KeyboardAvoidingView>
    );
  }

  InfoCompo(data) {
    let a = data.address.split('ตำบล')[1]
    let b = data.address.split('อำเภอ')[1]
    let c = data.address.split('จังหวัด')[1]
    const address1 = a.split(' ')[1]
    const address2 = b.split(' ')[1]
    const address3 = c.split(' ')[1]
    const number = data.address.split(' ')[1]
  
    
    return (
      <>
      <Text>{number}</Text>
        <View style={{marginVertical:10}}>
          <Text style={{fontSize: 14, color: Colors.Dask}}>ชื่อ</Text>
          <TextInput defaultValue={data.name} style={styles.input} />
        </View>
        <View style={{marginVertical:10}}>
          <Text style={{fontSize: 14, color: Colors.Dask}}>เบอร์โทรศัพท์</Text>
          <TextInput defaultValue={data.tel} style={styles.input} />
        </View>
        <View style={{marginVertical:10}}>
          <Text style={{fontSize: 14, color: Colors.Dask}}>เลขที่</Text>
          <TextInput defaultValue={number} style={styles.input} />
        </View>
        <View style={{marginVertical:10}}>
          <Text style={{fontSize: 14, color: Colors.Dask}}>ตำบล</Text>
          <TextInput defaultValue={address1} style={styles.input} />
        </View>
        <View style={{marginVertical:10}}>
          <Text style={{fontSize: 14, color: Colors.Dask}}>อำเภอ</Text>
          <TextInput defaultValue={address2} style={styles.input} />
        </View>
        <View style={{marginVertical:10}}>
          <Text style={{fontSize: 14, color: Colors.Dask}}>จังหวัด</Text>
          <TextInput defaultValue={address3} style={styles.input} />
        </View>
      </>
    );
  }
  RateCompo(data, change) {
    console.log('RateCompo DATA : ', data);
    console.log('RateCompo DATA : ', change);
    return <Text>Rate is now</Text>;
  }
  AccountCompo(data) {
    console.log('AccountCompo DATA : ', data);
    return <Text>Account is now</Text>;
  }
}

const {width} = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.BG,
    flex: 1,
  },
  section: {
    backgroundColor: Colors.White,
    width,
    paddingHorizontal: 20,
    paddingVertical: 30,
    marginBottom: 10,
  },
  headder: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.Dask,
    textAlign: 'center',
  },
  btn: {
    backgroundColor: Colors.BG,
    width: 50,
    height: 25,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    borderBottomWidth: 0.5,
  },
});
