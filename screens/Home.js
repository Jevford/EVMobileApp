import React, { Component } from 'react';
import {View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Alert} from 'react-native';

import Header from '../components/Header';

import Idle from '../assets/homeIcons/unplug.png'

// Money Images
import money0 from '../assets/homeIcons/cost/lv0.png'
import money1 from '../assets/homeIcons/cost/lv1.png'
import money2 from '../assets/homeIcons/cost/lv2.png'
import money3 from '../assets/homeIcons/cost/lv3.png'
import money4 from '../assets/homeIcons/cost/lv4.png'
import money5 from '../assets/homeIcons/cost/lv5.png'

// Tree Images
import tree0 from '../assets/homeIcons/tree/lv0.png'
import tree1 from '../assets/homeIcons/tree/lv1.png'
import tree2 from '../assets/homeIcons/tree/lv2.png'
import tree3 from '../assets/homeIcons/tree/lv3.png'
import tree4 from '../assets/homeIcons/tree/lv4.png'
import tree5 from '../assets/homeIcons/tree/lv5.png'


export default class Home extends Component {
    constructor(){
        super();
        this.state = { 
            optionbank1: money0,
            optionbank2: money3,
            optionbank3: money5,
            optiontree1: tree0,
            optiontree2: tree3,
            optiontree3: tree5
        };
    }

    piggybanks = [money0, money1, money2, money3, money4, money5];
    trees = [tree0, tree1, tree2, tree3, tree4, tree5];

    randomImg = () => {
        return Math.floor(Math.random() * 6);
    }
    refreshOptions = () => {
        this.setState({
            optionbank1: this.piggybanks[this.randomImg()],
            optionbank2: this.piggybanks[this.randomImg()],
            optionbank3: this.piggybanks[this.randomImg()],
            optiontree1: this.trees[this.randomImg()],
            optiontree2: this.trees[this.randomImg()],
            optiontree3: this.trees[this.randomImg()]
         })
    }

    render() {
        return (
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
                    <TouchableOpacity
                        style={styles.SelectionButton}
                        activeOpacity={0.5}
                        onPress={() =>{ Alert.alert('Selection Fast Chosen') }}
                    >
                        <View style={styles.SelectionText}>
                            <Text style={styles.selectionTitle}>[Fast] Quickest Charge</Text>
                            <Text style={styles.selectionChargeTime}>Charge Time: 2 hours</Text>
                            <Text style={styles.selectionEndTime}>End Time: 4:03am</Text>
                            <Image source={this.state.optionbank1} style={styles.selectionImgMoney}/>
                            <Image source={this.state.optiontree1} style={styles.selectionImgTree}/>
                        </View>
                        </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.SelectionButton}
                        activeOpacity={0.5}
                        onPress={() =>{ Alert.alert('Selection Moderate Chosen') }}
                    >
                        <View style={styles.SelectionText}>
                            <Text style={styles.selectionTitle}>[Moderate] Some Savings</Text>
                            <Text style={styles.selectionChargeTime}>Charge Time: 4 hours</Text>
                            <Text style={styles.selectionEndTime}>End Time: 6:03am</Text>
                            <Image source={this.state.optionbank2} style={styles.selectionImgMoney}/>
                            <Image source={this.state.optiontree2} style={styles.selectionImgTree}/>
                        </View>
                        </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.SelectionButton}
                        activeOpacity={0.5}
                        onPress={() =>{ Alert.alert('Selection Slow Chosen') }}
                    >
                        <View style={styles.SelectionText}>
                            <Text style={styles.selectionTitle}>[Slow] Great Cost and Tree Savings</Text>
                            <Text style={styles.selectionChargeTime}>Charge Time: 6 hours</Text>
                            <Text style={styles.selectionEndTime}>End Time: 8:03am</Text>
                            <Image source={this.state.optionbank3} style={styles.selectionImgMoney}/>
                            <Image source={this.state.optiontree3} style={styles.selectionImgTree}/>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.refreshOptions}>
                        <View>
                            <Text style={styles.refreshText}>Refresh My Options</Text>
                        </View>
                    </TouchableOpacity>
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
        marginTop: 15,
    },
    vehicleText: {
        paddingTop: 15,
        fontSize: 24,
        color: '#999999'
    },
    chargingOptions: {
        borderColor: 'transparent',
        borderBottomColor: '#65CB87',
        borderStyle: 'solid',
    },
    chargingOptionsText: {
        paddingTop: 20,
        paddingBottom: 10,
        fontSize: 24,
        color: '#65CB87'
    },
    refreshText: {
        marginLeft: 160,
        paddingTop: 5,
        paddingBottom: 5,
        fontSize: 18,
        color: '#65CB87'
    },  
    SelectionButton: {
        marginTop:5,
        paddingTop:45,
        paddingBottom:40,
        paddingLeft:170,
        paddingRight:170,
        marginLeft:0,
        marginRight:0,
        backgroundColor:'transparent',
        borderRadius:8,
        borderWidth: 1,
        borderColor: '#ABABAB'
    },
    SelectionText: {
        position: 'absolute',
        left:10,
        marginTop:10,
    },
    selectionTitle: {
        color:'black',
        position:"absolute",
        top:0,
    },
    selectionChargeTime: {
        color:'black',
        position:"absolute",
        top:20,
    },
    selectionEndTime: {
        color:'black',
        position:"absolute",
        top:40,
    },
    selectionImgMoney: {
        position: 'absolute',
        width: 40,
        height: 40,
        marginLeft: 210,
        top: 15,
    },
    selectionImgTree: {
        position:'absolute',
        width: 42,
        height: 42,
        marginLeft: 260,
        top: 15,
    }
})