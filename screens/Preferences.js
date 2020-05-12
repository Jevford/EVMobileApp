import React, { Component } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Platform} from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import axiosInstance from '../components/axiosInstance';

import Header from '../components/Header';
import Background from '../components/Background';

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
            costText: 'You are paying the normal charge rate for your electric vehicle.',
            envText: 'You are releasing an average amount of carbon emission.',
            socText: 'You have an average amount of impact on your local electrical grid system.'
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
        this.setDescriptionText('cost');
        this.setDescriptionText('env');
        this.setDescriptionText('soc');
    }

    setFactorPriorities = () => {
        this.setState({
            costPriority: this.ratePriority(this.state.costValue),
            envPriority: this.ratePriority(this.state.envValue),
            socPriority: this.ratePriority(this.state.socValue)
        })
    }

    ratePriority = (value) => {
        if(value < 30) return '[Low]';
        else if(value < 50) return '[Medium]';
        else return '[High]';
    }

    setDescriptionText = (factor) => {
        if(factor === 'cost'){
            if(this.state.costValue < 30){
                this.setState({
                    costText: 'You are paying the normal charge rate for your electric vehicle.'
                })
            }
            else if(this.state.costValue < 55){
                this.setState({
                    costText: 'You are saving a small amount of money, but you are helping the environment and society.'
                })
            }
            else{
                this.setState({
                    costText: 'You are saving a large amount of money but positively affecting other the environment and society.'
                })
            }
        }
        else if(factor === 'env'){
            if(this.state.envValue < 30){
                this.setState({
                    envText: 'You are releasing a large amount of carbon emission.'
                })
            }
            else if(this.state.envValue < 55){
                this.setState({
                    envText: 'You are releasing an average amount of carbon emission.'
                })
            }
            else{
                this.setState({
                    envText: 'You are releasing a minimal amount of carbon.  Thank you for helping the Environment!'
                })
            }
        }
        else if(factor === 'soc'){
            if(this.state.socValue < 30){
                this.setState({
                    socText: 'You are having a large impact on your local electrical grid system.'
                })
            }
            else if(this.state.socValue < 55){
                this.setState({
                    socText: 'You have an average amount of impact on your local electrical grid system.'
                })
            }
            else{
                this.setState({
                    socText: 'You have minimal impact on your local electrical grid system.  Thank you for helping your neighbors!'
                })
            }
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Header title='Preferences'/>
                <Background/>
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
                        <Text style={styles.costText}>Cost Description</Text>
                        <Text style={styles.right}>{this.state.costPriority}</Text>
                        <Text style={styles.descriptionText}>{this.state.costText}</Text>
                    </View>
                    <View style={styles.envDescriptionBox}>
                        <Text style={styles.envText}>Environment Description</Text>
                        <Text style={styles.right}>{this.state.envPriority}</Text>
                        <Text style={styles.descriptionText}>{this.state.envText}</Text>
                    </View>
                    <View style={styles.socDescriptionBox}>
                        <Text style={styles.socText}>Society Description</Text>
                        <Text style={styles.right}>{this.state.socPriority}</Text> 
                        <Text style={styles.descriptionText}>{this.state.socText}</Text>
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
    image2: {
        top: 50
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
        fontWeight: "800",
        marginBottom: 5,
        textShadowColor: 'rgba(0, 0, 0, 1)',
        textShadowRadius: 2
    },  
    envText: {
        fontSize: 20,
        color: "#65CB89",
        fontWeight: "800",
        marginBottom: 5,
        textShadowColor: 'rgba(0, 0, 0, 1)',
        textShadowRadius: 2
    },  
    socText: {
        fontSize: 20,
        color: "#d4c559",
        marginBottom: 5,
        fontWeight: '800',
        textShadowColor: 'rgba(0, 0, 0, 1)',
        textShadowRadius: 3
    },
    descriptionContainer: {
        position: 'absolute',
        marginLeft: 30,
        marginRight: 30,
        top: 270
    },
    costDescriptionBox: {
        position: 'relative',
        borderColor: 'black',
        borderTopWidth: 2,
        borderTopColor: "#42b6f5",
        marginBottom: 20
    },
    envDescriptionBox: {
        position: 'relative',
        borderColor: 'black',
        borderTopWidth: 2,
        borderTopColor: "#65CB89",
        marginTop: 20,
        marginBottom: 20
    },
    socDescriptionBox: {
        position: 'relative',
        borderColor: 'black',
        borderTopWidth: 2,
        borderTopColor: "#d4c559",
        marginTop: 20,
        marginBottom: 20
    },
    right: {
        position: 'absolute',
        right: 0,
        fontSize: 16
    },
    descriptionText: {
        flexWrap: 'wrap',
        fontSize: 16
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