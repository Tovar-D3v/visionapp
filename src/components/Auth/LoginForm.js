import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, ActivityIndicator, Alert, KeyboardAvoidingView, TouchableOpacity, Text } from 'react-native';
import { FIREBASE_AUTH } from '../../Firebaseconfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

const LoginForm = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const auth = FIREBASE_AUTH;

    const handleSubmit = async () => {
        if (!email || !password) {
            Alert.alert('Error', 'Por favor completa todos los campos');
            return;
        }
        setLoading(true);
        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log('Inicio de sesión exitoso');
            onLogin({ email, password });
        } catch (error) {
            Alert.alert('Error al iniciar sesión', error.message || 'Falló el inicio de sesión');
            console.error('Error al iniciar sesión:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSignUp = async () => {
        if (!email || !password) {
            Alert.alert('Error', 'Por favor completa todos los campos');
            return;
        }
        setLoading(true);
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            Alert.alert('Cuenta creada', 'Revisa tu correo electrónico');
            console.log('Cuenta creada exitosamente');
        } catch (error) {
            Alert.alert('Error al registrarse', error.message || 'Falló el registro');
            console.error('Error al registrarse:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Correo electrónico"
                    autoCapitalize="none"
                    onChangeText={setEmail}
                    value={email}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Contraseña"
                    secureTextEntry={true}
                    autoCapitalize="none"
                    onChangeText={setPassword}
                    value={password}
                />
            </View>

            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <View style={styles.buttonContainer}>
                    <Button title="Iniciar sesión" onPress={handleSubmit} />
                    <TouchableOpacity style={styles.registerButton} onPress={handleSignUp}>
                        <Text style={styles.registerButtonText}>Crear cuenta</Text>
                    </TouchableOpacity>
                </View>
            )}
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    inputContainer: {
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    buttonContainer: {
        alignItems: 'center',
    },
    registerButton: {
        marginTop: 15,
    },
    registerButtonText: {
        color: '#007AFF',
        fontSize: 16,
        textDecorationLine: 'underline',
    },
});

export default LoginForm;