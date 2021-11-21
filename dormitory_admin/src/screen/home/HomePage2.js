import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Dimensions,
  StatusBar,
  Image,
  TouchableOpacity,
} from 'react-native';
import Colors from '../../assets/color';
import Detail from '../../components/Detail'
export default class HomePage2 extends Component {
  render() {
    const {navigation, route} = this.props;
    const {id} = route.params;
    return (
      <View style={styles.container}>
        <View style={styles.section}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{flex: 0.5}}>
              <Image source={require('../../assets/chevron.png')} />
            </TouchableOpacity>
            <Text style={styles.headder}>ROOM DETAILS</Text>
            <View style={{flex: 0.5}}></View>
          </View>
          <View style={{alignItems: 'center'}}>
            <Text
              style={{
                fontSize: 16,
                paddingBottom: 5,
                paddingTop: 20,
                color: Colors.Dask,
              }}>
              ROOM
            </Text>
            <Text
              style={{
                fontSize: 18,
                paddingVertical: 5,
                color: Colors.Blue,
                fontWeight: 'bold',
              }}>
              {id}
            </Text>
            <Text
              style={{fontSize: 16, paddingVertical: 5, color: Colors.Gray}}>
              1234 Bath
            </Text>
          </View>
        </View>
        <View style={styles.section}>
            <Detail title={"Residents"} value={"1000"}/>
            <Detail title={"Contact"} value={"1000"}/>
            <Detail title={"Residents"} value={"1000"}/>
            <Detail title={"Usege today"} value={"1000"} image={require('../../assets/Bolt2.png')}/>
            <Detail title={"Usege this month"} value={"1000"} image={require('../../assets/Bolt2.png')}/>
            <Detail title={"Usege today"} value={"1000"} image={require('../../assets/water2.png')}/>
            <Detail title={"Usege this month"} value={"1000"} image={require('../../assets/water2.png')}/>
        </View>
      </View>
    );
  }
}
const {width} = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    container: {
      backgroundColor: Colors.BG,
      flex: 1,
    },
  },
  section: {
    backgroundColor: Colors.White,
    width,
    paddingHorizontal: 20,
    paddingBottom: 30,
    marginBottom: 10,
    paddingTop: StatusBar.currentHeight || 0,
  },
  headder: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.Dask,
    textAlign: 'center',
    flex: 1,
  },
});
