import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import visitas from '../utils/visitas.json';
import { formatearDinero } from '../utils/formatearDinero';

const VisitasScreen = ({ navigation }) => {
    const [sortedVisitas, setSortedVisitas] = useState([]);

    useEffect(() => {
        const sorted = [...visitas].sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
        setSortedVisitas(sorted);
    }, []);

    const renderItem = ({ item }) => {
        const date = new Date(item.fecha);
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'short' });
        const time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

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

        return (
            //TODO: Meter esto en un componente llamado CardVisita y solo importarlo aquí
            <TouchableOpacity onPress={() => navigation.navigate('DetalleVisita', { visita: item })}>
                <View style={styles.itemContainer}>
                    <View style={styles.dateContainer}>
                        <Text style={styles.day}>{day}</Text>
                        <Text style={styles.month}>{month}</Text>
                        <Text style={styles.time}>{time}</Text>
                    </View>
                    <View style={styles.infoContainer}>
                        <Text style={styles.cliente}>{item.cliente}</Text>
                        <Text style={styles.nota}>{item.nota}</Text>
                        <Text style={styles.vendedor}>{item.vendedor}</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 5 }}>
                            <Ionicons name={getIconName(item.tipo)} size={20} color="#000" style={styles.icon} />
                            <Text>${formatearDinero(item.viaticos)}</Text>
                        </View>
                    </View>
                    <View style={{ justifyContent: 'center' }}>
                        <Ionicons name="chevron-forward" size={24} color="#000" />
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={sortedVisitas}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
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