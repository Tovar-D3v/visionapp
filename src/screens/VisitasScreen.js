import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import visitas from '../utils/visitas.json';
import { formatearDinero } from '../utils/formatearDinero';

import CardVisita from "../components/CardVisita";

const VisitasScreen = ({ navigation }) => {
    const [sortedVisitas, setSortedVisitas] = useState([]);

    useEffect(() => {
        const sorted = [...visitas].sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
        setSortedVisitas(sorted);
    }, []);

    const getIconName = (tipo) => {
        switch (tipo) {
            case 'reunión':
                return 'videocam-outline';
            case 'visita':
                return 'cafe-outline';
            default:
                return 'event';
        }
    };
    //TODO COMPLETADO✅
    //SE CREA COMPONENTE CardVisita
    return (
        <View style={styles.container}>
            <FlatList
                data={sortedVisitas}
                keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()}
                renderItem={({ item }) => (
                    <CardVisita
                        item={item}
                        navigation={navigation}
                        styles={styles}
                        getIconName={getIconName}
                        formatearDinero={formatearDinero}
                    />
                )}
            />
        </View>
    );
};



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingBottom: 100,
    },
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
    },
    infoContainer: {
        flex: 1,
    },
    cliente: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    nota: {
        fontSize: 16,
        color: '#555',
    },
    vendedor: {
        fontSize: 14,
        color: '#777',
    },
    icon: {

    },
    dateContainer: {
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#000',
        padding: 8,
        borderRadius: 8,
        marginRight: 16,
    },
    day: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    month: {
        fontSize: 18,
        color: '#555',
    },
    time: {
        fontSize: 14,
        color: '#999',
    },
});

export default VisitasScreen;