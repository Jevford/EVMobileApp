import React, { Component } from 'react';
import {View, Text, StyleSheet, SafeAreaView, TouchableOpacity} from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

import Header from '../components/Header';

export default class Preferences extends Component {
    constructor(){
        super();
        this.state = {
            costValue: 33,
            envValue: 33,
            socValue: 33
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
    }

    render() {
        return (
            <View style={styles.container}>
                <Header title='Preferences'/>
                <View style={styles.container}>
                    <Text>Preferences Screen</Text>
                    <Text>Cost: {this.state.costValue}</Text>
                    <Text>Environment: {this.state.envValue}</Text>
                    <Text>Society: {this.state.socValue}</Text>
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
            </View> 
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})