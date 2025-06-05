import React, { useCallback } from "react";
import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { AuthProvider, useAuth } from "./src/context/AuthProvider";
import WelcomeScreen from "./src/screens/WelcomeScreen";
import AdminNavigation from "./src/navigation/adminNavigation";
import UserNavigation from "./src/navigation/userNavigation";
import LoginScreen from "./src/screens/LoginScreen";

SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();

function RootNavigator() {
  const { user, isAdmin } = useAuth();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        isAdmin ? (
          <Stack.Screen name="Main" component={AdminNavigation} />
        ) : (
          <Stack.Screen name="Main" component={UserNavigation} />
        )
      ) : (
        <Stack.Screen name="autenticacion" component={LoginScreen} />
      )}
      <Stack.Screen name="Bienvenido" component={WelcomeScreen} />
    </Stack.Navigator>
  );
}

function AppInner() {
  const onLayoutRootView = useCallback(async () => {
    await SplashScreen.hideAsync();
  }, []);

  return (
    <NavigationContainer onReady={onLayoutRootView}>
      <RootNavigator />
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppInner />
    </AuthProvider>
  );
}
