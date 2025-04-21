import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons, MaterialIcons, AntDesign } from '@expo/vector-icons';
import { FIREBASE_AUTH } from '../Firebaseconfig';
import { onAuthStateChanged } from 'firebase/auth';

import HomeScreen from '../screens/HomeScreen';
import VisitHistoryScreen from '../screens/VisitHistoryScreen';
import ProfileScreen from '../screens/ProfileScreen';
import VisitDetailsScreen from '../screens/VisitDetailsScreen';
import LoginScreen from '../screens/LoginScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function TabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    let iconName;
                    let IconComponent;

                    if (route.name === 'Inicio') {
                        iconName = 'home';
                        IconComponent = AntDesign;
                    } else if (route.name === 'Historial') {
                        iconName = 'history';
                        IconComponent = MaterialIcons;
                    } else if (route.name === 'Perfil') {
                        iconName = 'person';
                        IconComponent = MaterialIcons;
                    }

                    return <IconComponent name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#fff',
                tabBarInactiveTintColor: '#8e8e93',
                headerShown: false,
                tabBarStyle: {
                    className: 'absolute bottom-8 left-5 right-5 bg-black rounded-full h-16 w-full pt-1.5 shadow-lg'
                },
                tabBarItemStyle: {
                    className: 'justify-center'
                },
            })}
        >
            <Tab.Screen 
                name="Inicio" 
                component={HomeScreen} 
                options={{
                    title: 'Próximas Visitas'
                }}
            />
            <Tab.Screen 
                name="Historial" 
                component={VisitHistoryScreen} 
            />
            <Tab.Screen 
                name="Perfil" 
                component={ProfileScreen} 
            />
        </Tab.Navigator>
    );
}

function AuthNavigator() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="Login" component={LoginScreen} />
        </Stack.Navigator>
    );
}

export default function AppNavigator() {
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);

    React.useEffect(() => {
        const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
            setIsAuthenticated(!!user);
        });

        return unsubscribe;
    }, []);

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            {isAuthenticated ? (
                <Stack.Screen name="App" component={TabNavigator} />
            ) : (
                <Stack.Screen name="Auth" component={AuthNavigator} />
            )}
        </Stack.Navigator>
    );
}