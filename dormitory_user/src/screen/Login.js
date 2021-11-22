import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  StatusBar,
  Dimensions,
  TextInput,
  TouchableOpacity,
} from 'react-native';

export default class login extends Component {
  render() {
    return (
      <View style={styles.screen}>
        <Image source={require('../assets/login/bg.png')} />
        <View style={styles.section}>
          <Text style={styles.header}>LOGIN</Text>
          <View style={styles.form}>
            <Text style={styles.midFont}>Room ID</Text>
            <View style={styles.searchBox}>
              <TextInput
                placeholder="Your room id"
                // onChangeText={name => this.setState({name})}
              />
            </View>
            <Text style={styles.midFont}>Password</Text>
            <View style={styles.searchBox}>
              <TextInput
                placeholder="Password"
                secureTextEntry={true}
                keyboardType="numeric"
                // onChangeText={name => this.setState({name})}
              />
            </View>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => this._headderAPI(room)}>
              <Text
                style={{
                  color: '#fff',
                  textAlign: 'center',
                  fontSize: 15,
                  fontWeight: '700',
                }}>
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
          <Image source={require('../assets/login/footbg.png')} style={{backgroundColor:'#fff',width}}/>
      </View>
    );
  }
}

const {width} = Dimensions.get('screen');
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#ebebeb',
    alignItems: 'center',
    paddingTop: StatusBar.currentHeight || 0,
  },
  section: {
    backgroundColor: '#fff',
    flex: 1,
    width,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    paddingTop: StatusBar.currentHeight || 0,
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#1d1d1d',
  },
  form: {
    paddingTop: StatusBar.currentHeight || 0,
    paddingHorizontal: 20,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    borderBottomWidth: 0.5,
  },
  midFont: {
    fontSize: 18,
    color: '#1d1d1d',
    paddingVertical: 5,
  },
  btn: {
    backgroundColor: '#0066FF',
    justifyContent: 'center',
    height: 40,
    borderRadius: 10,
    marginTop: 20,
  },
});
