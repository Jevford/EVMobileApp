import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import Home from './screens/Home';
import Performance from './screens/Performance';
import Charger from './screens/Charger';
import Vehicles from './screens/Vehicles';
import Preferences from './screens/Preferences';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Performance" component={Performance} />
        <Drawer.Screen name="Charger" component={Charger} />
        <Drawer.Screen name="Vehicles" component={Vehicles} />
        <Drawer.Screen name="Preferences" component={Preferences} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
