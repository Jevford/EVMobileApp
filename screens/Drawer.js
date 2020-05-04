import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createAppContainer } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';

import Home from './Home';
import Preferences from './Preferences';


const RootDrawerNavigator = createDrawerNavigator();

export default function Drawer() {
    return (
        <NavigationContainer>
            <Drawer.Navigator initialRouteName="Home">
                <Drawer.Screen name="Home" component={Home} />
                <Drawer.Screen name="Preferences" component={Preferences} />
            </Drawer.Navigator>
        </NavigationContainer>
    )
}