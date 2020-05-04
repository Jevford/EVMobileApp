import React from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import home from './assets/home.png';
import settings from './assets/settings.png';

function Home({navigation}) {
  return (
    
    <TouchableOpacity onPress={() => navigation.push('Settings')}>
       <View style={styles.container}>
         <Image source={home} style={styles.image}></Image>
       </View>
    </TouchableOpacity>
  );
}

function Settings() {
  return (
    // <View>
    <View style={styles.container2}>
      <Image source={settings} style={styles.image2}></Image>
    </View>
  );
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home' screenOptions={{
        headerStyle: {
          backgroundColor: '#65CB87',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerTitleAlign: 'center',
      }}>
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="Settings" component={Settings}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 330,
    paddingLeft: 20,
  },
  container2: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
  },
  header: {
    alignSelf: 'center',
    textAlign: 'center',
  },
  image: {
    width: 420,
    resizeMode: 'contain',
  },
  image2: {
    width: 390,
    resizeMode: 'contain',
  },
});


