import React, {Component} from 'react';

import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  StatusBar
} from 'react-native';

import Colors from '../assets/color'

import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';

class ScanScreen extends Component {
  onSuccess = e => {
    const {scan,type, back} = this.props
    console.log(e.data);
    scan(type,e.data)
    back()
  };

  render() {
    const {type, back} = this.props
    return (
      <QRCodeScanner
        onRead={this.onSuccess}
        flashMode={RNCamera.Constants.FlashMode.off}
        topContent={
          <View style={[styles.section, styles.row]}>
            <TouchableOpacity
              onPress={back}
              style={{flex: 0.5}}>
              <Image source={require('../assets/chevron.png')} />
            </TouchableOpacity>
            <Text style={styles.headder}>Scan meter {type}</Text>
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
    flex:1,
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
