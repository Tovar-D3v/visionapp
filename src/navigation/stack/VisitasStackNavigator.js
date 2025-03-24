import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import VisitasScreen from '../../screens/VisitasScreen';
import DetalleVisitaScreen from '../../screens/VisitasScreens/DetalleVisitaScreen';

const Stack = createStackNavigator();

const VisitasStackNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Visitas" component={VisitasScreen} />
            <Stack.Screen name="DetalleVisita" component={DetalleVisitaScreen} />
        </Stack.Navigator>
    );
};

export default VisitasStackNavigator;