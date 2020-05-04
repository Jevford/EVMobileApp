import React, { Component } from 'react';
import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';

import Header from '../components/Header';

import Idle from '../assets/homeIcons/unplug.png'


export default class Home extends Component {
    render() {
        return (
            // <View style={styles.container}>
            //     <Header title='Home'/>
            //     <View style={styles.container}>
            //         <Text>Home Screen</Text>
            //     </View>
            // </View> 

            <ScrollView stickyHeaderIndices={[0]} showsVerticalScrollIndicator={false}>
            {<Header title='Home'/>}
            <View style={styles.container}>
                <View style={styles.container}>
                    <Text style={styles.vehicleText}> Connected Charger: {evseID} </Text>
                    <Image source={Idle} style={styles.vehicleStatus}/>
                    <Text style={styles.vehicleText}>Not Charging</Text>
                </View>
                <View style={styles.container}>
                    <Text style={styles.chargingOptionsText}> Your Charging Options </Text>
                    <Text style={styles.chargingOptions}></Text>
                    <Text style={styles.chargingOptions}></Text>
                    <Text style={styles.chargingOptions}></Text>
                    <Text style={styles.chargingOptionsText}> Charge Now </Text>
                </View>
            </View>
            </ScrollView>
        );
    }
}

const evseID = "EVTSX1"

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent'
    },
    vehicleStatus: {
        width: 290,
        height: 160,
        marginTop: 10,
    },
    vehicleText: {
        paddingTop: 10,
        fontSize: 24,
        color: '#999999'
    },
    chargingOptions: {
        borderColor: 'transparent',
        borderBottomColor: '#65CB87',
        borderStyle: 'solid',
    },
    chargingOptionsText: {
        paddingTop: 10,
        fontSize: 24,
        color: '#65CB87'
    }
})