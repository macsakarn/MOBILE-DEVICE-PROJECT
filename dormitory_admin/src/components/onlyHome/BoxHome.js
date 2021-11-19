import React, { Component } from 'react'
import { Text, StyleSheet, View,Image } from 'react-native'

export default class BoxHome extends Component {
    constructor(props){
        super(props)
    }
    render() {
        const {title=null, image=null, value=null, color="#bababa"} = this.props
        return (
            <View style={[styles.box,{backgroundColor: color}]}>
              <Image source={image} />
              <Text style={{fontSize:18,fontWeight:'bold',color:"#fff",paddingVertical:5}}>{title}</Text>
              <Text style={{fontSize:14,color:"#fff"}}>{value}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    box: {
        width: 110,
        marginHorizontal: 3,
        height: 108,
        borderRadius: 10,
        alignItems:'center',
        justifyContent:'center',
      },
})
