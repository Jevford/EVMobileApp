import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {Picker} from '@react-native-community/picker'; // https://github.com/react-native-community/react-native-picker
import Background from '../components/Background';
import Logo from '../assets/registerIcons/logo.png';
import EVIE from '../assets/registerIcons/finalLogo.png';

export default function RegisterPlan({route, navigation}){
    
    const { user } = route.params;
    const [zipcode, setZipcode] = useState("");
    const [provider, setProvider] = useState("SoCalEdison");
    const [plan, setPlan] = useState("");
    
    return(
        <View style={styles.container}>
            <Background/>
            <Image source={Logo} style={styles.logo}/>
            <Image source={EVIE} style={styles.evie}/>
            <View style={styles.inputContainer}>
                <View style={styles.infoView}>
                    <View style={styles.startTimeView}>
                        <View style={styles.inputProvider}/>
                    </View>
                    <View style={styles.inputView}>
                        <Text style={styles.inputProviderText}>Select Energy Provider</Text>
                        <Picker
                            selectedValue={provider}
                            style={styles.providerPickerView}
                            onValueChange={(itemValue, itemIndex) => setProvider(itemValue)}
                        >
                            <Picker.Item label="SoCalEdison" value="SoCalEdison"/>
                            <Picker.Item label="PG&E" value="PG&E" />
                            <Picker.Item label="SDG&E" value="SDG&E" />
                        </Picker>
                    </View>
                </View>
                <View style={styles.infoView}>
                    <Text style={styles.inputPlanText}>Enter Your Energy Plan</Text>
                    <TextInput
                        style={styles.input}
                        value={plan}
                        onChangeText={(val) => setPlan(val)}
                        placeholder={"Energy Plan"}
                        placeholderTextColor="black"
                    />
                </View>
                <View style={styles.infoView}>
                    <Text style={styles.inputText}>Enter Your Zipcode</Text>
                    <TextInput
                        style={styles.input}
                        value={zipcode}
                        onChangeText={(val) => setZipcode(val)}
                        placeholder={"Zipcode"}
                        placeholderTextColor="black"
                    />
                </View>
                <TouchableOpacity 
                    style={styles.btnCancel}
                    onPress={() => navigation.navigate("RegisterUser")}
                >
                    <View>
                        <Text style={styles.cancelText}>Back</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.btnSubmit}
                    onPress={() => {
                        if(zipcode != "" && plan != ""){
                            navigation.navigate("RegisterCar", {
                                user: user,
                                zipcode: zipcode,
                                provider: provider
                            })
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
        top: 35,
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
    inputProvider: {
        justifyContent: 'space-around',
        borderWidth: 3,
        borderRadius: 10,
        borderColor: 'black',
        textAlign: 'left',
        padding: 23,
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
    pickerView: {
        justifyContent: 'space-around',
        borderWidth: 3,
        borderRadius: 10,
        borderColor: 'black',
        textAlign: 'left',
        padding: 8,
        margin: 5,
        left: -10,
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
        left: -17,
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
        left: -60,
        color: "black",
        fontWeight: "bold"
    },
    inputPlanText: {
        fontSize: 20,
        left: -40,
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