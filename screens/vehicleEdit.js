import React, {Component, useState} from 'react';
import {Alert, Button, View, Text, TextInput, StyleSheet, SafeAreaView, TouchableOpacity, TouchableHighlightBase} from 'react-native';
import {Picker} from '@react-native-community/picker'; // https://github.com/react-native-community/react-native-picker
import Header from '../components/Header';
import axiosInstance from '../components/axiosInstance';
import Background from '../components/Background'
import { ScrollView } from 'react-native-gesture-handler';

export default class vehicleAdd extends Component {
    // Initialization of class vars in state object
    state = {
        nickname: '',
        make: '',
        model: '',
        year: ''
    }

    // Method to post a vehicle record update into the database
    postData = async () => {
        const user = {"username":"demopass"}
        const insert = {
            "nickname":this.state.nickname, 
            "manufacturer":this.state.make, 
            "model":this.state.model, 
            "year":this.state.year
        }
        let insertData = JSON.stringify(insert);
        let userInfo = JSON.stringify(user);
        const data = `action=update&collection=cars&param=${userInfo}&data=${insertData}`;

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
        
        Alert.alert('Car Updated!');
        this.props.navigation.reset({routes: [{ name: 'Vehicles' }],});
    }

    // Main function that renders the page
    render() {
        return (
            <View style={styles.container}>
                <Header title='Edit a Vehicle'/>
                <Background/>
                <View style={styles.container}>

                    <View style={styles.container}>
                        <Text style={styles.headingText}>Select a Vehicle</Text>
                        <Picker
                        selectedValue={this.state.car}
                        style={{height: 75, width: 200}}
                        onValueChange={(itemValue, itemIndex) =>
                            this.setCars(itemValue, itemIndex)
                        }>
                            {this.carList(this.state.index)}
                        </Picker>
                    </View>

                    <View style={styles.container}>
                        <Text style={styles.headingText}>Vehicle Information</Text>
                        <View style={styles.infoView}>
                            <Text style={styles.infoTextLeft}>Nickname</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={(val) => this.setState({nickname: val})}
                                value={this.state.nickname}
                            />
                        </View>
                        <View style={styles.infoView}>
                            <Text style={styles.infoTextLeft}>Make</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={(val) => this.setState({make: val})}
                                value={this.state.make}
                            />
                        </View>
                        <View style={styles.infoView}>
                            <Text style={styles.infoTextLeft}>Model</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={(val) => this.setState({model: val})}
                                value={this.state.model}
                            />
                        </View>
                        <View style={styles.infoView}>
                            <Text style={styles.infoTextLeft}>Year</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={(val) => this.setState({year: val})}
                                value={this.state.year}
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