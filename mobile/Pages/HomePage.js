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
                    image='https://ddagal3o2o4a.cloudfront.net/assets/icon-health-profile-4aae4aa1f94c40f08331b46e356a0c69e597f3aea7f08b55381712a13e58cf9d.png'
                    description="Create your health profile to track your personal health data."
                    buttonTitle="Create Health Profile"
                    onPress={() => navigation.navigate('AnemiaPrediction')}
                />

                <FeatureCard
                    title="Heart Attack & Stroke Detector"
                    image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-C524dbyEgoX4VeSZfPLGVqiA9BOloNOegw&s'
                    description="Assess your risk of heart attack or stroke by entering key health details."
                    buttonTitle="Check Your Risk"
                    onPress={() => navigation.navigate('SymptomsInputPage')}
                />
            </View>

            {/* Sağlık Takibi & Kanser Tarama Kartları */}
            <View style={styles.cardRow}>
                <FeatureCard
                    title="Track Your Health"
                    image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJYMJZ1yXpN3zmGfJLCb9kocHinLtXVezkYQ&s'
                    description="Monitor your daily health habits like diet, exercise, and hydration."
                    buttonTitle="Track Health"
                    onPress={() => navigation.navigate('HealthTracking')}
                />

                <FeatureCard
                    title="Cancer Screening"
                    image='https://www.ayushmanhhs.in/wp-content/uploads/2024/05/Cancer-Screening-1-612x321.jpg'
                    description="Personalized cancer screening recommendations based on your age and health data."
                    buttonTitle="Get Screening"
                    onPress={() => navigation.navigate('Predictions')}
                />
            </View>
        </ScrollView>
    );
}

// **Kart bileşeni (Card yerine kullanıyoruz)**
const FeatureCard = ({ title, image, description, buttonTitle, onPress }) => {
    // Açıklama metnini kısaltma fonksiyonu
    const truncateText = (text, maxLength = 60) => {
        return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    };

    return (
        <View style={styles.card}>
            <Image source={{ uri: image }} style={styles.cardImage} />
            <Text style={styles.cardTitle}>{title}</Text>
            <Text style={styles.cardText}>{truncateText(description)}</Text>

            {/* Sabit Buton Alanı */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={onPress}>
                    <Text style={styles.buttonText}>{buttonTitle}</Text>
                </TouchableOpacity>
            </View>
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
        flex: 1, // Kartı esnek hale getiriyoruz
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
        flex: 1, // Açıklama alanının genişlemesini sağlıyor
    },
    buttonContainer: {
        width: '100%',
        marginTop: 'auto',  // Butonu kartın altına sabitler
        marginBottom: 10,   // Alt boşluk ekler
    },
    button: {
        backgroundColor: '#4D55CC',
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
