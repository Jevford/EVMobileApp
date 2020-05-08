import React, {Component} from 'react';
import {Alert, Button, View, Text, StyleSheet, SafeAreaView, TouchableOpacity} from 'react-native';
import {Picker} from '@react-native-community/picker'; // https://github.com/react-native-community/react-native-picker
import Header from '../components/Header';
import { ScrollView } from 'react-native-gesture-handler';
import chargerData from '../json/chargers.json';

export default class Vehicles extends Component {
    state = {
        charger: "emon",
        index: 0
    };

    getData = async () => {
        if (this.state.dbOptions === ''){
            let res = await axios.get(
                'http://52.156.135.73/api.php',
                {params : {collection : 'user_device_table'}}
                )
    
            this.setState({dbOptions: res.data});
            if(!this.state.loadOptionsFlag){
                this.refreshOptions();
            }
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Header title='Charger'/>
                <ScrollView>
                    <View style={styles.container}>

                        <View style={styles.container}>
                            <Text style={styles.headingText}>Select a Charger</Text>
                            <Picker
                            selectedValue={this.state.charger}
                            style={{height: 75, width: 200}}
                            onValueChange={(itemValue, itemIndex) =>
                                this.setState({charger: itemValue, index: itemIndex})
                            }>
                            <Picker.Item label="Emon's Charger" value="emon" />
                            <Picker.Item label="Mary's Charger" value="mary" />
                            <Picker.Item label="Joseph's Charger" value="joseph" />
                            </Picker>
                        </View>

                        <View style={styles.container}>
                            <Text style={styles.headingText}>Charger Information</Text> 
                            <View style={styles.infoView}>
                                <Text style={styles.infoTextLeft}>EVSE ID</Text>
                                <Text style={styles.infoTextRight}>{chargerData[this.state.index].evse_id}</Text>
                            </View>
                            <View style={styles.infoView}>
                                <Text style={styles.infoTextLeft}>Voltage</Text>
                                <Text style={styles.infoTextRight}>{chargerData[this.state.index].voltage}</Text>
                            </View>
                            <View style={styles.infoView}>
                                <Text style={styles.infoTextLeft}>Output</Text>
                                <Text style={styles.infoTextRight}>{chargerData[this.state.index].output}</Text>
                            </View>
                            <View style={styles.infoView}>
                                <Text style={styles.infoTextLeft}>Plug Type</Text>
                                <Text style={styles.infoTextRight}>{chargerData[this.state.index].plug_type}</Text>
                            </View>
                        </View>

                        <View style={styles.container}>
                            <Text style={styles.headingText}>Location Information</Text>
                            <View style={styles.infoView}>
                                <Text style={styles.infoTextLeft}>Service Provider</Text>
                                <Text style={styles.infoTextRight}>{chargerData[this.state.index].provider}</Text>
                            </View>
                            <View style={styles.infoView}>
                                <Text style={styles.infoTextLeft}>Zip Code</Text>
                                <Text style={styles.infoTextRight}>{chargerData[this.state.index].zip}</Text>
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
                                    onPress={() => Alert.alert('Charger Added!')}
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
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    optionsContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    buttonContainer: {
        marginTop: 20,
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