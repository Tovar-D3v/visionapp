import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";
import { AuthProvider, useAuth } from "./src/context/AuthProvider";

import WelcomeScreen from "./src/screens/WelcomeScreen";
import AppNavigator from "./src/navigation/AppNavigator";
import LoginScreen from "./src/screens/LoginScreen";

SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();

function RootNavigator() {
  const { user } = useAuth();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <Stack.Screen name="Main" component={AppNavigator} />
      ) : (
        <Stack.Screen name="autenticacion" component={LoginScreen} />
      )}
      <Stack.Screen name="Bienvenido" component={WelcomeScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  const onLayoutRootView = useCallback(async () => {
    await SplashScreen.hideAsync();
  }, []);

  return (
    <AuthProvider>
      <NavigationContainer onReady={onLayoutRootView}>
        <RootNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}