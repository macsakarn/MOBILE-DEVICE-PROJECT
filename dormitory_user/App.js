import React, { Component } from 'react'
import MainNavigate from './src/navigation/MainNavigate'
import Login from './src/screen/Login'
export default class App extends Component {
  render() {
    if (true) {
      return <Login/>
    }else{
      return (
        <MainNavigate/>
      )
    }
    
  }
}
