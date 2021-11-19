import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  TextInput,
  Alert,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Colors from '../../assets/color';

import axios from 'axios';
const baseURL = 'https://annoucement.herokuapp.com/api/announces';

export default function TextBoxPage2({navigation}) {
  const [titleInp, setTitleInp] = React.useState('');
  const [messageInp, setMessageInp] = React.useState('');

  const postMSG = () => {
    axios
      .post(baseURL, {
        title: titleInp,
        message: messageInp,
      })
      .catch(error => {
        console.log(error);
      });
    setTitleInp('');
    setMessageInp('');
  };
  const confirmationAlert = () => {
    Alert.alert(
      'Confirm to send?',
      `Title : ${titleInp}${'\n\n'}Message : ${messageInp}`,
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => postMSG()},
      ],
    );
  };
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
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
            setTitleInp('');
            setMessageInp('');
          }}>
          <Image source={require('../../assets/chevron.png')} />
        </TouchableOpacity>
        <Text style={styles.headder}>Create Announcement</Text>
      </View>
      {/* --------------------------------------------------------------------- */}
      {/* ช่องกรอก Tititle */}
      
      <View style={styles.titleBox}>
        <TextInput
          // multiline
          maxLength={42}
          onChangeText={text => setTitleInp(text)}
          value={titleInp}
          placeholder="Title"
        />
      </View>
      {/* ช่องกรอก Message */}
      <View style={styles.msgBox}>
        <TextInput
          multiline
          numberOfLines={7}
          onChangeText={text => setMessageInp(text)}
          value={messageInp}
          placeholder="Message"
        />
      </View>
      <TouchableOpacity
        onPress={() => {
          confirmationAlert();
        }}
        style={styles.btn}>
        <Text
          style={{
            color: Colors.White,
            textAlign: 'center',
            fontSize: 15,
            fontWeight: '700',
          }}>
          Send
        </Text>
      </TouchableOpacity>
    </KeyboardAwareScrollView>
  );
}
let {width, height} = Dimensions.get('window');
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
  titleBox: {
    backgroundColor: 'white',
    borderRadius:15,
    marginTop: 10,
    marginHorizontal:16,
    paddingHorizontal:15

  },
  msgBox: {
    // borderWidth: 1,
    borderRadius:15,
    backgroundColor: 'white',
    marginTop: 10,
    marginHorizontal:16,
    paddingHorizontal:15
  },
  btn: {
    backgroundColor: Colors.Blue,
    justifyContent: 'center',
    height: 40,
    borderRadius: 30,
    marginTop: 20,
    marginHorizontal: 15,
  },
});
