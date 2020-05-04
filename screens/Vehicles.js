import React, { Component } from 'react';
import {View, Text, StyleSheet, SafeAreaView, TouchableOpacity} from 'react-native';

import Header from '../components/Header';


export default class Vehicles extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Header title='Vehicles'/>
                <View style={styles.container}>
                    <Text>Vehicles Screen</Text>
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