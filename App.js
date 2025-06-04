import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect, useRef, useState } from "react";
import { Alert, Platform } from "react-native";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";

import { AuthProvider, useAuth } from "./src/context/AuthProvider";
import WelcomeScreen from "./src/screens/WelcomeScreen";
import AdminNavigation from "./src/navigation/adminNavigation";
import UserNavigation from "./src/navigation/userNavigation";
import LoginScreen from "./src/screens/LoginScreen";

SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();

// Configurar comportamiento de notificaciones en primer plano
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

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

export default function App() {
  const [expoPushToken, setExpoPushToken] = useState('');
  const notificationListener = useRef();
  const responseListener = useRef();

  const onLayoutRootView = useCallback(async () => {
    await SplashScreen.hideAsync();
  }, []);

  useEffect(() => {
    console.log("Iniciando registro de notificaciones...");

    registerForPushNotificationsAsync().then(token => {
      console.log("Resultado del token:", token);
      if (token) {
        setExpoPushToken(token);
        console.log("Expo Push Token:", token);
        enviarTokenAlBackend(token);
      } else {
        console.warn("No se obtuvo token");
      }
    });

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      console.log("Notificación recibida:", notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log("Notificación tocada:", response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <AuthProvider>
      <NavigationContainer onReady={onLayoutRootView}>
        <RootNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}

// Función para obtener permisos y token
async function registerForPushNotificationsAsync() {
  console.log("Verificando si es un dispositivo...");
  if (!Device.isDevice) {
    Alert.alert("Error", "Debes usar un dispositivo físico para recibir notificaciones");
    return null;
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  console.log("Permisos existentes:", existingStatus);
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
    console.log("Permisos después de solicitar:", finalStatus);
  }

  if (finalStatus !== 'granted') {
    Alert.alert("Permiso denegado", "No se concedieron permisos para notificaciones.");
    return null;
  }

  try {
    const token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log("📦 Token obtenido desde Expo:", token);
    return token;
  } catch (error) {
    console.error("❌ Error al obtener el token:", error);
    return null;
  }
}

async function enviarTokenAlBackend(token) {
  try {
    await fetch("https://tu-backend.com/api/guardar-token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: token,
        userId: 123,
      }),
    });
  } catch (error) {
    console.error("Error al enviar el token al backend:", error);
  }
}
