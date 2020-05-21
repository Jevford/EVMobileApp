import React, {Component} from 'react';
import {Alert, Button, View, Text, StyleSheet, SafeAreaView, TouchableOpacity} from 'react-native';
import {Picker} from '@react-native-community/picker'; // https://github.com/react-native-community/react-native-picker
import Header from '../components/Header';
import { ScrollView } from 'react-native-gesture-handler';
import axiosInstance from '../components/axiosInstance';
import Background from '../components/Background'

export default class Vehicles extends Component {
    state = {
        chargerData: '',
        index: 0,
        charger: '',
        evse: '',
        voltage: '',
        output: '',
        plug_type: '',
        provider: '',
        zip: ''
    };

    setChargers = (value, index) => {
        this.setState({
            index: index,
            charger: value,
            evse: this.state.chargerData[index]["evseid"],
            voltage: this.state.chargerData[index]["voltage"],
            output: this.state.chargerData[index]["output"],
            plug_type: this.state.chargerData[index]["plugType"],
            provider: this.state.chargerData[index]["provider"],
            zip: this.state.chargerData[index]["zip"]
        })
    }

    initChargers = () => {
        this.setState({
            evse: this.state.chargerData[this.state.index]["evseid"],
            voltage: this.state.chargerData[this.state.index]["voltage"],
            output: this.state.chargerData[this.state.index]["output"],
            plug_type: this.state.chargerData[this.state.index]["plugType"],
            provider: this.state.chargerData[this.state.index]["provider"],
            zip: this.state.chargerData[this.state.index]["zip"]
        })
    }

    getData = async () => {
        if (this.state.chargerData === ''){
            let res = await axiosInstance.get(
                '/api.php',
                {params : {version: 1, collection : 'chargers'}}
                )
            this.setState({chargerData: res.data});
            this.initChargers();
        }
    }

    chargerList = () => {
        return( Object.keys(this.state.chargerData).map( (x,i) => { 
            var charger_label = `Charger ${parseInt(x)+1}`;
            return( <Picker.Item label={charger_label} key={x} value={i}  />)} ));
    }

    // postData = async () => {
    //     const insert = {
    //         "evse_id":"US*B25*E3SS*PPK", 
    //         "voltage":"LV 1", 
    //         "output":"18 Amps", 
    //         "plugType":"J1772",
    //         "provider":"SoCal Edison",
    //         "zip":"91612"
    //     }
    //     let insertData = JSON.stringify(insert);
    //     const data = `collection=chargers&data=${insertData}`;

    //     const config = axiosInstance({
    //         headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    //     });

    //     await axiosInstance.post('/insert.php', data, config)
    //         .then((data) => {
    //             console.log(data);
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         })
        
    //     Alert.alert('Charger Added!');
    // }

    render() {
        // connect to backend
        this.getData();

        return (
            <View style={styles.container}>
                <Header title='Charger'/>
                <Background/>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.container}>
                        <View style={styles.container}>
                            <Text style={styles.headingText}>Select a Charger</Text>
                            <Picker
                            selectedValue={this.state.charger}
                            style={{height: 75, width: 200}}
                            onValueChange={(itemValue, itemIndex) =>
                                this.setChargers(itemValue, itemIndex)
                            }>
                                {this.chargerList()}
                            </Picker>
                        </View>

                        <View style={styles.container}>
                            <Text style={styles.headingText}>Charger Information</Text> 
                            <View style={styles.infoView}>
                                <Text style={styles.infoTextLeft}>EVSE ID</Text>
                                <Text style={styles.infoTextRight}>{this.state.evse}</Text>
                            </View>
                            <View style={styles.infoView}>
                                <Text style={styles.infoTextLeft}>Voltage</Text>
                                <Text style={styles.infoTextRight}>{this.state.voltage}</Text>
                            </View>
                            <View style={styles.infoView}>
                                <Text style={styles.infoTextLeft}>Output</Text>
                                <Text style={styles.infoTextRight}>{this.state.output}</Text>
                            </View>
                            <View style={styles.infoView}>
                                <Text style={styles.infoTextLeft}>Plug Type</Text>
                                <Text style={styles.infoTextRight}>{this.state.plug_type}</Text>
                            </View>
                        </View>

                        <View style={styles.container}>
                            <Text style={styles.headingText}>Location Information</Text>
                            <View style={styles.infoView}>
                                <Text style={styles.infoTextLeft}>Service Provider</Text>
                                <Text style={styles.infoTextRight}>{this.state.provider}</Text>
                            </View>
                            <View style={styles.infoView}>
                                <Text style={styles.infoTextLeft}>Zip Code</Text>
                                <Text style={styles.infoTextRight}>{this.state.zip}</Text>
                            </View>
                        </View>
                        
                        <View style={styles.optionsContainer}>
                            <Text style={styles.headingText}>Charger Options</Text>
                            <View style={styles.buttonContainer}>
                                <View style={{width: "33%"}}>
                                    <Button
                                    title="Remove"
                                    color="#f04646"
                                    onPress={() => Alert.alert('Charger Removed')}
                                    />
                                </View>
                                <View style={{width: "33%"}}>
                                    <Button
                                    title="Add"
                                    onPress={() => this.props.navigation.navigate('chargerAdd')}
                                    />
                                </View>
                                <View style={{width: "33%"}}>
                                    <Button
                                    title="Edit"
                                    color="#a8329e"
                                    onPress={() => Alert.alert('Edit your Charger parameters')}
                                    />
                                </View>
                            </View>
                        </View>

                    </View>
                </ScrollView>
            </View> 
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    optionsContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    buttonContainer: {
        marginTop: 20,
        marginHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    headingText: {
        paddingTop: 10,
        fontSize: 24,
        color: '#999999',
    },
    infoTextLeft: {
        flex: 1,
        textAlign: 'left',
        paddingTop: 15,
        paddingLeft: 30,
        fontSize: 18,
    },
    infoTextRight: {
        flex: 1,
        textAlign: 'right',
        paddingTop: 15,
        paddingRight: 30,
        fontSize: 18,
    },
    infoView: {
        flexDirection: 'row',
    },
})