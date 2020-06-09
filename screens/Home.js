import React, { Component } from 'react';
import {View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Dimensions, Alert} from 'react-native';
import axiosInstance from '../components/axiosInstance';
// import client from '../components/mqttInstance';
import Client from '../mqtt/mqttInstance';

import Header from '../components/Header'
import Background from '../components/Background'

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
    constructor(props){
        super(props);
        this.state = { 
            vehicleStatusImg: Idle,
            vehicleStatusText: "Not Charging",
            chargeText: "Charge Now",
            dbOptions: '',
            characteristicArray: [],
            myOptions: {
                option1: {
                    index: -1,
                    id: 0,
                    label: '',
                    charge: '',
                    ready: '',
                    save: money0,
                    tree: tree0
                },
                option2: {
                    index: -1,
                    id: 0,
                    label: '',
                    charge: '',
                    ready: '',
                    save: money0,
                    tree: tree0
                },
                option3: {
                    index: -1,
                    id: 0,
                    label: '',
                    charge: '',
                    ready: '',
                    save: money0,
                    tree: tree0
                }
            },
            option1flag: false,
            option2flag: false,
            option3flag: false,
            loadOptionsFlag: false
        };
    }

    mqttClient = new Client()
    evseID = this.mqttClient.deviceID
    make = ""
    model = ""
    vehicleImages = [Idle, Charging];
    piggybanks = [money0, money1, money2, money3, money4, money5];
    trees = [tree0, tree1, tree2, tree3, tree4, tree5];

    initializeUserInfo = () => {
        if (this.props.route.params != undefined) {
            this.evseID = this.props.route.params.evseID

            this.make = this.props.route.params.make
            this.make = this.make.toUpperCase()

            this.model = this.props.route.params.model
            this.model = this.model.toUpperCase()
        }

    }
    
    componentDidMount = () => {
        this.mqttClient.requestChargeState()
        this.getData()
    }

    random = () => {
        return Math.floor(Math.random() * this.state.dbOptions.length);
    }

    floatToInt = (num) => {
        if (num >= 4.5)
            return 5;
        return Math.round(num);
    }

    refreshOptions = () => {
        let selection1 = this.random();
        let selection2 = this.random();
        let selection3 = this.random();

        this.setState({
            myOptions: {
                option1: {
                    index: selection1,
                    id: this.state.dbOptions[selection1]["scheduleID"],
                    label: this.state.dbOptions[selection1]["characteristic"],
                    charge: this.state.dbOptions[selection1]["chargeTime"].toFixed(2) + " hours",
                    ready: this.state.dbOptions[selection1]["scheduleEndTime"] + " o'clock",
                    save: this.piggybanks[this.floatToInt(this.state.dbOptions[selection1]["save"])],
                    tree: this.trees[this.floatToInt(this.state.dbOptions[selection1]["tree"])]
                },
                option2: {
                    index: selection2,
                    id: this.state.dbOptions[selection2]["scheduleID"],
                    label: this.state.dbOptions[selection2]["characteristic"],
                    charge: this.state.dbOptions[selection2]["chargeTime"].toFixed(2) + " hours",
                    ready: this.state.dbOptions[selection2]["scheduleEndTime"] + " o'clock",
                    save: this.piggybanks[this.floatToInt(this.state.dbOptions[selection2]["save"])],
                    tree: this.trees[this.floatToInt(this.state.dbOptions[selection2]["tree"])]
                },
                option3: {
                    index: selection3,
                    id: this.state.dbOptions[selection3]["scheduleID"],
                    label: this.state.dbOptions[selection3]["characteristic"],
                    charge: this.state.dbOptions[selection3]["chargeTime"].toFixed(2) + " hours",
                    ready: this.state.dbOptions[selection3]["scheduleEndTime"] + " o'clock",
                    save: this.piggybanks[this.floatToInt(this.state.dbOptions[selection3]["save"])],
                    tree: this.trees[this.floatToInt(this.state.dbOptions[selection3]["tree"])]
                }
            },
            option1flag: false,
            option2flag: false,
            option3flag: false,
            loadOptionsFlag: true
        })
    }

    labelOptions = () => { // env, cos, soc
        for(i = 0; i < this.state.dbOptions.length; ++i) {
            let label = this.state.dbOptions[i]["characteristic"];
            this.state.characteristicArray.push(label);

            if(label[0] > 0.5)
                this.state.dbOptions[i]["characteristic"] = "Save Environment";
            else if(label[1] > 0.5)
                this.state.dbOptions[i]["characteristic"] = "Save Money";
            else if(label[2] > 0.5)
                this.state.dbOptions[i]["characteristic"] = "Reduce Societal Impact";
            else if(label[0] > 0.33 && label[1] > 0.33)
                this.state.dbOptions[i]["characteristic"] = "Save Money and Environment";
            else if(label[0] > 0.33 && label[2] > 0.33)
                this.state.dbOptions[i]["characteristic"] = "Reduce Soc Impact and Save Env";
            else if(label[1] > 0.33 && label[2] > 0.33)
                this.state.dbOptions[i]["characteristic"] = "Reduce Soc Impact and Save Money";
            else
                this.state.dbOptions[i]["characteristic"] = "Balanced Savings";
        }
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
                borderWidth: 2,
                borderColor: '#ABABAB',
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

    toggleButtonFunction = async () => {
        if(this.mqttClient.chargerRelayState == 0)
            await this.mqttClient.toggleChargerOn()
        else if(this.mqttClient.chargerRelayState == 1)
            await this.mqttClient.toggleChargerOff()
    }


    setChargeOption = async () => {

        this.toggleButtonFunction()

        // If you are using the evse_sim1 python script to test, the logic for the charge states are different
        // Currently using charge states provided by the physical sim board
        if(this.state.chargeText === "Charge Now" && this.mqttClient.chargeState == 1) {
            this.setState({
                vehicleStatusImg: Charging,
                vehicleStatusText: "Connected But Not Charging",
                chargeText: "Stop Charging"
            })
        }
        else if(this.state.chargeText === "Charge Now" && this.mqttClient.chargeState == 2) {
            this.setState({
                vehicleStatusImg: Charging,
                vehicleStatusText: "Charging",
                chargeText: "Stop Charging"
            })
        }
        else if(this.state.chargeText === "Charge Now" && this.mqttClient.chargeState == 3) {
            this.setState({
                vehicleStatusImg: Idle,
                vehicleStatusText: "Charger Is Not Plugged In",
                chargeText: "Charge Now"
            })
        }
        else if(this.state.chargeText === "Stop Charging") {
            this.setState({
                vehicleStatusImg: Charging,
                vehicleStatusText: "Connected But Not Charging",
                chargeText: "Charge Now"
            })
        }
        else if(!this.mqttClient.connectFlag) {
            this.setState({
                vehicleStatusImg: Idle,
                vehicleStatusText: "Unable to Communicate with the Charger ",
                chargeText: "Charge Now"
            })
            Alert.alert(
                'You Are Not Connected Online',
                `This due to not being able to successfuly connect to the mqtt broker.\nPlease try restarting the app.`
                )
            }
        else {
            this.setState({
                vehicleStatusImg: Idle,
                vehicleStatusText: "Not Charging",
                chargeText: "Charge Now"
            })
            Alert.alert(
                "Your Charger Is Not Connected Online",
                "Please make sure your charger is on and able to access the internet"
            )
        }
    }
        
    getData = async () => {
        if (this.state.dbOptions === ''){
            let res = await axiosInstance.get(
                '/api.php',
                {params : {version : 1, collection : 'chargeSchedule'}}
            )
            this.setState({dbOptions: res.data});
            this.labelOptions();
            if(!this.state.loadOptionsFlag){
                this.refreshOptions();
            }
        }
    }

    updateChargerSchedule = async () => {
        const insert = {
            "evseID": this.mqttClient.deviceID
        }

        let id;
        if (this.state.option1flag) {
            id = this.state.myOptions.option1.id;
        }
        else if (this.state.option2flag) {
            id = this.state.myOptions.option2.id;
        }
        else if (this.state.option3flag) {
            id = this.state.myOptions.option3.id;
        }

        const param = {
            "scheduleID": id 
        }

        let insertData = JSON.stringify(insert);
        let paramData = JSON.stringify(param);
        const data = `collection=chargeSchedule&param=${paramData}&data=${insertData}`;

        const config = axiosInstance({
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        });

        await axiosInstance.post('/update.php', data, config)
            .then((data) => {
                console.log(data);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    postToChargerSchema = async () => {
        let scheduleID, env, cos, soc, chargetime, readyby, tree, save, capacity = 33000, lvl1 = 1, lvl2 = 0
        if (this.make == "CHEVY" && this.model == "BOLT"){
            lvl1 = 1
            lvl2 = 0
            capacity = Math.floor(Math.random() * 20000)
        }

        if (this.make == "TESLA" && this.model == "MODEL 3"){
            lvl1 = 0
            lvl2 = 1
            capacity = Math.floor(Math.random() * 76000)
        }

        if (this.state.option1flag) {
            let index = this.state.myOptions.option1.index;
            scheduleID = this.state.myOptions.option1.id;
            env = this.state.characteristicArray[index][0];
            cos = this.state.characteristicArray[index][1];
            soc = this.state.characteristicArray[index][2];
            chargetime = this.state.dbOptions[index]["chargeTime"];
            readyby = this.state.dbOptions[index]["scheduleEndTime"];
            tree = this.state.dbOptions[index]["tree"];
            save = this.state.dbOptions[index]["save"];
        }
        else if (this.state.option2flag) {
            let index = this.state.myOptions.option2.index;
            scheduleID = this.state.myOptions.option2.id;
            env = this.state.characteristicArray[index][0];
            cos = this.state.characteristicArray[index][1];
            soc = this.state.characteristicArray[index][2];
            chargetime = this.state.dbOptions[index]["chargeTime"];
            readyby = this.state.dbOptions[index]["scheduleEndTime"];
            tree = this.state.dbOptions[index]["tree"];
            save = this.state.dbOptions[index]["save"];
        }
        else if (this.state.option3flag) {
            let index = this.state.myOptions.option3.index;
            scheduleID = this.state.myOptions.option3.id;
            env = this.state.characteristicArray[index][0];
            cos = this.state.characteristicArray[index][1];
            soc = this.state.characteristicArray[index][2];
            chargetime = this.state.dbOptions[index]["chargeTime"];
            readyby = this.state.dbOptions[index]["scheduleEndTime"];
            tree = this.state.dbOptions[index]["tree"];
            save = this.state.dbOptions[index]["save"];
        }

        let timestamp = new Date().toISOString();
        const insert = {
            "evseID": this.mqttClient.deviceID,
            "scheduleID": scheduleID,
            "ecoPref": env,
            "cosPref": cos,
            "socPref": soc,
            "capacity": capacity,
            "chargeTime": chargetime,
            "readyby": readyby,
            "tree": tree,
            "save": save,
            "LV1Vehicle": lvl1,
            "LV2Vehicle": lvl2,
            "currentchargerstatus": "Charging",
            "connectionLatestTestTime": timestamp
        }

        let insertData = JSON.stringify(insert);
        const data = `collection=chargerSchema&data=${insertData}`;

        const config = axiosInstance({
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        });

        await axiosInstance.post('/insert.php', data, config)
            .then((data) => {
                console.log(data);
            })
            .catch((err) => {
                console.log(err);
            })

        this.postToChargeRequest(timestamp, readyby)
    }

    postToChargeRequest = async (timestamp, readyby) => {
        const insert = {
            "timestamp": timestamp,
            "endtime": readyby,
            "scheduled": 0,
        }

        let insertData = JSON.stringify(insert);
        const data = `collection=chargeRequest&data=${insertData}`;

        const config = axiosInstance({
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        });

        await axiosInstance.post('/insert.php', data, config)
            .then((data) => {
                console.log(data);
            })
            .catch((err) => {
                console.log(err);
            })
    }


    render() {
        console.log(this.props) 
        this.initializeUserInfo();

        return (
            <ScrollView stickyHeaderIndices={[0]} showsVerticalScrollIndicator={false}>
                <Header title='Home'/>
                <Background/>
                <View style={styles.container}>
                    <View style={styles.containerCharger}>
                        {/* <Text style={styles.vehicleText}> Connected Charger: {this.evseID} </Text> */}
                        <Text style={styles.vehicleText}> Connected Charger: {this.evseID} </Text>
                        <Image source={this.state.vehicleStatusImg} style={styles.vehicleStatus}/>
                        <Text style={styles.vehicleText}>{this.state.vehicleStatusText}</Text>
                    </View>
                    <View style={styles.containerChargerOptions}>
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
                        <TouchableOpacity onPress={() => {
                                                    this.setChargeOption()
                                                    if (this.state.option1flag || this.state.option2flag || this.state.option3flag)
                                                        this.updateChargerSchedule()
                                                    this.postToChargerSchema()
                                                }}>
                            <View>
                                <Text style={styles.chargeToggleButton}> {this.state.chargeText} </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        );
    }
}


let styles = StyleSheet.create({
    container: {
        flex: 1,
        top: -40,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        height: Dimensions.get('window').height
    },
    containerCharger: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    containerChargerOptions: {
        flex: 1,
        top: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    vehicleStatus: {
        width: 290,
        height: 160,
        marginTop: 15,
    },
    vehicleText: {
        paddingTop: 15,
        fontSize: 20,
        fontWeight: 'bold',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowRadius: 2,
        color: '#999999'
    },
    chargingOptions: {
        borderColor: "transparent",
        borderBottomColor: '#65CB87',
        borderStyle: 'solid',
    },
    chargingOptionsText: {
        paddingBottom: 10,
        fontSize: 24,
        color: '#65CB87',
        fontWeight: 'bold',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowRadius: 2
    },
    refreshText: {
        marginLeft: 160,
        paddingTop: 5,
        paddingBottom: 5,
        fontSize: 18,
        color: '#65CB87',
        fontWeight: 'bold',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowRadius: 5
    },  
    chargeToggleButton: {
        paddingTop: 10,
        fontSize: 24,
        color: '#65CB87',
        fontWeight: 'bold',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowRadius: 2
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
        fontWeight: 'bold',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowRadius: 2
    },
    selectionChargeTime: {
        color:'black',
        position:"absolute",
        top:20,
        fontWeight: 'bold',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowRadius: 2
    },
    selectionEndTime: {
        color:'black',
        position:"absolute",
        top:40,
        fontWeight: 'bold',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowRadius: 2
    },
    selectionImgMoney: {
        position: 'absolute',
        width: 40,
        height: 40,
        marginLeft: 230,
        top: 15,
    },
    selectionImgTree: {
        position:'absolute',
        width: 42,
        height: 42,
        marginLeft: 280,
        top: 15,
    }
})