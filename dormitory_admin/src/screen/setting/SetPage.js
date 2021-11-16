import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Dimensions,
  Image,
  ScrollView,
  SafeAreaView,
} from 'react-native';

import Colors from '../../assets/color';

import SettingText from '../../components/SettingText';
import SettingAccount from '../../components/SettingAccount';
export default class SetPage extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.section}>
            <Text style={styles.headder}>Setting</Text>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Image source={require('../../assets/image/home.png')} />
              <View>
                <Text style={[styles.font, {fontWeight: 'bold'}]}>
                  Dianne Russell
                </Text>
                <Text style={styles.font}>070 6302 8446</Text>
                <Text style={styles.font}>เลขที่ 88/8888 ตำบล ลาดกะบัง</Text>
                <Text style={styles.font}>อำเภอ ลาดกระบัง จังหวัด กรุงเทพ</Text>
              </View>
              <Image source={require('../../assets/edit.png')} />
            </View>
          </View>
          <View style={styles.section}>
            <Text style={styles.samiHeadder}>Service Rate</Text>
            <SettingText price={10} title="Electricity Tariff / Unit" />
            <SettingText price={10} title="Water Tariff / Unit" />
            <SettingText price={10} title="Daily Service Rate" />
          </View>
          <View style={[styles.section, {marginBottom: 100}]}>
            <Text style={styles.samiHeadder}>Account</Text>
            <SettingAccount name="test" number="12314" />
            <SettingAccount name="test" number="12314" />
            <SettingAccount name="test" number="12314" />
          </View>
        </ScrollView>
      </View>
    );
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
    padding: 20,
    marginBottom: 10,
  },
  font: {
    lineHeight: 22,
    fontSize: 14,
    color: Colors.Dask,
  },
  headder: {
    fontSize: 25,
    fontWeight: 'bold',
    color: Colors.Dask,
    marginBottom: 20,
    alignSelf: 'center',
  },
  samiHeadder: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.Dask,
  },
});
