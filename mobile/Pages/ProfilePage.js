// Pages/ProfilePage.js
import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Avatar, Text, Button, Card } from 'react-native-elements';

export default function ProfilePage({ navigation }) {
    // Sample user data; in a real app, you'd fetch this from an API or context.
    const user = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        avatarUrl: 'https://randomuser.me/api/portraits/men/41.jpg',
        age: 30,
        height: '175 cm',
        weight: '75 kg',
        bloodType: 'O+',
        smoking: 'No',
        alcohol: 'Occasionally',
        medicalConditions: 'None',
    };

    return (
        <ScrollView style={styles.container}>
            <Card containerStyle={styles.card}>
                <View style={styles.profileHeader}>
                    <Avatar
                        rounded
                        size="large"
                        source={{ uri: user.avatarUrl }}
                        containerStyle={styles.avatar}
                    />
                    <View style={styles.userInfo}>
                        <Text h4 style={styles.userName}>{user.name}</Text>
                        <Text style={styles.userEmail}>{user.email}</Text>
                    </View>
                </View>

                <Card.Divider />

                <View style={styles.healthInfo}>
                    <Text style={styles.sectionTitle}>Health Information</Text>
                    <View style={styles.infoItem}>
                        <Text style={styles.infoLabel}>Age:</Text>
                        <Text style={styles.infoValue}>{user.age}</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Text style={styles.infoLabel}>Height:</Text>
                        <Text style={styles.infoValue}>{user.height}</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Text style={styles.infoLabel}>Weight:</Text>
                        <Text style={styles.infoValue}>{user.weight}</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Text style={styles.infoLabel}>Blood Type:</Text>
                        <Text style={styles.infoValue}>{user.bloodType}</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Text style={styles.infoLabel}>Smoking:</Text>
                        <Text style={styles.infoValue}>{user.smoking}</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Text style={styles.infoLabel}>Alcohol Consumption:</Text>
                        <Text style={styles.infoValue}>{user.alcohol}</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Text style={styles.infoLabel}>Medical Conditions:</Text>
                        <Text style={styles.infoValue}>{user.medicalConditions}</Text>
                    </View>
                </View>

                <Button
                    title="Edit Profile"
                    onPress={() => navigation.navigate('EditProfile')} // Navigate to an EditProfile page if implemented
                    buttonStyle={styles.editButton}
                    containerStyle={styles.buttonContainer}
                />
            </Card>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 15,
    },
    card: {
        borderRadius: 12,
        padding: 20,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
    },
    profileHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    avatar: {
        borderWidth: 2,
        borderColor: '#211C84', // Primary color for borders
    },
    userInfo: {
        marginLeft: 15,
    },
    userName: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#211C84', // Title color
    },
    userEmail: {
        fontSize: 16,
        color: 'gray',
    },
    healthInfo: {
        marginTop: 15,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#211C84',
        marginBottom: 15,
    },
    infoItem: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    infoLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#4D55CC', // Accent color for labels
    },
    infoValue: {
        fontSize: 16,
        color: 'gray',
        marginLeft: 10,
    },
    editButton: {
        backgroundColor: '#4D55CC',
        borderRadius: 8,
        paddingVertical: 12,
    },
    buttonContainer: {
        marginTop: 20,
    },
});
