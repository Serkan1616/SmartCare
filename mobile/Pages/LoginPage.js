import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert, StyleSheet, ImageBackground } from 'react-native';
import { Icon } from 'react-native-elements'; // İkonları eklemek için
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginPage({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Error', 'Please enter email and password.');
            return;
        }

        try {
            const response = await fetch('http://192.168.63.138:5000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                await AsyncStorage.setItem('userToken', data.token);

                Alert.alert('Login Successful!', `Welcome ${data.user.name}`);
                navigation.navigate('Home');
            } else {
                Alert.alert('Error', data.msg);
            }
        } catch (error) {
            Alert.alert('Error', 'Something went wrong.');
        }
    };


    return (
        <ImageBackground
            source={{ uri: 'https://images.unsplash.com/photo-1638202993928-7267aad84c31?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }} // Sağlık temalı arka plan resmi
            style={styles.background}
        >
            <View style={styles.container}>
                {/* Uygulama adı */}
                <Text style={styles.header}>SmartCare</Text>

                {/* Email Girişi */}
                <View style={styles.inputContainer}>
                    <Icon name="email" size={24} color="#211C84" />
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        value={email}
                        onChangeText={setEmail}
                        placeholderTextColor="#ccc"
                    />
                </View>

                {/* Şifre Girişi */}
                <View style={styles.inputContainer}>
                    <Icon name="lock" size={24} color="#211C84" />
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                        placeholderTextColor="#ccc"
                    />
                </View>

                {/* Giriş Butonu */}
                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>

                {/* Şifreyi Unuttum Linki */}
                <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
                    <Text style={styles.link}>Forgot Password?</Text>
                </TouchableOpacity>

                {/* Kayıt Ol Linki */}
                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                    <Text style={styles.registerButtonText}>Don't have an account? Register</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        resizeMode: 'cover',
    },
    container: {
        width: '85%',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        padding: 30,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5,
    },
    header: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#211C84',
        textAlign: 'center',
        marginBottom: 30,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        marginBottom: 15,
        paddingLeft: 15,
        fontSize: 16,
        backgroundColor: '#fff',
    },
    input: {
        flex: 1,
        height: 50,
        fontSize: 16,
        paddingLeft: 10,
    },
    button: {
        backgroundColor: '#211C84',
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 15,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    link: {
        color: '#211C84',
        textAlign: 'center',
        fontSize: 14,
        marginBottom: 20,
    },
    registerButtonText: {
        color: '#211C84',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
