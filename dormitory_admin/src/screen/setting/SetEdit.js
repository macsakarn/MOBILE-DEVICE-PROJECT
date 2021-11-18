import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import InfoEdit from '../../components/onlySetting/InfoEdit'

import Colors from '../../assets/color';


export default class SetEdit extends Component {
  state = {}

  componentDidMount() {}

  typeEdit(type, data,navigation) {
    if (type.name === 'info') {
        return (
            <InfoEdit data={data} navigation={navigation}/>
          );
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
      <KeyboardAwareScrollView
        style={styles.container}
        extraHeight={150}
        enableOnAndroid={true}>
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
        </View>
        <View style={styles.section}>{this.typeEdit(type, data,navigation)}</View>
        <View style={{height: 60}} />
      </KeyboardAwareScrollView>
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
    flex: 1,
  },
 
});
