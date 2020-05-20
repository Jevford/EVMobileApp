import React, {Component, useState} from 'react';
import {Alert, Button, View, Text, TextInput, StyleSheet, SafeAreaView, TouchableOpacity, TouchableHighlightBase} from 'react-native';
import Header from '../components/Header';
import axiosInstance from '../components/axiosInstance';
import Background from '../components/Background'

export default class Vehicles extends Component {
    state = {
        nickname: '',
        make: '',
        model: '',
        year: ''
    }

    postData = async () => {
        const insert = {
            "nickname":this.state.nickname, 
            "manufacturer":this.state.make, 
            "model":this.state.model, 
            "year":this.state.year
        }
        let insertData = JSON.stringify(insert);
        const data = `collection=cars&data=${insertData}`;

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
        
        Alert.alert('Car Added!');
        this.props.navigation.goBack();
    }

    render() {
        return (
            <View style={styles.container}>
                <Header title='Add a Vehicle'/>
                <Background/>
                <View style={styles.container}>

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