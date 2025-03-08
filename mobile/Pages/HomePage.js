// Pages/HomePage.js
import React from 'react';
import { ScrollView, StyleSheet, View, Image } from 'react-native';
import { Text, Card, Button, Icon } from 'react-native-elements';

export default function HomePage({ navigation }) {
    return (
        <ScrollView style={styles.container}>
            {/* Başlık */}
            <Text h3 style={styles.header}>
                Welcome to Health & Cancer Prediction App
            </Text>

            {/* Sağlık Profil & Semptomlar Kartları (2 Card) */}
            <View style={styles.cardRow}>
                <Card containerStyle={styles.card}>
                    <Image
                        source={{ uri: 'https://images.unsplash.com/vector-1739647326693-5c3bf51aea69?q=80&w=2360&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }} // Placeholder Image
                        style={styles.cardImage}
                    />
                    <Card.Title>Health Profile</Card.Title>
                    <Card.Divider />
                    <Text style={styles.cardText}>
                        Create your health profile to track your personal health data.
                    </Text>
                    <Button
                        title="Create Health Profile"
                        onPress={() => navigation.navigate('HealthProfile')}
                        buttonStyle={styles.button}
                    />
                </Card>

                <Card containerStyle={styles.card}>
                    <Image
                        source={{ uri: 'https://images.unsplash.com/vector-1739647326693-5c3bf51aea69?q=80&w=2360&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }} // Placeholder Image
                        style={styles.cardImage}
                    />
                    <Card.Title>Symptoms Checker</Card.Title>
                    <Card.Divider />
                    <Text style={styles.cardText}>
                        Check your symptoms and get insights on possible health conditions.
                    </Text>
                    <Button
                        title="Check Symptoms"
                        onPress={() => navigation.navigate('Predictions')}
                        buttonStyle={styles.button}
                    />
                </Card>
            </View>

            {/* Sağlık Takibi & Kanser Tarama Kartları (2 Card) */}
            <View style={styles.cardRow}>
                <Card containerStyle={styles.card}>
                    <Image
                        source={{ uri: 'https://images.unsplash.com/vector-1739647326693-5c3bf51aea69?q=80&w=2360&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }} // Placeholder Image
                        style={styles.cardImage}
                    />
                    <Card.Title>Track Your Health</Card.Title>
                    <Card.Divider />
                    <Text style={styles.cardText}>
                        Keep track of your daily health activities like diet, exercise, and hydration.
                    </Text>
                    <Button
                        title="Track Health"
                        onPress={() => navigation.navigate('HealthTracking')}
                        buttonStyle={styles.button}
                    />
                </Card>

                <Card containerStyle={styles.card}>
                    <Image
                        source={{ uri: 'https://images.unsplash.com/vector-1739647326693-5c3bf51aea69?q=80&w=2360&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }} // Placeholder Image
                        style={styles.cardImage}
                    />
                    <Card.Title>Cancer Screening</Card.Title>
                    <Card.Divider />
                    <Text style={styles.cardText}>
                        Get personalized cancer screening recommendations based on your age and health profile.
                    </Text>
                    <Button
                        title="Get Screening Recommendations"
                        onPress={() => navigation.navigate('CancerScreening')}
                        buttonStyle={styles.button}
                    />
                </Card>
            </View>

            {/* Sağlık İpuçları & Öğrenme Butonları Kartları (2 Card) */}
            <View style={styles.cardRow}>
                <Card containerStyle={styles.card}>
                    <Image
                        source={{ uri: 'https://images.unsplash.com/vector-1739647326693-5c3bf51aea69?q=80&w=2360&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }} // Placeholder Image
                        style={styles.cardImage}
                    />
                    <Card.Title>Health Tips & Articles</Card.Title>
                    <Card.Divider />
                    <Text style={styles.cardText}>
                        Follow expert health tips and read articles on maintaining a healthy lifestyle.
                    </Text>
                    <Button
                        title="Learn More"
                        onPress={() => navigation.navigate('HealthTips')}
                        buttonStyle={styles.button}
                    />
                </Card>

                <Card containerStyle={styles.card}>
                    <Image
                        source={{ uri: 'https://images.unsplash.com/vector-1739647326693-5c3bf51aea69?q=80&w=2360&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }} // Placeholder Image
                        style={styles.cardImage}
                    />
                    <Card.Title>Learn More</Card.Title>
                    <Card.Divider />
                    <Text style={styles.cardText}>
                        Find out more about our features and offerings in the app.
                    </Text>
                    <Button
                        title="Get More Info"
                        onPress={() => navigation.navigate('InfoPage')}
                        buttonStyle={styles.button}
                    />
                </Card>
            </View>
        </ScrollView>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 10,
    },
    header: {
        textAlign: 'center',
        marginVertical: 20,
        color: '#211C84', // Ana renk
    },
    cardRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    card: {
        width: '48%', // 2 card per row
        marginBottom: 20,
        borderRadius: 10,
        marginHorizontal: '1%', // Arada boşluk bırakmak için
    },
    cardImage: {
        width: '100%',
        height: 150,
        borderRadius: 10,
        marginBottom: 10,
    },
    cardText: {
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#211C84', // Ana renk
    }
});
