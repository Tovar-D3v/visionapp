import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AuthStack from './src/navigation/AuthStack';
import AppStack from './src/navigation/AppStack';
import { AuthProvider } from './src/AuthContext';

function App() {
  return (
    
    <AuthProvider>

    <NavigationContainer>
      
      {/* <AppStack /> */}
      <AuthStack />
    </NavigationContainer>
    </AuthProvider>
    
  );
}

export default App;