import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';

export default function HomeScreen({ navigation }) {
    const [upcomingVisits, setUpcomingVisits] = useState([]);

    // Simulación de datos (en una aplicación real, esto vendría de una API)
    useEffect(() => {
        const mockVisits = [
            {
                id: 1,
                cliente: 'Juan Pérez',
                fecha: '2025-04-17',
                hora: '10:00 AM',
                estado: 'Pendiente',
                direccion: 'Calle 123',
            },
            {
                id: 2,
                cliente: 'María García',
                fecha: '2025-04-18',
                hora: '14:30 PM',
                estado: 'Confirmada',
                direccion: 'Avenida 456',
            },
        ];
        setUpcomingVisits(mockVisits);
    }, []);

    const renderVisitItem = ({ item }) => (
        <Card style={styles.card}>
            <Card.Content>
                <View style={styles.visitHeader}>
                    <Text style={styles.clientName}>{item.cliente}</Text>
                    <Text style={styles.visitStatus}>{item.estado}</Text>
                </View>
                <View style={styles.visitInfo}>
                    <Text style={styles.visitDate}>{item.fecha}</Text>
                    <Text style={styles.visitTime}>{item.hora}</Text>
                </View>
                <View style={styles.visitAddress}>
                    <MaterialIcons name="place" size={18} color="#666" />
                    <Text style={styles.addressText}>{item.direccion}</Text>
                </View>
                <TouchableOpacity 
                    style={styles.detailsButton}
                    onPress={() => navigation.navigate('Detalles', { visit: item })}
                >
                    <Text style={styles.buttonText}>Ver Detalles</Text>
                </TouchableOpacity>
            </Card.Content>
        </Card>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Próximas Visitas</Text>
            </View>
            <FlatList
                data={upcomingVisits}
                renderItem={renderVisitItem}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.listContainer}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        padding: 16,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    listContainer: {
        padding: 16,
    },
    card: {
        marginBottom: 16,
        elevation: 4,
    },
    visitHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    clientName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    visitStatus: {
        fontSize: 14,
        color: '#4CAF50',
        fontWeight: 'bold',
    },
    visitInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    visitDate: {
        fontSize: 16,
        color: '#666',
    },
    visitTime: {
        fontSize: 16,
        color: '#666',
    },
    visitAddress: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    addressText: {
        fontSize: 14,
        color: '#666',
        marginLeft: 8,
    },
    detailsButton: {
        backgroundColor: '#007AFF',
        padding: 8,
        borderRadius: 4,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});