import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, ActivityIndicator, Alert, TouchableOpacity, Text } from 'react-native';
import { Avatar, Button, Card } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { Icon } from 'react-native-elements'; // İkonlar için

export default function ProfilePage({ navigation }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useFocusEffect(
        React.useCallback(() => {
            fetchProfile();
        }, [])
    );

    const fetchProfile = async () => {
        setLoading(true); // ✅ Yükleme başlıyor
        try {
            const token = await AsyncStorage.getItem('userToken');
            if (!token) {
                Alert.alert("Error", "No authentication token found.");
                return;
            }

            const response = await fetch('http://192.168.43.138:5000/api/auth/profile', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`, // ✅ "Bearer" eklendi
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();
            if (response.ok) {
                setUser(data);
            } else {
                Alert.alert("Error", data.msg);
            }
        } catch (error) {
            Alert.alert("Error", "Something went wrong.");
        } finally {
            setLoading(false); // ✅ Hata olursa bile yükleme durmalı
        }
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#211C84" />;
    }

    return (
        <ScrollView style={styles.container}>
            <Card containerStyle={styles.card}>
                <View style={styles.profileHeader}>
                    <Avatar
                        rounded
                        size="large"
                        source={{ uri: user?.avatarUrl || 'https://randomuser.me/api/portraits/men/41.jpg' }}
                        containerStyle={styles.avatar}
                    />
                    <View style={styles.userInfo}>
                        <Text h4 style={styles.userName}>{user?.name}</Text>
                        <Text style={styles.userEmail}>{user?.email}</Text>
                    </View>
                </View>

                <Card.Divider />

                <View style={styles.healthInfo}>
                    <Text style={styles.sectionTitle}>Health Information</Text>

                    <View style={styles.infoCard}>
                        <Icon name="calendar" type="font-awesome" color="#211C84" size={20} />
                        <Text style={styles.infoText}>Age: <Text style={styles.infoValue}>{user.healthProfile.age}</Text></Text>
                    </View>

                    <View style={styles.infoCard}>
                        <Icon name="human-male-height" type="material-community" color="#211C84" size={20} />
                        <Text style={styles.infoText}>Height: <Text style={styles.infoValue}>{user.healthProfile.height} cm</Text></Text>
                    </View>

                    <View style={styles.infoCard}>
                        <Icon name="weight" type="material-community" color="#211C84" size={20} />
                        <Text style={styles.infoText}>Weight: <Text style={styles.infoValue}>{user.healthProfile.weight} kg</Text></Text>
                    </View>

                    <View style={styles.infoCard}>
                        <Icon name="tint" type="font-awesome" color="#E53935" size={20} />
                        <Text style={styles.infoText}>Blood Type: <Text style={styles.infoValue}>{user.healthProfile.bloodType.toUpperCase()}</Text></Text>
                    </View>

                    <View style={styles.infoCard}>
                        <Icon name="smoking-ban" type="font-awesome" color={user.healthProfile.smoking === 'No' ? "#4CAF50" : "#E53935"} size={20} />
                        <Text style={styles.infoText}>Smoking: <Text style={styles.infoValue}>{user.healthProfile.smoking}</Text></Text>
                    </View>

                    <View style={styles.infoCard}>
                        <Icon name="glass-martini-alt" type="font-awesome-5" color={user.healthProfile.alcohol === 'No' ? "#4CAF50" : "#E53935"} size={20} />
                        <Text style={styles.infoText}>Alcohol: <Text style={styles.infoValue}>{user.healthProfile.alcohol}</Text></Text>
                    </View>

                    <View style={styles.infoCard}>
                        <Icon name="medkit" type="font-awesome" color="#FFA000" size={20} />
                        <Text style={styles.infoText}>Medical Conditions:</Text>
                        <Text style={styles.infoValue}>{user.healthProfile.medicalConditions || "None"}</Text>
                    </View>

                    {/* Edit Button */}
                    <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate('HealthProfile')}>
                        <Text style={styles.editButtonText}>Edit Profile</Text>
                    </TouchableOpacity>
                </View>
            </Card>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f5f5', padding: 15 },
    card: { borderRadius: 12, padding: 20, backgroundColor: '#fff' },
    profileHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
    userName: { fontSize: 22, fontWeight: 'bold', color: '#211C84' },
    userEmail: { fontSize: 16, color: 'gray' },
    createProfileText: { color: '#211C84', fontSize: 18, fontWeight: 'bold', textAlign: 'center' },
    editButton: { backgroundColor: '#FF9800', padding: 10, borderRadius: 8, marginTop: 10, alignItems: 'center' },
    editButtonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
    healthInfo: { marginTop: 20 },
    sectionTitle: { fontSize: 20, fontWeight: 'bold', color: '#211C84', textAlign: 'center', marginBottom: 10 },
    infoCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F8F9FA',
        padding: 12,
        borderRadius: 8,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: '#E0E0E0'
    },
    infoText: { fontSize: 16, fontWeight: '600', color: '#333', marginLeft: 10 },
    infoValue: { fontSize: 16, fontWeight: 'bold', color: '#211C84' },
    editButton: { backgroundColor: '#FF9800', padding: 12, borderRadius: 8, marginTop: 15, alignItems: 'center' },
    editButtonText: { color: 'white', fontSize: 16, fontWeight: 'bold' }


});
