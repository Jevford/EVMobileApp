import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, Image, AsyncStorage} from 'react-native';
import Background from '../components/Background';
import Logo from '../assets/registerIcons/logo.png';
import EVIE from '../assets/registerIcons/finalLogo.png';

// Component that greets the user on initial app startup, asks to login or create a new account (userprofile)
// If you are logging in, please use a valid username stored in the userprofile collection in the database
// Otherwise create a new account, and use that same username from then on
export default function LoginPage({navigation}){
    
    // Class state vars initialization
    var [username, setUsername] = useState("");
    var [password, setPassword] = useState("");

    return(
        <View style={styles.container}>
            <Background/>
            <Image source={Logo} style={styles.logo}/>
            <Image source={EVIE} style={styles.evie}/>
            <View style={styles.inputContainer}>
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
                <TouchableOpacity 
                    style={styles.btnCreateAccount}
                    onPress={() => navigation.navigate("RegisterCharger")}
                >
                    <View>
                        <Text style={styles.createAccountText}>Create An Account</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.btnLogin}
                    onPress={() => {
                        if (username != "" && password != ""){
                            // Setting new Username to AsyncStorage
                            let USER_delta = {
                                username: username
                            }
                            AsyncStorage.mergeItem('USER', JSON.stringify(USER_delta), () => {
                                console.log("Username has been updated for USER")
                            })

                            setUsername("")
                            setPassword("")
                            navigation.navigate("Home")
                        }
                    }}
                >
                    <View>
                        <Text style={styles.loginText}>Login</Text>
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
        paddingBottom: 75,
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
        left: -100,
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
    btnCreateAccount: {
        position: 'absolute',
        top: 190,
        left: 26,
        padding: 10,
        borderWidth: 2,
        borderRadius: 10,
        borderColor: "green"
    },
    btnLogin: {
        position: 'absolute',
        top: 190,
        right: 25,
        padding: 10,
        borderWidth: 2,
        borderRadius: 10,
        borderColor: "green"
    },
    createAccountText: {
        color: "green",
        fontSize: 20,
        fontWeight: "bold"
    },
    loginText: {
        color: "green",
        fontSize: 20,
        fontWeight: "bold"
    }
})