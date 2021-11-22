import React, { Component } from 'react'
import MainNavigate from './src/navigation/MainNavigate'
import Login from './src/screen/Login'
export default class App extends Component {
  state = {
    roomId:"a001",
    password:"1234",
    login:false,
    account:""
  }

  _handleId= (roomId) => {
    this.setState({roomId})
  }

  _handlePassword=(password)=>{
    this.setState({password})
  }

  login(){
    console.log("User : ",this.state.roomId);
    console.log("Password : ",this.state.password);
    this.setState({login:true})
    this.setState({account:"A001"})
  }

  render() {
    if (this.state.login) {
      return (
        <MainNavigate user={this.state.account}/>
      )
    }else{
      return <Login onPress={()=>this.login()} handleId={this._handleId} handlePass={this._handlePassword}/>
    }
    
  }
}
