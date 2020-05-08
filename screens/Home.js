import React, { Component } from 'react';
import {View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Alert} from 'react-native';
import axios from 'axios';

import Header from '../components/Header';

// Vehicle Status Images
import Idle from '../assets/homeIcons/unplug.png'
import Charging from '../assets/homeIcons/plug.png'

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
            vehicleStatusImg: Idle,
            vehicleStatusText: "Not Charging",
            chargeText: "Charge Now",
            dbOptions: '',
            myOptions: {
                option1: {
                    label: '',
                    charge: '',
                    ready: '',
                    save: '',
                    tree: ''
                },
                option2: {
                    label: '',
                    charge: '',
                    ready: '',
                    save: '',
                    tree: ''
                },
                option3: {
                    label: '',
                    charge: '',
                    ready: '',
                    save: '',
                    tree: ''
                }
            },
            option1flag: false,
            option2flag: false,
            option3flag: false,
            loadOptionsFlag: false
        };
    }
    
    vehicleImages = [Idle, Charging];
    piggybanks = [money0, money1, money2, money3, money4, money5];
    trees = [tree0, tree1, tree2, tree3, tree4, tree5];
    
    axiosTest = () => {
        if (this.state.dbOptions === ''){
            axios.get(
                'http://52.156.135.73/api.php',
                {params : {collection : 'options'}}
            )
            .then((res) => {
                this.setState({dbOptions: res.data})
            })
            .catch((err) => Alert.alert(err));
        }
    }

    random = () => {
        return Math.floor(Math.random() * this.state.dbOptions.length);
    }

    refreshOptions = () => {
        let selection1 = this.random();
        let selection2 = this.random();
        let selection3 = this.random();

        this.setState({
            myOptions: {
                option1: {
                    label: this.state.dbOptions[selection1]["Label"],
                    charge: this.state.dbOptions[selection1]["Charge"],
                    ready: this.state.dbOptions[selection1]["Ready"],
                    save: this.piggybanks[this.state.dbOptions[selection1]["Save"]],
                    tree: this.trees[this.state.dbOptions[selection1]["Tree"]]
                },
                option2: {
                    label: this.state.dbOptions[selection2]["Label"],
                    charge: this.state.dbOptions[selection2]["Charge"],
                    ready: this.state.dbOptions[selection2]["Ready"],
                    save: this.piggybanks[this.state.dbOptions[selection2]["Save"]],
                    tree: this.trees[this.state.dbOptions[selection2]["Tree"]]
                },
                option3: {
                    label: this.state.dbOptions[selection3]["Label"],
                    charge: this.state.dbOptions[selection3]["Charge"],
                    ready: this.state.dbOptions[selection3]["Ready"],
                    save: this.piggybanks[this.state.dbOptions[selection3]["Save"]],
                    tree: this.trees[this.state.dbOptions[selection3]["Tree"]]
                }
            },
            option1flag: false,
            option2flag: false,
            option3flag: false,
            loadOptionsFlag: true
        })
    }

    styleOption = (flag) => {
        let selectionColor = flag ? "#cdd1ce" : "transparent"; 
        return {
                marginTop:5,
                paddingTop:45,
                paddingBottom:40,
                paddingLeft:170,
                paddingRight:170,
                marginLeft:0,
                marginRight:0,
                backgroundColor: selectionColor,
                borderRadius:8,
                borderWidth: 1,
                borderColor: '#ABABAB'
            }
    }

    setOptionFlag = (option) => {
        if(option === 'option1'){
            this.setState({
                option1flag: true,
                option2flag: false,
                option3flag: false
            })
        }
        else if(option === 'option2'){
            this.setState({
                option1flag: false,
                option2flag: true,
                option3flag: false
            })
        }
        else if(option === 'option3'){
            this.setState({
                option1flag: false,
                option2flag: false,
                option3flag: true
            })
        }
    }

    setChargeOption = () => {
        if(this.state.chargeText === "Charge Now"){
            this.setState({
                vehicleStatusImg: Charging,
                vehicleStatusText: "Charging",
                chargeText: "Stop Charging"
            })
        }
        else{
            this.setState({
                vehicleStatusImg: Idle,
                vehicleStatusText: "Not Charging",
                chargeText: "Charge Now"
            })
        }
    }

    getData = async () => {
        if (this.state.dbOptions === ''){
            let res = await  axios.get(
                'http://52.156.135.73/api.php',
                {params : {collection : 'options'}}
                )
    
            this.setState({dbOptions: res.data});
            if(!this.state.loadOptionsFlag){
                this.refreshOptions();
            }
        }
    }

    render() {
        this.getData();
        // this.axiosTest();

        // // Giving Time for Promise to be resolved
        // setTimeout(() => {
        //     if(!this.state.loadOptionsFlag){
        //         this.refreshOptions();
        //     }}, 500);

        return (
            <ScrollView stickyHeaderIndices={[0]} showsVerticalScrollIndicator={false}>
            {<Header title='Home'/>}
            <View style={styles.container}>
                <View style={styles.container}>
                    <Text style={styles.vehicleText}> Connected Charger: {evseID} </Text>
                    <Image source={this.state.vehicleStatusImg} style={styles.vehicleStatus}/>
                    <Text style={styles.vehicleText}>{this.state.vehicleStatusText}</Text>
                </View>
                <View style={styles.container}>
                    <Text style={styles.chargingOptionsText}> Your Charging Options </Text>
                    <TouchableOpacity
                        style={this.styleOption(this.state.option1flag)}
                        activeOpacity={0.5}
                        onPress={() =>{ this.setOptionFlag('option1') }}
                    >
                        <View style={styles.SelectionText}>
                            <Text style={styles.selectionTitle}>{this.state.myOptions.option1.label}</Text>
                            <Text style={styles.selectionChargeTime}>Charge Time: {this.state.myOptions.option1.charge}</Text>
                            <Text style={styles.selectionEndTime}>Ready By: {this.state.myOptions.option1.ready}</Text>
                            <Image source={this.state.myOptions.option1.save} style={styles.selectionImgMoney}/>
                            <Image source={this.state.myOptions.option1.tree} style={styles.selectionImgTree}/>
                        </View>
                        </TouchableOpacity>
                    <TouchableOpacity
                        style={this.styleOption(this.state.option2flag)}
                        activeOpacity={0.5}
                        onPress={() => { this.setOptionFlag('option2') }}
                    >
                        <View style={styles.SelectionText}>
                        <Text style={styles.selectionTitle}>{this.state.myOptions.option2.label}</Text>
                            <Text style={styles.selectionChargeTime}>Charge Time: {this.state.myOptions.option2.charge}</Text>
                            <Text style={styles.selectionEndTime}>Ready By: {this.state.myOptions.option2.ready}</Text>
                            <Image source={this.state.myOptions.option2.save} style={styles.selectionImgMoney}/>
                            <Image source={this.state.myOptions.option2.tree} style={styles.selectionImgTree}/>
                        </View>
                        </TouchableOpacity>
                    <TouchableOpacity
                        style={this.styleOption(this.state.option3flag)}
                        activeOpacity={0.5}
                        onPress={() =>{ this.setOptionFlag('option3') }}
                    >
                        <View style={styles.SelectionText}>
                        <Text style={styles.selectionTitle}>{this.state.myOptions.option3.label}</Text>
                            <Text style={styles.selectionChargeTime}>Charge Time: {this.state.myOptions.option3.charge}</Text>
                            <Text style={styles.selectionEndTime}>Ready By: {this.state.myOptions.option3.ready}</Text>
                            <Image source={this.state.myOptions.option3.save} style={styles.selectionImgMoney}/>
                            <Image source={this.state.myOptions.option3.tree} style={styles.selectionImgTree}/>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.refreshOptions}>
                        <View>
                            <Text style={styles.refreshText}>Refresh My Options</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.setChargeOption}>
                        <View>
                            <Text style={styles.chargingOptionsText}> {this.state.chargeText} </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            </ScrollView>
        );
    }
}

const evseID = "EVTSX1"

let styles = StyleSheet.create({
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
        borderColor: "transparent",
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
    // SelectionButton: {
    //     marginTop:5,
    //     paddingTop:45,
    //     paddingBottom:40,
    //     paddingLeft:170,
    //     paddingRight:170,
    //     marginLeft:0,
    //     marginRight:0,
    //     backgroundColor: selectionColor,
    //     borderRadius:8,
    //     borderWidth: 1,
    //     borderColor: '#ABABAB'
    // },
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