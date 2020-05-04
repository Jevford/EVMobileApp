import React, { Component } from 'react';
import {View, Text, StyleSheet, SafeAreaView, TouchableOpacity} from 'react-native';

import Header from '../components/Header';

export default class Preferences extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Header title='Preferences'/>
                <View style={styles.container}>
                    <Text>Preferences Screen</Text>
                </View>
            </View> 
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})