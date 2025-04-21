import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-paper';

export default function VisitDetailsScreen({ route, navigation }) {
    const { visit } = route.params || {};

    return (
        <ScrollView style={styles.container}>
            <Card style={styles.card}>
                <Card.Content>
                    <Text style={styles.title}>Detalles de la Visita</Text>
                    <View style={styles.infoContainer}>
                        <Text style={styles.label}>Cliente:</Text>
                        <Text style={styles.value}>{visit?.cliente || 'Sin especificar'}</Text>
                    </View>
                    <View style={styles.infoContainer}>
                        <Text style={styles.label}>Fecha:</Text>
                        <Text style={styles.value}>{visit?.fecha || 'Sin especificar'}</Text>
                    </View>
                    <View style={styles.infoContainer}>
                        <Text style={styles.label}>Dirección:</Text>
                        <Text style={styles.value}>{visit?.direccion || 'Sin especificar'}</Text>
                    </View>
                    <View style={styles.infoContainer}>
                        <Text style={styles.label}>Hora:</Text>
                        <Text style={styles.value}>{visit?.hora || 'Sin especificar'}</Text>
                    </View>
                    <View style={styles.infoContainer}>
                        <Text style={styles.label}>Estado:</Text>
                        <Text style={styles.value}>{visit?.estado || 'Sin especificar'}</Text>
                    </View>
                    <View style={styles.infoContainer}>
                        <Text style={styles.label}>Notas:</Text>
                        <Text style={styles.value}>{visit?.notas || 'Sin notas'}</Text>
                    </View>
                </Card.Content>
            </Card>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f5f5f5',
    },
    card: {
        marginVertical: 8,
        elevation: 4,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    infoContainer: {
        marginBottom: 12,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    value: {
        fontSize: 16,
        color: '#666',
    },
});