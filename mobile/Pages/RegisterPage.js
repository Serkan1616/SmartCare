import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert, StyleSheet, ImageBackground } from 'react-native';
import { Icon } from 'react-native-elements'; // İkonları eklemek için

export default function RegisterPage({ navigation }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = () => {
        // Basit doğrulama (gerçek uygulamada API ile bağlantı yapılmalı)
        if (name && email && password) {
            Alert.alert('Registration Successful!', 'You can now log in.');
            navigation.navigate('Login');
        } else {
            Alert.alert('Error', 'Please fill out all fields.');
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

                {/* Name Girişi */}
                <View style={styles.inputContainer}>
                    <Icon name="person" size={24} color="#211C84" />
                    <TextInput
                        style={styles.input}
                        placeholder="Full Name"
                        value={name}
                        onChangeText={setName}
                        placeholderTextColor="#ccc"
                    />
                </View>

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

                {/* Kayıt Ol Butonu */}
                <TouchableOpacity style={styles.button} onPress={handleRegister}>
                    <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>

                {/* Kayıtlı olmayanlar için giriş bağlantısı */}
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.link}>Already have an account? Login</Text>
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
});
