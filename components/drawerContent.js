import React from 'react';
import {ImageBackground} from 'react-native';
import {
    DrawerContentScrollView,
    DrawerItemList,
  } from '@react-navigation/drawer';


import background from '../assets/green.jpg'

// This component styles the drawer stack with custom components and spacing/fonts
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