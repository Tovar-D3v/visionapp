import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LoginForm from '../components/Auth/LoginForm';

const LoginScreen = () => {
    const navigation = useNavigation();

    const handleLogin = (credentials) => {
        console.log('Inicio de sesión exitoso');
        navigation.navigate('App');
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Bienvenido</Text>
                <Text style={styles.subtitle}>Inicia sesión para continuar</Text>
            </View>
            <LoginForm onLogin={handleLogin} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    header: {
        alignItems: 'center',
        marginBottom: 40,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
    },
});

export default LoginScreen;