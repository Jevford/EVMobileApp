import React, {Component, useState} from 'react';
import {Alert, Button, View, Text, TextInput, StyleSheet} from 'react-native';
import Header from '../components/Header';
import axiosInstance from '../components/axiosInstance';
import Background from '../components/Background'
import { ScrollView } from 'react-native-gesture-handler';

// Component asks the user details on a charger to add to their profile of past connected chargers
export default class ChargerAdd extends Component {
    state = {
        evse: '',
        level: '',
        current: '',
        type: '',
        provider: '',
        zip: '',
    }

    // Axios method to post a new charger record in charger collection in the database
    postData = async () => {
        const insert = {
            "evseid":this.state.evse, 
            "defaultEVSELevel":this.state.level, 
            "maxcircuitcurrent":this.state.current, 
            "EVinterfacetype":this.state.type,
            "electricalprovider":this.state.provider.replace("&", "%26"),
            "zip":parseInt(this.state.zip),
            "chargerState": "Not Charging", // default value
            "completionStatus": "N/A", // default value
            "chargerOption": "Charge Now" // default value
        }

        let insertData = JSON.stringify(insert);
        const data = `collection=chargers&data=${insertData}`;

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
        
        Alert.alert('Charger Added!');

        // Go back to the Charger Page once a new car is added
        this.props.navigation.reset({routes: [{ name: 'Charger' }],});
    }

    // Renders the page elements on the screen, like html
    render() {
        return (
            <View style={styles.container}>
                <Header title='Add a Charger'/>
                <Background/>
                <ScrollView>
                    <View style={styles.container}>

                        <View style={styles.container}>
                            <Text style={styles.headingText}>Charger Information</Text>
                            <View style={styles.infoView}>
                                <Text style={styles.infoTextLeft}>EVSE ID</Text>
                                <TextInput
                                    style={styles.input}
                                    onChangeText={(val) => this.setState({evse: val})}
                                    value={this.state.evse}
                                />
                            </View>
                            <View style={styles.infoView}>
                                <Text style={styles.infoTextLeft}>Default EVSE Level</Text>
                                <TextInput
                                    style={styles.input}
                                    onChangeText={(val) => this.setState({level: val})}
                                    value={this.state.level}
                                />
                            </View>
                            <View style={styles.infoView}>
                                <Text style={styles.infoTextLeft}>Max Current</Text>
                                <TextInput
                                    style={styles.input}
                                    onChangeText={(val) => this.setState({current: val})}
                                    value={this.state.current}
                                />
                            </View>
                            <View style={styles.infoView}>
                                <Text style={styles.infoTextLeft}>EV Interface Type</Text>
                                <TextInput
                                    style={styles.input}
                                    onChangeText={(val) => this.setState({type: val})}
                                    value={this.state.type}
                                />
                            </View>
                            <View style={styles.infoView}>
                                <Text style={styles.infoTextLeft}>Provider</Text>
                                <TextInput
                                    style={styles.input}
                                    onChangeText={(val) => this.setState({provider: val})}
                                    value={this.state.provider}
                                />
                            </View>
                            <View style={styles.infoView}>
                                <Text style={styles.infoTextLeft}>Zip</Text>
                                <TextInput
                                    style={styles.input}
                                    onChangeText={(val) => this.setState({zip: val})}
                                    value={this.state.zip}
                                />
                            </View>
                            <View style={styles.buttonContainer}>
                                <View style={{width: "50%"}}>
                                    <Button
                                    title="Go Back"
                                    color="#f04646"
                                    onPress={() => this.props.navigation.goBack()}
                                    />
                                </View>
                                <View style={{width: "50%"}}>
                                    <Button
                                    title="Add"
                                    onPress={this.postData}
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
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    optionsContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 100,
        marginHorizontal: 10,
        paddingBottom: 20,
    },
    button: {
        fontSize: 24,
        alignItems: "center",
        backgroundColor: "blue",
        borderWidth: 1,
        padding: 10,
        width: 300,
        height: 40,
    },
    headingText: {
        paddingTop: 100,
        paddingBottom: 30,
        fontSize: 24,
        color: '#999999',
    },
    infoTextLeft: {
        flex: 1,
        textAlign: 'left',
        paddingTop: 15,
        paddingLeft: 16,
        fontSize: 18,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#777',
        textAlign: 'right',
        padding: 8,
        margin: 10,
        width: 200,
        paddingTop: 15,
        paddingRight: 16,
        fontSize: 18,
    },
    infoView: {
        flexDirection: 'row',
    },
})