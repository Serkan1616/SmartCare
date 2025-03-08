// Pages/ForgotPasswordPage.js
import React, { useState } from 'react';
import { View, StyleSheet, Alert, ImageBackground, TouchableOpacity } from 'react-native';
import { Input, Text } from 'react-native-elements';

export default function ForgotPasswordPage({ navigation }) {
    const [email, setEmail] = useState('');

    const handleResetPassword = () => {
        if (email) {
            // For now, we navigate directly to the CreatePassword page.
            navigation.navigate('CreatePassword');
        } else {
            Alert.alert('Error', 'Please enter your email.');
        }
    };

    return (
        <ImageBackground
            source={{ uri: 'https://plus.unsplash.com/premium_vector-1723620847140-aba43a488076?q=80&w=1950&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }} // Arka plan resmi eklenebilir
            style={styles.background}
        >
            <View style={styles.container}>
                <Text h3 style={styles.header}>Forgot Password</Text>
                <Input
                    placeholder="Enter your email"
                    leftIcon={{ type: 'material', name: 'email' }}
                    onChangeText={setEmail}
                    value={email}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    containerStyle={styles.inputContainer}
                    inputStyle={styles.input}
                />
                {/* Reset Link Button */}
                <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
                    <Text style={styles.buttonText}>Send Reset Link</Text>
                </TouchableOpacity>
                {/* Back to Login Button */}
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.backButton}
                >
                    <Text style={styles.backButtonText}>Back to Login</Text>
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
    },
    container: {
        width: '85%',
        backgroundColor: 'rgba(255, 255, 255, 0.8)', // Yumuşak opaklık arka plan
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
        color: '#211C84', // Ana renk
        textAlign: 'center',
        marginBottom: 30,
    },
    inputContainer: {
        marginBottom: 15,
    },
    input: {
        backgroundColor: '#fff',
        borderRadius: 8,
        paddingLeft: 15,
        fontSize: 16,
    },
    button: {
        backgroundColor: '#4D55CC', // Ana renk
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    backButton: {
        marginTop: 20,
    },
    backButtonText: {
        color: '#211C84',
        fontSize: 16,
        textAlign: 'center',
    },
});
