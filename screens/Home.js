/*
    Big Dog of all the screens in this app project
    Don't fear it's fairly simple as it separates concerns in different function
    Yes there's a ton of lines, no worries we like to space stuff around :D
*/

import React, { Component } from 'react';
import {View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Dimensions, Alert} from 'react-native';
import axiosInstance from '../components/axiosInstance';
import Client from '../mqtt/mqttInstance';

// Header component for displaying the hamburger menu and user icon
import Header from '../components/Header'

// Background component to show a nice background 
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

/* 
    Component that displays the user's connected charger, display status of charging state, selectable charging options, start charge button
*/
export default class Home extends Component {
    // Constructor was needed here since you need access to react native prop parameters from different screens
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

    // Class variables that initialized beforehand
    // Create a new mqttInstance object
    mqttClient = new Client()

    // Boolean check to see if a chargeRequest was already posted to the database
    createdChargeRequestFlag = false;

    // Initial evseID (Physical Charger's ID actually), used as backupup user did not specify or have a stored evseID in their profile record
    evseID = this.mqttClient.deviceID

    // Default attributes in case of no data found in userprofile record in the database
    readyByTime = 5
    make = ""
    model = ""

    // Lists of Images, made things easier by calling specific images by index instead of their import names
    vehicleImages = [Idle, Charging];
    piggybanks = [money0, money1, money2, money3, money4, money5];
    trees = [tree0, tree1, tree2, tree3, tree4, tree5];

    // Initializes the user's information if a new account was created to reach the Home screen
    initializeUserInfo = () => {
        if (this.props.route.params != undefined) {
            this.evseID = this.props.route.params.evseID

            this.make = this.props.route.params.make
            this.make = this.make.toUpperCase()

            this.model = this.props.route.params.model
            this.model = this.model.toUpperCase()

            let endtime = this.props.route.params.endtime
            // Parsing an endtime string (example: "8:00 AM") => (int) 8
            endtime = endtime.split(":")[0]
            endtime = parseInt(endtime)
            this.readyByTime = endtime
        }
    }
    
    // Once a component is initialized (doesnt have to be shown on screen), calls these methods beforehand
    componentDidMount = () => {
        // requests the state of the connected charger
        this.mqttClient.requestChargeState()

        // Gets the charge options from chargerSchedule collection in the database
        this.getData()
    }

    // Helpfer function to return a random index for the charge options acquired from the database
    random = () => {
        return Math.floor(Math.random() * this.state.dbOptions.length);
    }

    // Conversion of a float to an int with 5 being the max returned int, used for determining the int value of a pref from the chareSchedule option
    floatToInt = (num) => {
        if (num >= 4.5)
            return 5;
        return Math.round(num);
    }

    // Refreshes the options shown on the Home Page
    refreshOptions = () => {
        let selection1 = this.random();
        let selection2 = this.random();
        let selection3 = this.random();

        this.setState({
            myOptions: {
                option1: {
                    index: selection1,
                    id: this.state.dbOptions[selection1]["schedule_id"],
                    label: this.state.dbOptions[selection1]["characteristic"],
                    charge: this.state.dbOptions[selection1]["chargeTime"].toFixed(2) + " hours",
                    ready: this.state.dbOptions[selection1]["scheduleEndTime"] + ":00",
                    save: this.piggybanks[this.floatToInt(this.state.dbOptions[selection1]["save"])],
                    tree: this.trees[this.floatToInt(this.state.dbOptions[selection1]["tree"])]
                },
                option2: {
                    index: selection2,
                    id: this.state.dbOptions[selection2]["schedule_id"],
                    label: this.state.dbOptions[selection2]["characteristic"],
                    charge: this.state.dbOptions[selection2]["chargeTime"].toFixed(2) + " hours",
                    ready: this.state.dbOptions[selection2]["scheduleEndTime"] + ":00",
                    save: this.piggybanks[this.floatToInt(this.state.dbOptions[selection2]["save"])],
                    tree: this.trees[this.floatToInt(this.state.dbOptions[selection2]["tree"])]
                },
                option3: {
                    index: selection3,
                    id: this.state.dbOptions[selection3]["schedule_id"],
                    label: this.state.dbOptions[selection3]["characteristic"],
                    charge: this.state.dbOptions[selection3]["chargeTime"].toFixed(2) + " hours",
                    ready: this.state.dbOptions[selection3]["scheduleEndTime"] + ":00",
                    save: this.piggybanks[this.floatToInt(this.state.dbOptions[selection3]["save"])],
                    tree: this.trees[this.floatToInt(this.state.dbOptions[selection3]["tree"])]
                }
            },

            // Boolean flags set for options to false, so that they are not highlighted anymore
            option1flag: false,
            option2flag: false,
            option3flag: false,

            // After a single refresh, makes this boolean var true, so that this.getData() does not refresh the options itself
            loadOptionsFlag: true
        })
    }

    // Labels each option shown based on the pref value received from the schedule collection
    labelOptions = () => { // env, cos, soc <- this is the order that prefs come in from the database
        for(i = 0; i < this.state.dbOptions.length; ++i) {
            if(this.state.dbOptions[i]["eco_pref"] > 0.5){
                this.state.dbOptions[i]["characteristic"] = "Save Environment";
            }    
            else if(this.state.dbOptions[i]["cos_pref"] > 0.5){
                this.state.dbOptions[i]["characteristic"] = "Save Money";
            } 
            else if(this.state.dbOptions[i]["soc_pref"] > 0.5){
                this.state.dbOptions[i]["characteristic"] = "Reduce Societal Impact";
            }
            else if(this.state.dbOptions[i]["eco_pref"] > 0.33 && this.state.dbOptions[i]["cos_pref"] > 0.33){
                this.state.dbOptions[i]["characteristic"] = "Save Money and Environment";
            }
            else if(this.state.dbOptions[i]["eco_pref"] > 0.33 && this.state.dbOptions[i]["soc_pref"] > 0.33){
                this.state.dbOptions[i]["characteristic"] = "Reduce Soc Impact and Save Env";
            }
            else if(this.state.dbOptions[i]["cos_pref"] > 0.33 && this.state.dbOptions[i]["soc_pref"] > 0.33){
                this.state.dbOptions[i]["characteristic"] = "Reduce Soc Impact and Save Money";
            }  
            else
                this.state.dbOptions[i]["characteristic"] = "Balanced Savings";
        }
    }

    // Method that highlights or makes transparent when an option is touched
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

    // Determines which option was selected and sets their boolean value
    setOptionFlag = (option) => {
        if(option === 'option1' && !this.state.option1flag){
            this.setState({
                option1flag: true,
                option2flag: false,
                option3flag: false
            })
        }
        else if(option === 'option2' && !this.state.option2flag){
            this.setState({
                option1flag: false,
                option2flag: true,
                option3flag: false
            })
        }
        else if(option === 'option3' && !this.state.option3flag){
            this.setState({
                option1flag: false,
                option2flag: false,
                option3flag: true
            })
        }
        else {
            // This setSate means that a selected option was touched again, thus setting all options to false (transparent)
            this.setState({
                option1flag: false,
                option2flag: false,
                option3flag: false
            })
        }
    }

    /* 
        THIS NOT SUPPOSED TO BE HOW THE MOBILE APP WORKS FOR THE CHARGE BUTTON
        For the purposes of our live demonstration, we made the mobile app send an mqtt topic to toggle the physical on/off
        to show the lights turn on and off

        The actual implementation of the charge button will simply send a signal to the coordinator to ask for the charger to start charging
        Please remove this function once your team has interfaced with the coordinator
        Best of Luck :)
    */
    toggleButtonFunction = async () => {
        if(this.mqttClient.chargerRelayState == 0)
            await this.mqttClient.toggleChargerOn()
        else if(this.mqttClient.chargerRelayState == 1)
            await this.mqttClient.toggleChargerOff()
    }

    // Method that changes the label of the charger status display and the car icon
    setChargeOption = async () => {

        /* 
            Remove once interfaced with the Optimizer
            You will need to figure out how to change the icon and label
            Idea: read the charger state from the chargerSchema once the Optimizer has the capability to change a specific EVSEID record in the database
        */
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
            // Alert will appear because the charger was unable to send a topic through the MQTT broker to confirm it is connected online
            Alert.alert(
                "Your Charger Is Not Connected Online",
                "Please make sure your charger is on and able to access the internet"
            )
        }
    }
    
    // Axios method to retrieve charge option from chargeSchedule collection
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

    /* 
        Axios method update a specific chargeSchema record with the current selection option's data
        If you charge without selection an option, the prefs, readyby, and optimize attributes within this charger's record in the databse will be 0
        Pretty much no selected option but the user clicks charge now, means to default charge without optimization
    */
    updateChargerSchedule = async () => {
        const insert = {
            "evse_id": this.mqttClient.deviceID
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
            "schedule_id": id 
        }

        let insertData = JSON.stringify(insert);
        let paramData = JSON.stringify(param);
        const data = `collection=chargeSchedule&param=${paramData}&data=${insertData}`;

        const config = axiosInstance({
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        });

        await axiosInstance.post('/update.php', data, config)
            .then((data) => {
                // console.log(data);
            })
            .catch((err) => {
                // console.log(err);
            })
    }

    // Axios method that posts a chargerSchema record into the database
    postChargerSchema = async () => {
        let scheduleID = "NULL", env = 0.0, cos = 0.0, soc = 0.0, readyby = 0, totalcapacity = 20000, usablecapacity = 20000, level = 1, connected = 0, optimized = 0

        // Conditionals to check an LV 1 or LV 2 Car (Just checks for chevy bolt or tesla model 3 as of now)
        if (this.make == "CHEVY" && this.model == "BOLT"){
            level = 1
            usablecapacity = Math.floor(Math.random() * 20000)
        }

        if (this.make == "TESLA" && this.model == "MODEL 3"){
            level = 2
            totalcapacity = 76000
            usablecapacity = Math.floor(Math.random() * 76000)
        }

        // Conditional to check if Charger is Connected Online
        if (this.mqttClient.chargeState != 0) {
            connected = 1
        }

        // Conditionals to pass which chosen option
        if (this.state.option1flag) {
            let index = this.state.myOptions.option1.index;
            scheduleID = this.state.myOptions.option1.id;
            env = this.state.dbOptions[index]["eco_pref"];
            cos = this.state.dbOptions[index]["cos_pref"];
            soc = this.state.dbOptions[index]["soc_pref"];
            readyby = this.state.dbOptions[index]["scheduleEndTime"];
            optimized = 1;
        }
        else if (this.state.option2flag) {
            let index = this.state.myOptions.option2.index;
            scheduleID = this.state.myOptions.option2.id;
            env = this.state.dbOptions[index]["eco_pref"];
            cos = this.state.dbOptions[index]["cos_pref"];
            soc = this.state.dbOptions[index]["soc_pref"];
            readyby = this.state.dbOptions[index]["scheduleEndTime"];
            optimized = 1;
        }
        else if (this.state.option3flag) {
            let index = this.state.myOptions.option3.index;
            scheduleID = this.state.myOptions.option3.id;
            env = this.state.dbOptions[index]["eco_pref"];
            cos = this.state.dbOptions[index]["cos_pref"];
            soc = this.state.dbOptions[index]["soc_pref"];
            readyby = this.state.dbOptions[index]["scheduleEndTime"];
            optimized = 1;
        }

        

        const insert = {
            // "evse_id": this.mqttClient.deviceID, <- this was used as a default value if the evseID was not found
            "evse_id": this.evseID,
            "schedule_id": scheduleID,
            "vehicleChargerlevel": level,
            "maxChargerCurrent": 40,
            "maxVehicleChargingCurrent": 40,
            "eco_pref": env,
            "cos_pref": cos,
            "soc_pref": soc,
            "vehicletotalcapacity": totalcapacity,
            "vehicleUsableCapacity": usablecapacity,
            "optimized": optimized,
            "readyBy": readyby,
            "connected": connected,
            "charging": 0,
            "errorCode": 0,
            "currentChargeRate": 40
        }


        let insertData = JSON.stringify(insert);
        const data = `collection=chargerSchema&data=${insertData}`;
        // const del = `collection=chargerSchema&param={"evse_id":"${this.mqttClient.deviceID}"}`; <- Same situation as mentioned above
        const del = `collection=chargerSchema&param={"evse_id":"${this.evseID}"}`;
        // console.log("EVSEID: " + this.evseID)

        const config = axiosInstance({
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        });

        // This post call, deletes the former chargeSchema with the same evseID
        await axiosInstance.post('/delete.php', del, config)
            .then((data) => {
                // console.log(data);
            })
            .catch((err) => {
                // console.log(err);
            })
        
        /* 
            This post call inserts the new (updated) chargerSchema record....Yes I know you could use the axios.patch() method
            Vinh didnt implement that in the database REST API calls :( , so do it this way on how to "update" records
        */
        await axiosInstance.post('/insert.php', data, config)
            .then((data) => {
                // console.log(data);
            })
            .catch((err) => {
                // console.log(err);
            })

    }

    // Axios method that "updates" a chargeRequest record in the database if the charger was confirmed to be connected online
    postToChargeRequest = async () => {
        let timestamp = new Date().toISOString();

        const insert = {
            "timestamp": timestamp,
            "endtime": this.readyByTime,
            "scheduled": 0,
            "evse_id": this.evseID
        }

        let insertData = JSON.stringify(insert);
        const data = `collection=chargeRequest&data=${insertData}`;
        const del = `collection=chargeRequest&param={"evse_id":"${this.evseID}"}`;

        const config = axiosInstance({
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        });

        // As you can see, this is how we "update", as mentioned in the previous method
        await axiosInstance.post('/delete.php', del, config)
            .then((data) => {
                // console.log(data);
            })
            .catch((err) => {
                // console.log(err);
            })

        await axiosInstance.post('/insert.php', data, config)
            .then((data) => {
                // console.log(data);
            })
            .catch((err) => {
                // console.log(err);
            })
    }


    render() {
        // console.log(this.props) <- Used for debugging what was contained the props passed in the constructor
        this.initializeUserInfo();
        if (this.mqttClient.connectFlag && !this.createdChargeRequestFlag && this.mqttClient.chargeState != 0){
            this.postToChargeRequest()
            this.createdChargeRequestFlag = true
        }

        return (
            <ScrollView stickyHeaderIndices={[0]} showsVerticalScrollIndicator={false}>
                <Header title='Home'/>
                <Background/>
                <View style={styles.container}>
                    <View style={styles.containerCharger}>
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
                                                    this.postChargerSchema()
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

// This is a long StyleSheet, but it's not hard to find the specific ids
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