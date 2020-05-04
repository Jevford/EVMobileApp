import React, { Component } from 'react';
import {View, Text, StyleSheet, SafeAreaView, TouchableOpacity} from 'react-native';

import Header from '../components/Header';


export default class Charger extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Header title ='Charger'/>
                <View style={styles.container}>
                    <Text>Charger Screen</Text>
                </View>
            </View> 
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    }
})