import * as React from 'react';
import { StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import CustomDrawerContent from './components/drawerContent';
import { FontAwesome5, FontAwesome, Feather } from '@expo/vector-icons';

import Home from './screens/Home';
import Performance from './screens/Performance';
import Charger from './screens/Charger';
import Vehicles from './screens/Vehicles';
import Preferences from './screens/Preferences';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator 
        initialRouteName="Home"
        overlayColor="transparent"
        drawerStyle={{
          backgroundColor: '#edf0ee'
        }}
        drawerContentOptions={{
          activeTintColor: '#2f804a',
          activeBackgroundColor: '#8ee6ab',
          labelStyle: styles.contentOptions,
          itemStyle: {
            borderRadius: 10
          }
        }}
        drawerContent={(props) => <CustomDrawerContent {...props}/>}
      >
        <Drawer.Screen 
          name="Home" 
          component={Home}
          options={({ navigation }) => ({
            drawerIcon: ({tintColor}) => <Feather name="home" size={40} color="#2f804a" />
          })}
        />
        <Drawer.Screen 
          name="Performance" 
          component={Performance} 
          options={({ navigation }) => ({
            drawerIcon: ({tintColor}) => <FontAwesome name="bar-chart" size={35} color="#2f804a" />
          })}
        />
        <Drawer.Screen 
          name="Charger" 
          component={Charger} 
          options={({ navigation }) => ({
            drawerIcon: ({tintColor}) => <FontAwesome5 name="charging-station" size={35} color="#2f804a" />
          })}
        />
        <Drawer.Screen 
          name="Vehicles" 
          component={Vehicles} 
          options={({ navigation }) => ({
            drawerIcon: ({tintColor}) => <FontAwesome5 name="car" size={40} color="#2f804a" />
          })}
        />
        <Drawer.Screen 
          name="Preferences" 
          component={Preferences} 
          options={({ navigation }) => ({
            drawerIcon: ({tintColor}) => <FontAwesome name="sliders" size={45} color="#2f804a" />
          })}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  contentOptions: {
    fontSize: 16,
    fontWeight: 'bold'
  }
})
