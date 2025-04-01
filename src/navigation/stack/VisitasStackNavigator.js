import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialIcons } from '@expo/vector-icons';

import VisitasScreen from '../../screens/VisitasScreen';
import DetalleVisitaScreen from '../../screens/VisitasScreens/DetalleVisitaScreen';

const Stack = createStackNavigator();

const VisitasStackNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerBackImage: () => (
                    <MaterialIcons name="chevron-left" size={24} color="black" />
                ),
            }}
        >
            <Stack.Screen name="Visitas" component={VisitasScreen}/>
            <Stack.Screen name="DetalleVisita" component={DetalleVisitaScreen}/>
        </Stack.Navigator>
    );
};

export default VisitasStackNavigator;