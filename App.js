import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { withExpoSnack } from 'nativewind';

function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <AppNavigator />
    </NavigationContainer>
  );
}

// Envolvemos la aplicación con withExpoSnack para habilitar Tailwind
export default withExpoSnack(App);
