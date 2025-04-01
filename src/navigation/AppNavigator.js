import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, MaterialIcons, AntDesign } from '@expo/vector-icons';

import HomeScreen from '../screens/homeScreen';
import ClientesScreen from '../screens/ClientesScreen';
import SettingsScreen from '../screens/SettingsScreen';
import CrearVisitaScreen from '../screens/CrearVisitaScreen';
import VisitasStackNavigator from './stack/VisitasStackNavigator';

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    let icono;

                    if (route.name === 'Inicio') {
                        icono = 'home';
                        return <AntDesign name={icono} size={size} color={color} />;
                    } else if (route.name === 'Ajustes') {
                        icono = 'settings-outline';
                        return <Ionicons name={icono} size={size} color={color} />;
                    } else if (route.name === 'Explorar') {
                        icono = 'explore';
                    } else if (route.name === 'Crear') {
                        icono = 'earth-outline';
                        return <Ionicons name={icono} size={size} color={color} />;
                    } else if (route.name === 'Clientes') {
                        icono = 'group';
                    }

                    return <MaterialIcons name={icono} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#fff',
                tabBarInactiveTintColor: '#8e8e93',
                headerShown: false,
                tabBarStyle: {
                    position: 'absolute',
                    bottom: 32,
                    left: 20,
                    right: 20,
                    elevation: 0,
                    backgroundColor: '#000',
                    borderRadius: 20,
                    height: 62,
                    width: '95%',
                    paddingTop: 5,
                    shadowColor: '#000',
                    shadowOpacity: 0.06,
                    shadowOffset: {
                        width: 10,
                        height: 10,
                    },
                    alignSelf: 'center',
                    marginHorizontal: '2.5%',
                },
                tabBarItemStyle: {
                    justifyContent: 'center',
                },
            })}
        >
            <Tab.Screen name="Inicio" component={HomeScreen} />
            <Tab.Screen name="Clientes" component={ClientesScreen} />
            <Tab.Screen name="Crear" component={CrearVisitaScreen} />
            <Tab.Screen name="Explorar" component={VisitasStackNavigator} />
            <Tab.Screen name="Ajustes" component={SettingsScreen} />
        </Tab.Navigator>
    );
}