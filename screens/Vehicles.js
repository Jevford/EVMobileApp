import React, {Component} from 'react';
import {Alert, Button, View, Text, StyleSheet, SafeAreaView, TouchableOpacity} from 'react-native';
import {Picker} from '@react-native-community/picker'; // https://github.com/react-native-community/react-native-picker
import Header from '../components/Header';
import carData from '../json/cars.json';

export default class Vehicles extends Component {
    state = {
        car: "emon",
        index: 0
    };

    render() {
        return (
            <View style={styles.container}>
                <Header title='Vehicles'/>
                <View style={styles.container}>

                    <View style={styles.container}>
                        <Text style={styles.headingText}>Select a Vehicle</Text>
                        <Picker
                        selectedValue={this.state.car}
                        style={{height: 75, width: 200}}
                        onValueChange={(itemValue, itemIndex) =>
                            this.setState({car: itemValue, index: itemIndex})
                        }>
                        <Picker.Item label="Emon's Car" value="emon" />
                        <Picker.Item label="Mary's Car" value="mary" />
                        <Picker.Item label="Joseph's Car" value="joseph" />
                        </Picker>
                    </View>

                    <View style={styles.container}>
                        <Text style={styles.headingText}>Vehicle Information</Text>
                        <View style={styles.infoView}>
                            <Text style={styles.infoTextLeft}>Nickname</Text>
                            <Text style={styles.infoTextRight}>{carData[this.state.index].nickname}</Text>
                        </View>
                        <View style={styles.infoView}>
                            <Text style={styles.infoTextLeft}>Manufacturer</Text>
                            <Text style={styles.infoTextRight}>{carData[this.state.index].manufacturer}</Text>
                        </View>
                        <View style={styles.infoView}>
                            <Text style={styles.infoTextLeft}>Model</Text>
                            <Text style={styles.infoTextRight}>{carData[this.state.index].model}</Text>
                        </View>
                        <View style={styles.infoView}>
                            <Text style={styles.infoTextLeft}>Year</Text>
                            <Text style={styles.infoTextRight}>{carData[this.state.index].year}</Text>
                        </View>
                    </View>

                    <View style={styles.optionsContainer}>
                        <Text style={styles.headingText}>Vehicle Options</Text>
                        <View style={styles.buttonContainer}>
                            <View style={{width: "33%"}}>
                                <Button
                                title="Remove"
                                color="#f04646"
                                onPress={() => Alert.alert('Car Removed')}
                                />
                            </View>
                            <View style={{width: "33%"}}>
                                <Button
                                title="Add"
                                onPress={() => Alert.alert('Car Added!')}
                                />
                            </View>
                            <View style={{width: "33%"}}>
                                <Button
                                title="Edit"
                                color="#a8329e"
                                onPress={() => Alert.alert('Edit your Vehicle parameters')}
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