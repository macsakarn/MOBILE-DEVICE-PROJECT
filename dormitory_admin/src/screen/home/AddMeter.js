import React, {Component} from 'react';

import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  StatusBar,
  Linking,
} from 'react-native';

import Colors from '../../assets/color';

import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import axios from 'axios';

class ScanScreen extends Component {
  onSuccess = async (e) => {
    const {navigation, route} = this.props;
    const {roomId} = route.params;

    let front = e.data.split('reg/');
    let i = front[1].indexOf('/');
    let back = '/' + front[1].slice(i + 1);
    let url = front[0]+"reg/"+ roomId + back
    console.log(url)

    try {
      const resp = await axios.get(url);
      let data = resp.data;
      if (data.status) {
        navigation.goBack();
      }
    } catch (err) {
      // Handle Error Here
      console.error(err);
    }
    
  };

  render() {
    const {navigation, route} = this.props;
    const {type, roomId} = route.params;
    return (
      <QRCodeScanner
        onRead={this.onSuccess}
        flashMode={RNCamera.Constants.FlashMode.off}
        topContent={
          <View style={[styles.section, styles.row]}>
            <TouchableOpacity
              style={{flex: 0.5}}
              onPress={() => navigation.goBack()}>
              <Image source={require('../../assets/chevron.png')} />
            </TouchableOpacity>
            <Text style={styles.headder}>
              Scan meter {type} {roomId}
            </Text>
            <View style={{flex: 0.5}}></View>
          </View>
        }
      />
    );
  }
}
const {width} = Dimensions.get('screen');
const styles = StyleSheet.create({
  section: {
    backgroundColor: Colors.White,
    width,
    paddingHorizontal: 20,
    paddingBottom: 30,
    marginBottom: 10,
    flex: 1,
  },
  headder: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.Dask,
    textAlign: 'center',
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default ScanScreen;
