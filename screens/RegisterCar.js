import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {Picker} from '@react-native-community/picker'; // https://github.com/react-native-community/react-native-picker
import Background from '../components/Background';
import Logo from '../assets/registerIcons/logo.png';
import EVIE from '../assets/registerIcons/finalLogo.png';

export default function RegisterCar({navigation}){
    
    const [nickname, setNickname] = useState("");
    const [manufacturer, setManufacturer] = useState("");
    const [model, setModel] = useState("");
    const [year, setYear] = useState("");
    const [selectedStartTime, setStartTime] = useState("");
    const [selectedEndTime, setEndTime] = useState("");
    const [selectedValue, setSelectedValue] = useState("AM");
    const [selectedValue2, setSelectedValue2] = useState("AM");
    
    // const axios Post Implementation


    return(
        <View style={styles.container}>
            <Background/>
            <Image source={Logo} style={styles.logo}/>
            <Image source={EVIE} style={styles.evie}/>
            <View style={styles.inputContainer}>
                <View style={styles.infoView}>
                    <Text style={styles.inputText}>Car Nickname</Text>
                    <TextInput
                        style={styles.input}
                        value={nickname}
                        onChangeText={(val) => setNickname(val)}
                        placeholder={"Nickname"}
                        placeholderTextColor="black"
                    />
                </View>
                <View style={styles.infoView}>
                    <Text style={styles.inputText}>Car Manufacturer</Text>
                    <TextInput
                        style={styles.input}
                        value={manufacturer}
                        onChangeText={(val) => setManufacturer(val)}
                        placeholder={"Manufacturer"}
                        placeholderTextColor="black"
                    />
                </View>
                <View style={styles.infoView}>
                    <Text style={styles.inputText}>Car Model</Text>
                    <TextInput
                        style={styles.input}
                        value={model}
                        onChangeText={(val) => setModel(val)}
                        placeholder={"Model"}
                        placeholderTextColor="black"
                    />
                </View>
                <View style={styles.infoView}>
                    <Text style={styles.inputText}>Car Year</Text>
                    <TextInput
                        style={styles.input}
                        value={year}
                        onChangeText={(val) => setYear(val)}
                        placeholder={"Year"}
                        placeholderTextColor="black"
                    />
                </View>
                <TouchableOpacity 
                    style={styles.btnCancel}
                    onPress={() => navigation.navigate("RegisterPlan")}
                >
                    <View>
                        <Text style={styles.cancelText}>Back</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.btnSubmit}
                    onPress={() => {
                        if(nickname != "" && manufacturer != "" && model != "" && year != ""){
                            navigation.navigate("RegisterChargeTimes")
                        }
                    }}
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
        top: 15,
        paddingTop: 10,
        paddingBottom: 80,
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
        backgroundColor: "transparent"
    },
    inputText: {
        alignSelf: "flex-start",
        fontSize: 20,
        left: 7,
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
        bottom: 20,
        left: 28,
        padding: 10,
        borderWidth: 2,
        borderRadius: 10,
        borderColor: "red"
    },
    btnSubmit: {
        position: 'absolute',
        bottom: 20,
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