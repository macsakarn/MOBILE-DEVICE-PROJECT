import React, {Component} from 'react';
import {Text, StyleSheet, View, TouchableOpacity, Image} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
export default class UploadBill extends Component {
  handleChoosePhoto = async () => {
    const option = {
      includeBase64: true,
      mediaType: 'photo',
    };
    const result = await launchImageLibrary(option);
    this.setState({
      base64: 'data:image/jpeg;base64,' + result.assets[0].base64,
    });
  };

  state = {
    base64: '',
  };

  showimage() {
    console.log(this.state.base64.substring(0, 50));
    console.log(!this.state.base64);
    if (!this.state.base64) {
      return null;
    } else {
      return (
        <Image
          style={{
            width: 51,
            height: 51,
            resizeMode: 'contain',
          }}
          source={{
            uri: this.state.base64,
          }}
        />
      );
    }
  }

  render() {
    return (
      <View>
        <TouchableOpacity onPress={this.handleChoosePhoto}>
          <Text>Choose File</Text>
        </TouchableOpacity>
        {this.showimage()}
      </View>
    );
  }
}

const styles = StyleSheet.create({});
