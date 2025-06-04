import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, MaterialIcons, AntDesign } from "@expo/vector-icons";
import {
  Home,
  UsersRound,
  UserRound,
  MapPinned,
  Earth,
} from "lucide-react-native";
import { VisitasProvider } from "../context/VisitasProvider";
import { ClientesProvider } from "../context/ClientesProvider";

import HomeScreen from "../screens/homeScreen";
import ClientesScreen from "../screens/ClientesScreen";
import SettingsScreen from "../screens/SettingsScreen";
import CrearVisitaScreen from "../screens/CrearVisitaScreen";
import VisitasStackNavigator from "./stack/VisitasStackNavigator";

const Tab = createBottomTabNavigator();

export default function AdminNavigation() {
  return (
    <ClientesProvider>
      <VisitasProvider>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              size = 30;
              let icono;

              if (route.name === "Inicio") {
                return <Home color={color} size={size} />;
              } else if (route.name === "Ajustes") {
                return <UserRound size={size} color={color} />;
              } else if (route.name === "Explorar") {
                return <MapPinned size={size} color={color} />;
              } else if (route.name === "Crear") {
                icono = "earth-outline";
                return <Earth size={size} color={color} />;
              } else if (route.name === "Clientes") {
                return <UsersRound size={size} color={color} />;
              }

              return <MaterialIcons name={icono} size={size} color={color} />;
            },
            tabBarActiveTintColor: "#fff",
            tabBarInactiveTintColor: "#8e8e93",
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: {
              position: "absolute",
              bottom: 32,
              left: 20,
              right: 20,
              elevation: 0,
              backgroundColor: "#000",
              borderRadius: 50,
              height: 68,
              width: "85%",
              paddingTop: 15,
              shadowColor: "#000",
              shadowOpacity: 0.06,
              shadowOffset: {
                width: 10,
                height: 10,
              },
              alignSelf: "center",
              marginHorizontal: "7%",
            },
            tabBarItemStyle: {
              justifyContent: "center",
            },
          })}
        >
          <Tab.Screen name="Inicio" component={HomeScreen} />
          <Tab.Screen name="Clientes" component={ClientesScreen} />
          <Tab.Screen name="Crear" component={CrearVisitaScreen} />
          <Tab.Screen name="Explorar" component={VisitasStackNavigator} />
          <Tab.Screen name="Ajustes" component={SettingsScreen} />
        </Tab.Navigator>
      </VisitasProvider>
    </ClientesProvider>
  );
}
