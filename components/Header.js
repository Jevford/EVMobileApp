import React from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import { MaterialIcons, EvilIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function Header({ title }){

    const navigation = useNavigation();

    return (
        <View>
            <View style={styles.header}>
                <MaterialIcons name='menu' size={50} onPress={() => navigation.openDrawer()} style={styles.menuIcon} />
                <Text style={styles.title}>{ title }</Text>
                <EvilIcons name='user' size={50} style={styles.userIcon} onPress={() => navigation.navigate('RegisterEVSEID')}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        width: Dimensions.get('window').width,
        height: 80,
        paddingTop: 22,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#5AD282',
    },
    title: {
        fontSize: 20,
    },
    menuIcon: {
        position: 'absolute',
        paddingTop: 22,
        left: 16
    },
    userIcon: {
        position: 'absolute',
        paddingTop: 22,
        right: 16
    }
})