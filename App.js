/*
  App: EVIE Mobile App (Electric Vehicle Intelligent Environment)
  Version: 1.0.0 ( June 10, 2020 )
  Developers: Jevford Barro, Darrel Belen ( Class of 2020 )
  Message to Future Developers: Hello and hope you enjoy playing with this app and making it even better :)

  App.js is the root to when the mobile app is started ( The Main File that holds and runs everything together )
*/

// Import of Components, Screens, and Dependencies
import * as React from 'react';
import { StyleSheet, AsyncStorage } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import CustomDrawerContent from './components/drawerContent';
import { FontAwesome5, FontAwesome, Feather, AntDesign } from '@expo/vector-icons';

import Home from './screens/Home';
import Performance from './screens/Performance';
import Charger from './screens/Charger';
import Vehicles from './screens/Vehicles';
import Preferences from './screens/Preferences';
import vehicleAdd from './screens/vehicleAdd';
import chargerAdd from './screens/chargerAdd';
import LoginPage from './screens/LoginPage';
import RegisterCharger from './screens/RegisterCharger';
import RegisterUser from './screens/RegisterUser';
import RegisterPlan from './screens/RegisterPlan';
import RegisterCar from './screens/RegisterCar';
import RegisterChargeTimes from './screens/RegisterChargeTimes';

// Creation of Drawer and Stack Navigators
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

// AsyncStorage Initilization for Current User of Mobile App ( Like local storage on web apps )
let USER_object = {
  username: null
};

AsyncStorage.setItem('USER', JSON.stringify(USER_object), () => {
  AsyncStorage.getItem('USER', (err, result) => {
      // console.log(result); <- testing purposes
  });
});

// Login Stack that holds screens for the login pages
function LoginStack() {
  return (
      <Stack.Navigator
      initialRouteName = "LoginPage"
      headerMode = { false }
        screenOptions = {{
          headerShown: false
        }}
      >
        <Stack.Screen
          name = "LoginPage" 
          component={LoginPage}
        />
        <Stack.Screen
          name = "RegisterCharger" 
          component={RegisterCharger}
        />
        <Stack.Screen
          name = "RegisterUser" 
          component={RegisterUser}
        />
        <Stack.Screen
          name = "RegisterPlan" 
          component={RegisterPlan}
        />
        <Stack.Screen
          name = "RegisterCar" 
          component={RegisterCar}
        />
        <Stack.Screen
          name = "RegisterChargeTimes" 
          component={RegisterChargeTimes}
        />
      </Stack.Navigator>
  )
}

// Charger Stack that holds charger related pages
function chargerStack() {
  return(
    <Stack.Navigator initialRouteName="Charger">
      <Stack.Screen 
        name="Charger" 
        component={Charger}
        options={{headerShown: false}}
      />
      <Stack.Screen 
        name="chargerAdd" 
        component={chargerAdd}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  )
}

// Vehicle stack that holds vehicle related pages
function vehicleStack() {
  return(
    <Stack.Navigator initialRouteName="Vehicles">
      <Stack.Screen 
        name="Vehicles" 
        component={Vehicles}
        options={{headerShown: false}}
      />
      <Stack.Screen 
        name="vehicleAdd" 
        component={vehicleAdd}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  )
}

/* 
  Main method where the mobile app start calling from ( Like the main method in Python or Java )
  Holds all the stacks and drawer, some stacks are nested in the drawer
*/
export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator 
        initialRouteName="Register New Profile"
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
            drawerIcon: () => <Feather name="home" size={40} color="#2f804a" />
          })}
        />
        <Drawer.Screen 
          // This screen has not been fully implemented with functioning live graph and user charging performance details, pretty much a static screen
          name="Performance" 
          component={Performance} 
          options={({ navigation }) => ({
            drawerIcon: () => <FontAwesome name="bar-chart" size={35} color="#2f804a" />
          })}
        />
        <Drawer.Screen 
          name="Charger" 
          component={chargerStack} 
          options={({ navigation }) => ({
            drawerIcon: () => <FontAwesome5 name="charging-station" size={35} color="#2f804a" />
          })}
        />
        <Drawer.Screen 
          name="Vehicles" 
          component={vehicleStack}
          options={({ navigation }) => ({
            drawerIcon: () => <FontAwesome5 name="car" size={40} color="#2f804a" />
          })}
        />
        <Drawer.Screen 
          name="Preferences" 
          component={Preferences} 
          options={({ navigation }) => ({
            drawerIcon: () => <FontAwesome name="sliders" size={45} color="#2f804a" />
          })}
          />
        <Drawer.Screen 
          name="Register New Profile" 
          component={LoginStack}
          options={({ navigation }) => ({
            drawerIcon: () => <AntDesign name="adduser" size={42} color="#2f804a" />
          })}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

/* 
  Local Stylesheet for Components within this file 
  Think about it as CSS stylesheets, only limitation in React Native is that they are usually within the same file with the code
*/
const styles = StyleSheet.create({
  contentOptions: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  clearLabel: {
    color: 'transparent'
  }
})
