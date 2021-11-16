import React, { Component } from 'react'
import { StatusBar, View } from 'react-native'

import MainNavigate from './src/navigation/MainNavigate'
export default class App extends Component {
  render() {
    return (
      <>
      <StatusBar  backgroundColor="#fff" barStyle="dark-content"/>
      <MainNavigate/>
      </>
    )
  }
}
