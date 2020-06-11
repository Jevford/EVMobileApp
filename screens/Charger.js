import React, {Component} from 'react';
import {Alert, Button, View, Text, StyleSheet} from 'react-native';
import {Picker} from '@react-native-community/picker'; // https://github.com/react-native-community/react-native-picker
import Header from '../components/Header';
import { ScrollView } from 'react-native-gesture-handler';
import axiosInstance from '../components/axiosInstance';
import Background from '../components/Background'

// Component that shows the user all past connected chargers
export default class Chargers extends Component {

    // Initial class state vars
    state = {
        chargerData: '',
        index: 0,
        charger: '',
        evse: '',
        level: '',
        current: '',
        type: '',
        provider: '',
        zip: ''
    };

    // Sets the state vars to a charger record's data
    setChargers = (value, index) => {
        this.setState({
            index: index,
            charger: value,
            evse: this.state.chargerData[index]["evseid"],
            level: this.state.chargerData[index]["defaultEVSELevel"],
            current: this.state.chargerData[index]["maxcircuitcurrent"],
            type: this.state.chargerData[index]["EVinterfacetype"],
            provider: this.state.chargerData[index]["electricalprovider"],
            zip: this.state.chargerData[index]["zip"]
        })
    }

    // Initial state vars once app retrieves the chargers from the charger collection in the database
    initChargers = () => {
        this.setState({
            evse: this.state.chargerData[this.state.index]["evseid"],
            level: this.state.chargerData[this.state.index]["defaultEVSELevel"],
            current: this.state.chargerData[this.state.index]["maxcircuitcurrent"],
            type: this.state.chargerData[this.state.index]["EVinterfacetype"],
            provider: this.state.chargerData[this.state.index]["electricalprovider"],
            zip: this.state.chargerData[this.state.index]["zip"]
        })
    }

    // Axios method that GETs charger records from the charger collection
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

    // Creates a list of Picker Components that will be stored in the Picker View component within the render method
    chargerList = () => {
        return( Object.keys(this.state.chargerData).map( (x,i) => { 
            var charger_label = this.state.chargerData[parseInt(x)]["evseid"];
            return( <Picker.Item label={charger_label} key={x} value={i}  />)} ));
    }

    // Retrieve charger records once the component is mounted (Charger Screen doesnt have to be seen to call this method)
    componentDidMount = () => {
        this.getData()
    }

    render() {
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
                                <Text style={styles.infoTextLeft}>Default EVSE Level</Text>
                                <Text style={styles.infoTextRight}>{this.state.level}</Text>
                            </View>
                            <View style={styles.infoView}>
                                <Text style={styles.infoTextLeft}>Max Current</Text>
                                <Text style={styles.infoTextRight}>{this.state.current}</Text>
                            </View>
                            <View style={styles.infoView}>
                                <Text style={styles.infoTextLeft}>EV Interface Type</Text>
                                <Text style={styles.infoTextRight}>{this.state.type}</Text>
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