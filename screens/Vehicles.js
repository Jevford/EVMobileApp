import React, {Component} from 'react';
import {Alert, Button, View, Text, StyleSheet, SafeAreaView, TouchableOpacity, TouchableHighlightBase} from 'react-native';
import {Picker} from '@react-native-community/picker'; // https://github.com/react-native-community/react-native-picker
import Header from '../components/Header';
import axiosInstance from '../components/axiosInstance';
import Background from '../components/Background'

export default class Vehicles extends Component {
    // Initializing class variables within the "state" object
    state = {
        userData: '',
        carData: '',
        status: '',
        index: 0,
        car: '',
        nickname: '',
        make: '',
        model: '',
        year: ''
    };

    // Setter Method for car variables in state
    setCars = (value, index) => {
        this.setState({
            index: index,
            car: value,
            nickname: this.state.carData[index]["nickname"],
            make: this.state.carData[index]["manufacturer"],
            model: this.state.carData[index]["model"],
            year: this.state.carData[index]["year"]
        })
    }

    // Initialization of Car vars in state after retrieving data from the database
    initCars = () => {
        this.setState({
            nickname: this.state.carData[this.state.index]["nickname"],
            make: this.state.carData[this.state.index]["manufacturer"],
            model: this.state.carData[this.state.index]["model"],
            year: this.state.carData[this.state.index]["year"]
        })
    }

    // Axios method does an API call to the database to pull cars from the cars collection
    getData = async () => {
        if (this.state.carData === ''){
            let res = await axiosInstance.get(
                '/api.php',
                {params : {version: 1, collection : 'cars'}} // tmpUsers
                )
            this.setState({carData: res.data});
            this.initCars();
        }
    }

    // Method that creates a list of Car Picker Objects for Dropdown menu
    carList = () => {
        return( Object.keys(this.state.carData).map( (x,i) => { 
            var car_label = this.state.carData[parseInt(x)]["nickname"];
            return( <Picker.Item label={car_label} key={x} value={i}  />)} ));
    }

    // Once this component is initialized (doesnt have to be shown immediately in the app), it calls this method to get db data beforehand
    componentDidMount = () => {
        this.getData()
    }

    // Main function that generates the Vehicles page
    render() {
        return (
            <View style={styles.container}>
                <Header title='Vehicles'/>
                <Background/>
                <View style={styles.container}>

                <View style={styles.container}>
                    <Text style={styles.headingText}>Select a Vehicle</Text>
                    <Picker
                    selectedValue={this.state.car}
                    style={{height: 75, width: 200}}
                    onValueChange={(itemValue, itemIndex) =>
                        this.setCars(itemValue, itemIndex)
                    }>
                        {this.carList(this.state.index)}
                    </Picker>
                </View>

                <View style={styles.container}>
                    <Text style={styles.headingText}>Vehicle Information</Text>
                    <View style={styles.infoView}>
                        <Text style={styles.infoTextLeft}>Nickname</Text>
                        <Text style={styles.infoTextRight}>{this.state.nickname}</Text>
                    </View>
                    <View style={styles.infoView}>
                        <Text style={styles.infoTextLeft}>Make</Text>
                        <Text style={styles.infoTextRight}>{this.state.make}</Text>
                    </View>
                    <View style={styles.infoView}>
                        <Text style={styles.infoTextLeft}>Model</Text>
                        <Text style={styles.infoTextRight}>{this.state.model}</Text>
                    </View>
                    <View style={styles.infoView}>
                        <Text style={styles.infoTextLeft}>Year</Text>
                        <Text style={styles.infoTextRight}>{this.state.year}</Text>
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
                            onPress={() => this.props.navigation.navigate('vehicleAdd')}
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
        paddingLeft: 16,
        fontSize: 18,
    },
    infoTextRight: {
        flex: 1,
        textAlign: 'right',
        paddingTop: 15,
        paddingRight: 16,
        fontSize: 18,
    },
    infoView: {
        flexDirection: 'row',
    },
})