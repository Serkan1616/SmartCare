import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfileEditPage({ navigation }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const handleUpdateProfile = async () => {
        const token = await AsyncStorage.getItem('userToken');
        if (!token) {
            Alert.alert("Error", "No authentication token found.");
            return;
        }

        const response = await fetch('http://192.168.63.138:5000/api/profile/update-profile', {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, currentPassword, newPassword })
        });

        const data = await response.json();
        if (response.ok) {
            Alert.alert("Success", "Profile updated successfully!");
            navigation.goBack();
        } else {
            Alert.alert("Error", data.msg);
        }
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.sectionTitle}>Edit Profile</Text>

                {/* Name Input */}
                <View style={styles.inputContainer}>
                    <Icon name="user" type="font-awesome" color="#211C84" size={20} />
                    <TextInput
                        style={styles.input}
                        placeholder="Enter new name"
                        value={name}
                        onChangeText={setName}
                    />
                </View>

                {/* Email Input */}
                <View style={styles.inputContainer}>
                    <Icon name="envelope" type="font-awesome" color="#211C84" size={20} />
                    <TextInput
                        style={styles.input}
                        placeholder="Enter new email"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                    />
                </View>

                <Text style={styles.sectionTitle}>Change Password</Text>

                {/* Current Password Input */}
                <View style={styles.inputContainer}>
                    <Icon name="lock" type="font-awesome" color="#E53935" size={20} />
                    <TextInput
                        style={styles.input}
                        placeholder="Current password"
                        value={currentPassword}
                        onChangeText={setCurrentPassword}
                        secureTextEntry
                    />
                </View>

                {/* New Password Input */}
                <View style={styles.inputContainer}>
                    <Icon name="key" type="font-awesome" color="#4CAF50" size={20} />
                    <TextInput
                        style={styles.input}
                        placeholder="New password"
                        value={newPassword}
                        onChangeText={setNewPassword}
                        secureTextEntry
                    />
                </View>

                {/* Update Button */}
                <TouchableOpacity style={styles.updateButton} onPress={handleUpdateProfile}>
                    <Text style={styles.updateButtonText}>Update Profile</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f5f5', padding: 15 },
    card: { borderRadius: 12, padding: 20, backgroundColor: '#fff', elevation: 3, marginTop: 20 },
    sectionTitle: { fontSize: 20, fontWeight: 'bold', color: '#211C84', textAlign: 'center', marginBottom: 10 },

    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F8F9FA',
        padding: 12,
        borderRadius: 8,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: '#E0E0E0'
    },
    input: { flex: 1, marginLeft: 10, fontSize: 16, color: '#333' },

    updateButton: { backgroundColor: '#4D55CC', padding: 12, borderRadius: 8, marginTop: 15, alignItems: 'center' },
    updateButtonText: { color: 'white', fontSize: 16, fontWeight: 'bold' }
});
