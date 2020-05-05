import React, {Component} from 'react';
import {Alert, Button, View, Text, StyleSheet, SafeAreaView, TouchableOpacity} from 'react-native';
import {Picker} from '@react-native-community/picker'; // https://github.com/react-native-community/react-native-picker
import Header from '../components/Header';
import { ScrollView } from 'react-native-gesture-handler';

export default class Vehicles extends Component {
    state = {car: 'EVIE'};

    render() {
        return (
            <View style={styles.container}>
                <Header title='Charger'/>
                <ScrollView>
                    <View style={styles.container}>

                        <View style={styles.container}>
                            <Text style={styles.headingText}>Select a Charger</Text>
                            <Picker
                            selectedValue={this.state.language}
                            style={{height: 75, width: 200}}
                            onValueChange={(itemValue, itemIndex) =>
                                this.setState({language: itemValue})
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
                                <Text style={styles.infoTextRight}>US*A23*E45B*78C</Text>
                            </View>
                            <View style={styles.infoView}>
                                <Text style={styles.infoTextLeft}>Voltage</Text>
                                <Text style={styles.infoTextRight}>LV 2</Text>
                            </View>
                            <View style={styles.infoView}>
                                <Text style={styles.infoTextLeft}>Output</Text>
                                <Text style={styles.infoTextRight}>30 Amps</Text>
                            </View>
                            <View style={styles.infoView}>
                                <Text style={styles.infoTextLeft}>Plug Type</Text>
                                <Text style={styles.infoTextRight}>J1772</Text>
                            </View>
                        </View>

                        <View style={styles.container}>
                            <Text style={styles.headingText}>Location Information</Text>
                            <View style={styles.infoView}>
                                <Text style={styles.infoTextLeft}>Service Provider</Text>
                                <Text style={styles.infoTextRight}>SoCal Edison</Text>
                            </View>
                            <View style={styles.infoView}>
                                <Text style={styles.infoTextLeft}>Zip Code</Text>
                                <Text style={styles.infoTextRight}>91612</Text>
                            </View>
                        </View>
                        
                        <View style={styles.optionsContainer}>
                            <Text style={styles.headingText}>Charger Options</Text>
                            <View style={styles.buttonContainer}>
                                <View style={{width: "50%"}}>
                                    <Button
                                    title="Remove"
                                    color="#f04646"
                                    onPress={() => Alert.alert('Charger Removed')}
                                    />
                                </View>
                                <View style={{width: "50%"}}>
                                    <Button
                                    title="Add"
                                    onPress={() => Alert.alert('Charger Added!')}
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
        paddingLeft: 40,
        fontSize: 18,
    },
    infoTextRight: {
        flex: 1,
        textAlign: 'right',
        paddingTop: 15,
        paddingRight: 40,
        fontSize: 18,
    },
    infoView: {
        flexDirection: 'row',
    },
})