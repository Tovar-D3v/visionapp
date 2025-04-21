import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function ProfileScreen() {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image 
                    source={{ uri: 'https://via.placeholder.com/150' }}
                    style={styles.profileImage}
                />
                <Text style={styles.name}>Nombre Usuario</Text>
                <Text style={styles.role}>Cargo/Posición</Text>
            </View>

            <View style={styles.statsContainer}>
                <View style={styles.statItem}>
                    <Text style={styles.statNumber}>120</Text>
                    <Text style={styles.statLabel}>Visitas</Text>
                </View>
                <View style={styles.statItem}>
                    <Text style={styles.statNumber}>95%</Text>
                    <Text style={styles.statLabel}>Completadas</Text>
                </View>
                <View style={styles.statItem}>
                    <Text style={styles.statNumber}>5</Text>
                    <Text style={styles.statLabel}>Pendientes</Text>
                </View>
            </View>

            <View style={styles.optionsContainer}>
                <TouchableOpacity style={styles.option}>
                    <MaterialIcons name="settings" size={24} color="#666" />
                    <Text style={styles.optionText}>Ajustes</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.option}>
                    <MaterialIcons name="notifications" size={24} color="#666" />
                    <Text style={styles.optionText}>Notificaciones</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.option}>
                    <MaterialIcons name="help" size={24} color="#666" />
                    <Text style={styles.optionText}>Ayuda</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        alignItems: 'center',
        paddingTop: 40,
        paddingBottom: 20,
        backgroundColor: '#fff',
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 16,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    role: {
        fontSize: 16,
        color: '#666',
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 20,
        backgroundColor: '#fff',
    },
    statItem: {
        alignItems: 'center',
    },
    statNumber: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    statLabel: {
        fontSize: 14,
        color: '#666',
    },
    optionsContainer: {
        marginTop: 20,
        padding: 16,
    },
    option: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    optionText: {
        marginLeft: 12,
        fontSize: 16,
        color: '#333',
    },
});