import React, {Component, useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, Image} from 'react-native';
import Background from '../components/Background';
import Logo from '../assets/registerIcons/logo.png';
import EVIE from '../assets/registerIcons/finalLogo.png';

export default function RegisterCharger({navigation}){
    
    var [idText, setidText] = useState("");
    

    return(
        <View style={styles.container}>
            <Background/>
            <Image source={Logo} style={styles.logo}/>
            <Image source={EVIE} style={styles.evie}/>
            <View style={styles.inputContainer}>
                <View style={styles.infoView}>
                    <Text style={styles.inputText}>Enter Your EVSE ID</Text>
                    <TextInput
                        style={styles.input}
                        value={idText}
                        onChangeText={(val) => setidText(val)}
                        placeholder={"EVSE ID"}
                        placeholderTextColor="black"
                    />
                </View>
                <TouchableOpacity 
                    style={styles.btnCancel}
                    onPress={() => navigation.navigate("LoginPage")}
                >
                    <View>
                        <Text style={styles.cancelText}>Cancel</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.btnSubmit}
                    onPress={() => {
                        if(idText != ""){
                            navigation.navigate("RegisterUser", {
                                evseID: idText
                            })
                        }}
                    }
                >
                    <View>
                        <Text style={styles.submitText}>Next</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    inputContainer: {
        borderWidth: 1,
        paddingTop: 10,
        paddingBottom: 69,
        paddingHorizontal: 20,
        borderRadius: 10,
        backgroundColor: "rgba(110, 231, 110, 0.75)",
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,  
        elevation: 10
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
        backgroundColor: "transparent"
        // justifyContent: 'center'
    },
    inputText: {
        fontSize: 20,
        left: -60,
        color: "black",
        fontWeight: "bold"
    },
    logo: {
        position: 'absolute',
        bottom: -150,
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
        top: 100,
        left: 26,
        padding: 10,
        borderWidth: 2,
        borderRadius: 10,
        borderColor: "red"
    },
    btnSubmit: {
        position: 'absolute',
        top: 100,
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