/* 
  Experimental App.js file, simply change this filename to App.js and the other to something else
  Use this file as a sandbox to test functionalities and anything without affecting the main Application
*/


// The imports file, pretty self explanatory 
import React from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import home from './assets/home.png';
import settings from './assets/settings.png';


// Local Home Component (Screen) - not associated to the Home.js file
function Home({navigation}) {
  return (
    
    <TouchableOpacity onPress={() => navigation.push('Settings')}>
       <View style={styles.container}>
         <Image source={home} style={styles.image}></Image>
       </View>
    </TouchableOpacity>
  );
}

// Same as Home Description
function Settings() {
  return (
    // <View>
    <View style={styles.container2}>
      <Image source={settings} style={styles.image2}></Image>
    </View>
  );
}

// Create a Stack Navigator to hold different Screens
const Stack = createStackNavigator();

/* 
  Main function that starts the whole app (think about as the main function in Python or Java)
  Hold the different navigators, screens, and stacks
  Tip: Separate Screens and Navigators into their own files for low coupling and high cohesion
*/
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

/* 
  Local Stylesheet for Components within this file 
  Think about it as CSS stylesheets, only limitation in React Native is that they are usually within the same file with the code
*/
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


