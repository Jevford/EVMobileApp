import React, {Component, useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, Image, KeyboardAvoidingView} from 'react-native';
import {Picker} from '@react-native-community/picker'; // https://github.com/react-native-community/react-native-picker
import Background from '../components/Background';
import Logo from '../assets/registerIcons/logo.png';
import EVIE from '../assets/registerIcons/finalLogo.png';

export default function RegisterProfile({navigation}){
    
    var [firstName, setFirstName] = useState("")
    var [lastName, setLastName] = useState("")
    var [username, setUsername] = useState("");
    var [password, setPassword] = useState("");
    var [confirmPassword, setConfirmPassword] = useState("");
    
    
    return(
        <KeyboardAvoidingView
            behavior={"position"}
            keyboardVerticalOffset={-600}
            style={styles.container}
        >
            <View style={styles.container}>
                <Background/>
                <Image source={Logo} style={styles.logo}/>
                <Image source={EVIE} style={styles.evie}/>
                <View style={styles.inputContainer}>
                    <View style={styles.infoView}>
                        <Text style={styles.inputText}>First Name</Text>
                        <TextInput
                            style={styles.input}
                            value={firstName}
                            onChangeText={(val) => setFirstName(val)}
                            placeholder={"First Name"}
                            placeholderTextColor="black"
                        />
                    </View>
                    <View style={styles.infoView}>
                        <Text style={styles.inputText}>Last Name</Text>
                        <TextInput
                            style={styles.input}
                            value={lastName}
                            onChangeText={(val) => setLastName(val)}
                            placeholder={"Last Name"}
                            placeholderTextColor="black"
                        />
                    </View>
                    <View style={styles.infoView}>
                        <Text style={styles.inputText}>Username</Text>
                        <TextInput
                            style={styles.input}
                            value={username}
                            onChangeText={(val) => setUsername(val)}
                            placeholder={"Username"}
                            placeholderTextColor="black"
                        />
                    </View>
                    <View style={styles.infoView}>
                        <Text style={styles.inputText}>Password</Text>
                        <TextInput
                            style={styles.input}
                            value={password}
                            onChangeText={(val) => setPassword(val)}
                            secureTextEntry={true}
                            placeholder={"Password"}
                            placeholderTextColor="black"
                        />
                    </View>
                    <View style={styles.infoView}>
                        <Text style={styles.inputText}>Confirm Password</Text>
                        <TextInput
                            style={styles.input}
                            value={confirmPassword}
                            onChangeText={(val) => setConfirmPassword(val)}
                            secureTextEntry={true}
                            placeholder={"Password"}
                            placeholderTextColor="black"
                        />
                    </View>
                    <TouchableOpacity 
                        style={styles.btnCancel}
                        onPress={() => {
                            setFirstName("")
                            setLastName("")
                            setUsername("")
                            setPassword("")
                            setConfirmPassword("")
                            navigation.navigate("RegisterCharger")}}
                    >
                        <View>
                            <Text style={styles.cancelText}>Back</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.btnSubmit}
                        onPress={() => {
                            if(firstName != "" && lastName != "" && username != "" && password != "" && confirmPassword != "" && password == confirmPassword){
                                navigation.navigate("RegisterPlan")
                            }
                        }}
                    >
                        <View>
                            <Text style={styles.submitText}>Next</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    inputContainer: {
        borderWidth: 1,
        top: 30,
        paddingTop: 10,
        paddingBottom: 60,
        paddingHorizontal: 20,
        borderRadius: 10,
        backgroundColor: "rgba(110, 231, 110, 0.75)",
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,  
        elevation: 13
    },
    input: {
        justifyContent: 'space-around',
        borderWidth: 3,
        borderRadius: 10,
        borderColor: 'black',
        textAlign: 'left',
        padding: 8,
        margin: 5,
        width: 300,
        fontSize: 18,
        fontWeight: 'bold',
        color: "black"
    },
    infoView: {
        alignItems: 'center',
        backgroundColor: "transparent",
        paddingBottom: 0
    },
    inputText: {
        alignSelf: 'flex-start',
        fontSize: 17,
        left: 10,
        color: "black",
        fontWeight: "bold"
    },
    logo: {
        position: 'absolute',
        top: 390,
        width: 500,
        height: 500,
    },
    evie: {
        position: 'absolute',
        top: -190,
        left: -69,
        width: 500,
        height: 500,
    },
    btnCancel: {
        position: 'absolute',
        bottom: 8,
        left: 28,
        padding: 10,
        borderWidth: 2,
        borderRadius: 10,
        borderColor: "red"
    },
    btnSubmit: {
        position: 'absolute',
        bottom: 8,
        right: 25,
        padding: 10,
        borderWidth: 2,
        borderRadius: 10,
        borderColor: "green"
    },
    cancelText: {
        color: "red",
        fontSize: 20,
        fontWeight: "bold"
    },
    submitText: {
        color: "green",
        fontSize: 20,
        fontWeight: "bold"
    }
})