import React, { Component } from 'react';
import {View, Image, ImageBackground, StyleSheet, Dimensions} from 'react-native';
import background from '../assets/green.jpg'

// Component that shows the background image seen in each page of the app
export default function Background(props){
    return (
        <View style={styles.backContainer}>
            <ImageBackground source={background} style={styles.image}>
                <Image source={background} style={styles.image2}></Image>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    backContainer: {
        position: 'absolute',
        top: 80,
        bottom: 0,
        left: 0,
        right: 0
    },
    image2: {
        width: 0,
    },  
    image: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height + 50,
        resizeMode: 'stretch',
        justifyContent: 'center',
        opacity: 0.2
    }
})