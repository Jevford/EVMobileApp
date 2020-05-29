import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {Picker} from '@react-native-community/picker'; // https://github.com/react-native-community/react-native-picker
import Background from '../components/Background';
import Logo from '../assets/registerIcons/logo.png';
import EVIE from '../assets/registerIcons/finalLogo.png';

export default function RegisterChargeTimes({navigation}){
    
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
                    <View style={styles.startTimeView}>
                        <TextInput
                            style={styles.input}
                            onChangeText={(val) => setStartTime(val)}
                            value={selectedStartTime}
                            placeholder={"Start"}
                            placeholderTextColor="black"
                        />
                    </View>
                    <View style={styles.inputView}>
                        <Text style={styles.inputText}>Charge Start Time</Text>
                        <Picker
                            selectedValue={selectedValue}
                            style={styles.pickerView}
                            onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                        >
                            <Picker.Item label="AM" value="AM"/>
                            <Picker.Item label="PM" value="PM" />
                        </Picker>
                    </View>
                </View>
                <View style={styles.infoView}>
                    <View style={styles.startTimeView}>
                        <TextInput
                            style={styles.input}
                            onChangeText={(val) => setEndTime(val)}
                            value={selectedEndTime}
                            placeholder={"End"}
                            placeholderTextColor="black"
                        />
                    </View>
                    <View style={styles.inputView}>
                        <Text style={styles.inputText}>Charge End Time</Text>
                        <Picker
                            selectedValue={selectedValue2}
                            style={styles.pickerView2}
                            onValueChange={(itemValue, itemIndex) => setSelectedValue2(itemValue)}
                        >
                            <Picker.Item label="AM" value="AM"/>
                            <Picker.Item label="PM" value="PM" />
                        </Picker>
                    </View>
                </View>
                <TouchableOpacity 
                    style={styles.btnCancel}
                    onPress={() => navigation.navigate("RegisterCharger")}
                >
                    <View>
                        <Text style={styles.cancelText}>Back</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.btnSubmit}
                    onPress={() => {
                        if(selectedStartTime != "" && selectedEndTime != ""){
                            navigation.popToTop()
                            navigation.navigate("Home")
                        }
                    }}
                >
                    <View>
                        <Text style={styles.submitText}>Submit</Text>
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
        paddingHorizontal: 30,
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
        width: 200,
        fontSize: 18,
        fontWeight: 'bold',
        color: "black"
    },
    infoView: {
        alignItems: 'center',
        backgroundColor: "transparent"
    },
    pickerView: {
        justifyContent: 'space-around',
        borderWidth: 3,
        borderRadius: 10,
        borderColor: 'black',
        textAlign: 'left',
        padding: 8,
        margin: 5,
        left: 40,
        width: 100,
        fontSize: 18,
        fontWeight: 'bold',
        color: "black"
    },
    pickerView2: {
        justifyContent: 'space-around',
        borderWidth: 3,
        borderRadius: 10,
        borderColor: 'black',
        textAlign: 'left',
        padding: 8,
        margin: 5,
        left: 37,
        width: 100,
        fontSize: 18,
        fontWeight: 'bold',
        color: "black"
    },
    providerPickerView: {
        padding: 8,
        margin: 5,
        left: -50,
        fontSize: 18,
        fontWeight: 'bold',
        color: "black",
    },
    startTimeView: {
        position: "absolute",
        top: 27
    },
    inputText: {
        fontSize: 20,
        left: -18,
        color: "black",
        fontWeight: "bold"
    },
    inputProviderText: {
        fontSize: 20,
        left: -40,
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
        left: 14,
        padding: 10,
        borderWidth: 2,
        borderRadius: 10,
        borderColor: "red"
    },
    btnSubmit: {
        position: 'absolute',
        bottom: 20,
        right: 15,
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