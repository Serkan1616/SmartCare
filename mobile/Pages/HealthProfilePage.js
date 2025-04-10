import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Icon } from 'react-native-elements';

export default function HealthProfilePage({ navigation }) {
    const [healthData, setHealthData] = useState({
        age: '',
        height: '',
        weight: '',
        bloodType: '',
        smoking: '',
        alcohol: '',
        medicalConditions: ''
    });

    useEffect(() => {
        fetchHealthProfile();
    }, []);

    const fetchHealthProfile = async () => {
        try {
            const token = await AsyncStorage.getItem('userToken');
            const response = await fetch('http://192.168.63.138:5000/api/profile', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();
            if (response.ok && data.healthProfile) {
                setHealthData(data.healthProfile);
            }
        } catch (error) {
            console.error("Error fetching health profile:", error);
        }
    };

    const handleSave = async () => {
        try {
            const token = await AsyncStorage.getItem('userToken');
            const response = await fetch('http://192.168.63.138:5000/api/profile/update', {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(healthData)
            });

            const data = await response.json();
            if (response.ok) {
                Alert.alert('Success', 'Health profile updated successfully!');
                navigation.goBack();
            } else {
                Alert.alert('Error', data.msg);
            }
        } catch (error) {
            Alert.alert('Error', 'Something went wrong.');
        }
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}>Health Profile</Text>

            <View style={styles.card}>
                <View style={styles.inputContainer}>
                    <Icon name="calendar" type="font-awesome" color="#211C84" size={20} />
                    <TextInput style={styles.input} placeholder="Age" keyboardType="numeric"
                        value={healthData.age} onChangeText={(text) => setHealthData({ ...healthData, age: text })} />
                </View>

                <View style={styles.inputContainer}>
                    <Icon name="human-male-height" type="material-community" color="#211C84" size={20} />
                    <TextInput style={styles.input} placeholder="Height (cm)"
                        value={healthData.height} onChangeText={(text) => setHealthData({ ...healthData, height: text })} />
                </View>

                <View style={styles.inputContainer}>
                    <Icon name="weight" type="material-community" color="#211C84" size={20} />
                    <TextInput style={styles.input} placeholder="Weight (kg)"
                        value={healthData.weight} onChangeText={(text) => setHealthData({ ...healthData, weight: text })} />
                </View>

                <View style={styles.inputContainer}>
                    <Icon name="tint" type="font-awesome" color="#E53935" size={20} />
                    <TextInput style={styles.input} placeholder="Blood Type"
                        value={healthData.bloodType} onChangeText={(text) => setHealthData({ ...healthData, bloodType: text })} />
                </View>

                <View style={styles.inputContainer}>
                    <Icon name="smoking-ban" type="font-awesome" color={healthData.smoking === 'No' ? "#4CAF50" : "#E53935"} size={20} />
                    <TextInput style={styles.input} placeholder="Smoking (Yes/No)"
                        value={healthData.smoking} onChangeText={(text) => setHealthData({ ...healthData, smoking: text })} />
                </View>

                <View style={styles.inputContainer}>
                    <Icon name="glass-martini-alt" type="font-awesome-5" color={healthData.alcohol === 'No' ? "#4CAF50" : "#E53935"} size={20} />
                    <TextInput style={styles.input} placeholder="Alcohol (Yes/No)"
                        value={healthData.alcohol} onChangeText={(text) => setHealthData({ ...healthData, alcohol: text })} />
                </View>

                <View style={styles.inputContainer}>
                    <Icon name="medkit" type="font-awesome" color="#FFA000" size={20} />
                    <TextInput style={styles.input} placeholder="Medical Conditions"
                        value={healthData.medicalConditions} onChangeText={(text) => setHealthData({ ...healthData, medicalConditions: text })} />
                </View>

                <TouchableOpacity style={styles.button} onPress={handleSave}>
                    <Text style={styles.buttonText}>Save Profile</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F5F5F5', padding: 20 },
    header: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20, color: '#211C84' },
    card: { backgroundColor: 'white', padding: 20, borderRadius: 12, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10, elevation: 5 },
    inputContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F8F9FA', padding: 10, borderRadius: 8, marginBottom: 10, borderWidth: 1, borderColor: '#E0E0E0' },
    input: { flex: 1, marginLeft: 10, fontSize: 16, color: '#333' },
    button: { backgroundColor: '#211C84', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 10 },
    buttonText: { color: 'white', fontSize: 18, fontWeight: 'bold' }
});
