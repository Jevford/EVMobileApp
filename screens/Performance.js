/* 
  Currently just a static page
  Future implementations: 
   - Read db data about the user's charging stats and display their star rating for each pref
   - Also a live graph for visually representing their charging stats
*/

import React, { Component } from 'react';
import {View, Text, StyleSheet, Image, Platform, ScrollView} from 'react-native';

// Importing image assets from assets directory
import left from '../assets/back.png'
import right from '../assets/right-arrow.png'
import starEmpty from '../assets/star_empty.png'
import starFill from '../assets/star_fill.png'
import money from '../assets/homeIcons/cost/lv5.png'
import tree from '../assets/tree.png'
import graph from '../assets/graph.png'

import Header from '../components/Header';
import Background from '../components/Background'

// Component displays star ratings and graph of user's charging performance
export default class Performance extends Component {
    render() {
        return (
          <View>
            <Header title='Performance'/>
            <Background/>
            <View style={styles.container}>
                <View style={styles.section}>
                    <Text style={styles.title}>Cost Efficiency</Text>
                    <View style={styles.imageView}>
                    <Image source={left} style={styles.stars}/>
                    <Image source={starFill} style={styles.stars}/>
                    <Image source={starFill} style={styles.stars}/>
                    <Image source={starFill} style={styles.stars}/>
                    <Image source={starFill} style={styles.stars}/>
                    <Image source={starEmpty} style={styles.stars}/>
                    <Image source={right} style={styles.stars}/>
                    </View>
                    <Text style={styles.simpleText}>Your current Cost optimization is great!</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.title}>January Report</Text>
                    <View style={styles.imageView}>
                    <Image source={money} style={styles.savings}/>
                    <Image source={tree} style={styles.savings}/>
                    </View>
                    <View style={styles.textView}>
                    <Text style={styles.savingsText}>$25.00</Text>
                    <Text style={styles.savingsText}>1 Tree</Text>
                    </View>
                </View>
                <View style={styles.section}>
                <Image source={graph} style={{width: 400, height: 135}}/>
            </View>
            </View>
          </View>
        );
    }
}

const styles = StyleSheet.create({
    section: {
      padding: 30,
    },
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'transparent',
    },
    title: {
      fontSize: 32,
      textAlign: 'center',
      margin: 10,
      marginBottom: 20,
    },
    stars: {
      width: 30,
      height: 30,
      marginHorizontal: 14,
    },
    savings: {
      width: 100,
      height: 100,
      marginHorizontal: 40,
    },
    savingsText: {
      fontSize: 20,
    },
    imageView: {
      justifyContent: 'space-between',
      flexDirection: 'row',
    },
    textView: {
      justifyContent: 'space-between',
      flexDirection: 'row',
      marginHorizontal: 85,
    },
    simpleText: {
      fontSize: 16,
      textAlign: 'center',
      marginBottom: 20,
    }
  });
  