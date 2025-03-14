import React from 'react';
import { ScrollView, StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';

export default function HomePage({ navigation }) {
    return (
        <ScrollView style={styles.container}>
            {/* Başlık */}
            <Text style={styles.header}>
                Welcome to <Text style={{ fontWeight: 'bold', color: '#211C84' }}>Health & Cancer Prediction App</Text>
            </Text>

            {/* Sağlık Profil & Semptomlar Kartları */}
            <View style={styles.cardRow}>
                <FeatureCard
                    title="Health Profile"
                    image='https://images.unsplash.com/vector-1739647326693-5c3bf51aea69?q=80&w=2360&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                    description="Create your health profile to track your personal health data."
                    buttonTitle="Create Health Profile"
                    onPress={() => navigation.navigate('HealthProfile')}
                />

                <FeatureCard
                    title="Symptoms Checker"
                    image='https://images.unsplash.com/vector-1739647326693-5c3bf51aea69?q=80&w=2360&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                    description="Check your symptoms and get insights on possible health conditions."
                    buttonTitle="Check Symptoms"
                    // onPress={() => navigation.navigate('Predictions')}
                    onPress={() => navigation.navigate('HealthTracking')}
                />
            </View>

            {/* Sağlık Takibi & Kanser Tarama Kartları */}
            <View style={styles.cardRow}>
                <FeatureCard
                    title="Track Your Health"
                    image='https://images.unsplash.com/vector-1739647326693-5c3bf51aea69?q=80&w=2360&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                    description="Keep track of your daily health activities like diet, exercise, and hydration."
                    buttonTitle="Track Health"
                    onPress={() => navigation.navigate('HealthTracking')}
                />

                <FeatureCard
                    title="Cancer Screening"
                    image='https://images.unsplash.com/vector-1739647326693-5c3bf51aea69?q=80&w=2360&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                    description="Get personalized cancer screening recommendations based on your age and health profile."
                    buttonTitle="Get Screening"
                    onPress={() => navigation.navigate('CancerScreening')}
                />
            </View>
        </ScrollView>
    );
}

// **Kart bileşeni (Card yerine kullanıyoruz)**
const FeatureCard = ({ title, image, description, buttonTitle, onPress }) => {
    return (
        <View style={styles.card}>
            <Image source={{ uri: image }} style={styles.cardImage} />
            <Text style={styles.cardTitle}>{title}</Text>
            <Text style={styles.cardText}>{description}</Text>
            <TouchableOpacity style={styles.button} onPress={onPress}>
                <Text style={styles.buttonText}>{buttonTitle}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f5f5', padding: 10 },
    header: {
        textAlign: 'center',
        fontSize: 22,
        marginVertical: 20,
        color: '#333',
    },
    cardRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginBottom: 20,
    },
    card: {
        width: '45%', // Web'de 2'li, mobilde 1'li düzen
        marginBottom: 20,
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        alignItems: 'center',
    },
    cardImage: {
        width: '100%',
        height: 150,
        borderRadius: 10,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#211C84',
        marginVertical: 10,
        textAlign: 'center',
    },
    cardText: {
        fontSize: 14,
        marginBottom: 10,
        color: '#555',
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#211C84',
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
        width: '100%',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});


