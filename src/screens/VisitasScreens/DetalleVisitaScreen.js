import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DetalleVisitaScreen = ({ route }) => {
    const { visita } = route.params;

    return (
        //TODO: Meter esto en un componente llamado DetalleVisita y solo importarlo aquí, mejorar esta pantalla, agregarle imagenes y otras bobaditas
        <View style={styles.container}>
            <Text style={styles.title}>{visita.cliente}</Text>
            <Text>{visita.nota}</Text>
            <Text>{visita.vendedor}</Text>
            <Text>{visita.fecha}</Text>
            <Text>{visita.tipo}</Text>
            <Text>{visita.viaticos}</Text>
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