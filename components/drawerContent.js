import React from 'react';
import { View, Text, ImageBackground, Image} from 'react-native';
import {
    DrawerContentScrollView,
    DrawerItemList,
  } from '@react-navigation/drawer';


import background from '../assets/green.jpg'
  
export default function CustomDrawerContent(props) {
    return (
        <DrawerContentScrollView {...props}>
            <ImageBackground 
                source={background}
                style={{
                    top: -30,
                    height: 180,
                    padding: 40,
                    paddingTop: 60,
                }}
            >
            </ImageBackground>
        <DrawerItemList {...props} />
        </DrawerContentScrollView>
    );
}