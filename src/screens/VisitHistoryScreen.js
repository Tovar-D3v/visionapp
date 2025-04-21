import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Datos de muestra
const sampleVisits = [
    {
        id: 1,
        fecha: '17/04/2025',
        cliente: 'Juan Pérez',
        estado: 'Completada',
        tipo: 'Seguimiento',
        duracion: '1h 30m',
        calificacion: 5,
        ubicacion: 'Calle 123, Bogotá'
    },
    {
        id: 2,
        fecha: '16/04/2025',
        cliente: 'María Gómez',
        estado: 'Pendiente',
        tipo: 'Primera visita',
        duracion: '2h',
        calificacion: 4,
        ubicacion: 'Avenida 456, Medellín'
    },
    {
        id: 3,
        fecha: '15/04/2025',
        cliente: 'Carlos Rodríguez',
        estado: 'En progreso',
        tipo: 'Seguimiento',
        duracion: '1h',
        calificacion: 3,
        ubicacion: 'Carrera 789, Cali'
    },
    {
        id: 4,
        fecha: '14/04/2025',
        cliente: 'Ana Martínez',
        estado: 'Completada',
        tipo: 'Seguimiento',
        duracion: '2h 15m',
        calificacion: 5,
        ubicacion: 'Calle 101, Barranquilla'
    },
    {
        id: 5,
        fecha: '13/04/2025',
        cliente: 'Pedro Sánchez',
        estado: 'Pendiente',
        tipo: 'Primera visita',
        duracion: '1h 45m',
        calificacion: 4,
        ubicacion: 'Avenida 202, Cartagena'
    }
];

const VisitCard = ({ visit }) => {
    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'completada':
                return '#4CAF50';
            case 'pendiente':
                return '#FFC107';
            case 'en progreso':
                return '#2196F3';
            default:
                return '#666';
        }
    };

    return (
        <Card style={styles.card}>
            <Card.Content>
                <View style={styles.header}>
                    <Text style={styles.date}>{visit.fecha}</Text>
                    <View style={styles.statusContainer}>
                        <Text style={[styles.status, { color: getStatusColor(visit.estado) }]}>
                            {visit.estado}
                        </Text>
                    </View>
                </View>
                <Text style={styles.client}>{visit.cliente}</Text>
                <View style={styles.infoRow}>
                    <View style={styles.iconContainer}>
                        <MaterialCommunityIcons name="map-marker" size={20} color="#666" />
                        <Text style={styles.infoText}>{visit.ubicacion}</Text>
                    </View>
                    <View style={styles.iconContainer}>
                        <MaterialCommunityIcons name="clock" size={20} color="#666" />
                        <Text style={styles.infoText}>{visit.duracion}</Text>
                    </View>
                </View>
                <View style={styles.ratingContainer}>
                    {[...Array(5)].map((_, i) => (
                        <MaterialCommunityIcons
                            key={i}
                            name={i < visit.calificacion ? 'star' : 'star-outline'}
                            size={20}
                            color={i < visit.calificacion ? '#FFD700' : '#666'}
                        />
                    ))}
                </View>
                <TouchableOpacity 
                    style={styles.detailsButton}
                    onPress={() => {
                        // Navegar a los detalles de esta visita específica
                    }}
                >
                    <Text style={styles.buttonText}>Ver Detalles</Text>
                </TouchableOpacity>
            </Card.Content>
        </Card>
    );
};

export default function VisitHistoryScreen() {
    return (
        <View style={styles.container}>
            <FlatList
                data={sampleVisits}
                renderItem={({ item }) => <VisitCard visit={item} />}
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
    listContainer: {
        padding: 16,
    },
    card: {
        marginBottom: 16,
        borderRadius: 12,
        elevation: 4,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    date: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    statusContainer: {
        padding: 4,
        borderRadius: 4,
        backgroundColor: '#f0f0f0',
    },
    status: {
        fontSize: 12,
        fontWeight: 'bold',
    },
    client: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    infoText: {
        fontSize: 14,
        color: '#666',
        marginLeft: 8,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    detailsButton: {
        backgroundColor: '#007AFF',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
});