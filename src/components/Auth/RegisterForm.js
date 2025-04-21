import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, ActivityIndicator, Alert, KeyboardAvoidingView } from 'react-native';
import { FIREBASE_AUTH, FIRESTORE_DB } from '../../Firebaseconfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';

const RegisterForm = ({ onRegister }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        phone: '',
    });
    const [loading, setLoading] = useState(false);
    const auth = FIREBASE_AUTH;

    const handleChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = async () => {
        if (!validateForm()) return;

        setLoading(true);
        try {
            // Create user in Firebase Auth
            const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
            const user = userCredential.user;

            // Create user profile in Firestore
            const usersCollection = collection(FIRESTORE_DB, 'users');
            await addDoc(usersCollection, {
                email: formData.email,
                firstName: formData.firstName,
                lastName: formData.lastName,
                phone: formData.phone,
                createdAt: new Date().toISOString(),
                uid: user.uid
            });

            Alert.alert('Éxito', 'Cuenta creada exitosamente');
            onRegister();
        } catch (error) {
            Alert.alert('Error', error.message || 'Error al crear la cuenta');
            console.error('Error al registrar:', error);
        } finally {
            setLoading(false);
        }
    };

    const validateForm = () => {
        if (!formData.email || !formData.password || !formData.confirmPassword ||
            !formData.firstName || !formData.lastName || !formData.phone) {
            Alert.alert('Error', 'Por favor completa todos los campos');
            return false;
        }

        if (formData.password !== formData.confirmPassword) {
            Alert.alert('Error', 'Las contraseñas no coinciden');
            return false;
        }

        if (formData.password.length < 8) {
            Alert.alert('Error', 'La contraseña debe tener al menos 8 caracteres');
            return false;
        }

        return true;
    };

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Nombre"
                    value={formData.firstName}
                    onChangeText={(text) => handleChange('firstName', text)}
                    autoCapitalize="words"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Apellido"
                    value={formData.lastName}
                    onChangeText={(text) => handleChange('lastName', text)}
                    autoCapitalize="words"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Teléfono"
                    value={formData.phone}
                    onChangeText={(text) => handleChange('phone', text)}
                    keyboardType="phone-pad"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Correo electrónico"
                    value={formData.email}
                    onChangeText={(text) => handleChange('email', text)}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Contraseña"
                    value={formData.password}
                    onChangeText={(text) => handleChange('password', text)}
                    secureTextEntry
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Confirmar contraseña"
                    value={formData.confirmPassword}
                    onChangeText={(text) => handleChange('confirmPassword', text)}
                    secureTextEntry
                    autoCapitalize="none"
                />
            </View>

            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <View style={styles.buttonContainer}>
                    <Button title="Crear cuenta" onPress={handleSubmit} />
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
});

export default RegisterForm;