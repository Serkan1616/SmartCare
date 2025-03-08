import React from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import { Button, Text } from 'react-native-elements';

export default function EntryScreen({ navigation }) {
    return (
        <ImageBackground
            source={{ uri: 'https://images.unsplash.com/photo-1638202993928-7267aad84c31?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }} // Sağlık temalı bir arka plan
            style={styles.background}
        >
            <View style={styles.container}>
                <Text h3 style={styles.header}>Welcome to SmartCare</Text>

                {/* Sign In Button */}
                <Button
                    title="Login"
                    onPress={() => navigation.navigate('Login')}
                    containerStyle={styles.button}
                    buttonStyle={styles.primaryButton}
                    titleStyle={styles.buttonText}
                />

                {/* Register Button */}
                <Button
                    title="Register"
                    onPress={() => navigation.navigate('Register')}
                    containerStyle={styles.button}
                    buttonStyle={styles.outlineButton}
                    titleStyle={styles.buttonTextOutline}
                    type="outline"
                />
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
        backgroundColor: 'rgba(255, 255, 255, 0.8)', // Hafif opaklık
        padding: 30,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5,
        alignItems: 'center',
    },
    header: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#211C84', // Kullanıcı istediği mor renk
        textAlign: 'center',
        marginBottom: 40,
    },
    button: {
        width: '100%',
        marginBottom: 20,
    },
    primaryButton: {
        backgroundColor: '#211C84', // Mor renk
        paddingVertical: 15,
        borderRadius: 8,
        elevation: 5,
    },
    outlineButton: {
        borderColor: '#211C84',
        borderWidth: 2,
        paddingVertical: 15,
        borderRadius: 8,
    },
    buttonText: {
        color: '#fff', // Buton metni beyaz
        fontSize: 18,
        fontWeight: 'bold',
    },
    buttonTextOutline: {
        color: '#211C84', // Outline buton için yazı rengi mor
        fontSize: 18,
        fontWeight: 'bold',
    },
});
