import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DetalleVisita from '../../components/DetalleVisita';

const DetalleVisitaScreen = ({ route }) => {
    const { visita } = route.params;

    return (
        <View style={styles.container}>
            <DetalleVisita visita={visita} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
});

export default DetalleVisitaScreen;