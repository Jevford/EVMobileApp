import React, { Component } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Platform} from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

import Header from '../components/Header';

export default class Preferences extends Component {
    constructor(){
        super();
        this.state = {
            costValue: 33,
            envValue: 33,
            socValue: 33,
            costPriority: '[Medium]',
            envPriority: '[Medium]',
            socPriority: '[Medium]',
        }
    }

    setSliderValues = (s1, s2) => {
        let env = s2 - s1;
        let soc = 100 - (s1 + env);
        this.setState({
            costValue: s1,
            envValue: env,
            socValue: soc
        })
        this.setFactorPriorities();
    }

    setFactorPriorities = () => {
        this.setState({
            costPriority: this.ratePriority(this.state.costValue),
            envPriority: this.ratePriority(this.state.envValue),
            socPriority: this.ratePriority(this.state.socValue)
        })
    }

    ratePriority = (value) => {
        if(value < 25) return '[Low]';
        else if(value < 63) return '[Medium]';
        else return '[High]';
    }

    render() {
        return (
            <View style={styles.container}>
                <Header title='Preferences'/>
                <View style={styles.prefContainer}>
                    <Text style={styles.costText}>Cost: {this.state.costValue}</Text>
                    <Text style={styles.envText}>Environment: {this.state.envValue}</Text>
                    <Text style={styles.socText}>Society: {this.state.socValue}</Text>
                    <MultiSlider
                        values={[30,70]}
                        max={100}
                        onValuesChange={(values) => this.setSliderValues(values[0], values[1])}
                        isMarkersSeparated={false}
                        enabledOne={true}
                        enabledTwo={true}
                        minMarkerOverlapDistance={10}
                    />
                </View>
                <View style={styles.descriptionContainer}>
                    <View style={styles.costDescriptionBox}>
                        <Text>Cost Description</Text>
                        <Text style={styles.right}>{this.state.costPriority}}</Text>
                        <Text style={styles.descriptionText}>You Environment is TrashYou Environment is Trash</Text>
                    </View>
                    <View style={styles.envDescriptionBox}>
                        <Text>Environment Description</Text>
                        <Text style={styles.right}>{this.state.envPriority}}</Text>
                        <Text style={styles.descriptionText}>You Environment is TrashYou Environment is Trash</Text>
                    </View>
                    <View style={styles.socDescriptionBox}>
                        <Text>Society Description</Text>
                        <Text style={styles.right}>{this.state.socPriority}</Text> 
                        <Text style={styles.descriptionText}>a a a a a a a a a a a a a a a a a a a a a a a a a a</Text>
                    </View>
                </View>
                <TouchableOpacity>
                    <View>
                        <Text style={styles.saveBtn}> Save Preferences </Text>
                    </View>
                </TouchableOpacity>
            </View> 
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    prefContainer: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        top: 20
    },
    costText: {
        fontSize: 20,
        color: "#42b6f5",
        fontWeight: "bold",
        paddingBottom: 10
    },  
    envText: {
        fontSize: 20,
        color: "#65CB89",
        fontWeight: "bold",
        paddingBottom: 10
    },  
    socText: {
        fontSize: 20,
        color: "#d4c559",
        paddingBottom: 10
    },
    descriptionContainer: {
        alignItems: 'flex-start',
        marginLeft: 30,
        marginRight: 30,
        top: -20
    },
    costDescriptionBox: {
        borderColor: 'black',
        borderTopWidth: 1,
        paddingRight: '30%',
        marginBottom: 60
    },
    envDescriptionBox: {
        borderColor: 'black',
        borderTopWidth: 1,
        paddingRight: '30%',
        marginBottom: 60
    },
    socDescriptionBox: {
        borderColor: 'black',
        borderTopWidth: 1,
        paddingRight: '30%',
        marginBottom: 60
    },
    right: {
        position: 'absolute',
        right: 0,
    },
    descriptionText: {
        flexWrap: 'wrap'
    },
    saveBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        bottom: 20,
        fontSize: 24,
        fontWeight: "bold",
        color: '#65CB89'
    }
})