import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import RegisterForm from '../components/Auth/RegisterForm';

const RegisterScreen = () => {
    const navigation = useNavigation();

    const handleRegister = () => {
        navigation.navigate('Login');
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Crear cuenta</Text>
                <Text style={styles.subtitle}>Completa los campos para crear tu cuenta</Text>
            </View>
            <RegisterForm onRegister={handleRegister} />
            <TouchableOpacity 
                style={styles.loginButton} 
                onPress={() => navigation.navigate('Login')}
            >
                <Text style={styles.loginButtonText}>¿Ya tienes cuenta? Inicia sesión</Text>
            </TouchableOpacity>
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
    loginButton: {
        marginTop: 20,
        alignItems: 'center',
    },
    loginButtonText: {
        color: '#007AFF',
        fontSize: 16,
        textDecorationLine: 'underline',
    },
});

export default RegisterScreen;