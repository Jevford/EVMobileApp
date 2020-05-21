import React, {Component, useState} from 'react';
import {Alert, Button, View, Text, StyleSheet} from 'react-native';
import Background from '../components/Background';

export default function RegisterCharger({navigation}) {
    return(
        <View style={styles.container}>
            <Background/>
            <Text>Hello World</Text>
            <Button
                title="Go to Drawer"
                color="#f04646"
                onPress={() => navigation.navigate('Home')}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
})