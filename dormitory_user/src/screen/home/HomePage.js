import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'

export default class HomePage extends Component {
    render() {
        const {route} = this.props
        const {itemId} = route.params;
        return (
            <View>
                <Text> {itemId} </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({})
