import React, {Component} from 'react';
import {Text, StyleSheet, View, Dimensions} from 'react-native';

import Tab from './Tab';
import Icon from '../assets/navigation/list';
export default class TabBar extends Component {
  constructor(props) {
    super(props);
    
  }
  state = {
    selected: 'Home',
  }
  renderColor(name) {
    return name === this.state.selected ? '#000' : '#BABABA';
  }

  handleTab(name) {
    const {navigation} = this.props;
    this.setState({selected: name});
    navigation.navigate(name);
  }

  render() {
    const {state} = this.props;
    const {routes} = state;

    const tabIcon = routes.map((routes, index) => {
      return (
        <Tab
          tab={routes}
          icon={Icon[index]}
          onPress={() => this.handleTab(routes.name)}
          color={this.renderColor(routes.name)}
          key={routes.key}
        />
      );
    });
    return (
      <View style={styles.container}>
        <View style={styles.tabBtn}>{tabIcon}</View>
      </View>
    );
  }
}

const {width} = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width,
    height: 70,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    bottom: 0,
    
  },
  tabBtn: {
    flex: 1,
    flexDirection: 'row',
    
  },
});
