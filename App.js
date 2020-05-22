import * as React from 'react';
import { StyleSheet } from 'react-native';
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
import RegisterCharger from './screens/RegisterCharger';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function LoginStack() {
  return (
      <Stack.Navigator
      headerMode = { false }
        screenOptions = {{
          headerShown: false
        }}
      >
        <Stack.Screen
          name = "Register" 
          component={RegisterCharger}
        />
      </Stack.Navigator>
  )
}

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
            drawerIcon: () => <Feather name="home" size={40} color="#2f804a" />
          })}
        />
        {/* <Drawer.Screen 
          name="Performance" 
          component={Performance} 
          options={({ navigation }) => ({
            drawerIcon: () => <FontAwesome name="bar-chart" size={35} color="#2f804a" />
          })}
        /> */}
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


const styles = StyleSheet.create({
  contentOptions: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  clearLabel: {
    color: 'transparent'
  }
})
