import React from 'react';
import { FlatList, StyleSheet, View, Text } from 'react-native';
import { Card, Button } from 'react-native-elements';
import axios from 'axios';

export default function PredictionPage({ navigation }) {
    const predictions = [
        {
            id: '1',
            title: "Brain Tumor Prediction",
            image: require('../assets/brain_tumor.jpg'), // Replace with your image path
        },
        {
            id: '2',
            title: "Lung Cancer Prediction",
            image: require('../assets/chest_cancer.jpg'),
        },
        {
            id: '3',
            title: "Retina Cancer Prediction",
            image: require('../assets/retina_cancer.jpg'),
        },
        {
            id: '4',
            title: "Skin Cancer Prediction",
            image: require('../assets/skin_cancer.jpg'),
        },
    ];

    const renderItem = ({ item }) => (
        <Card containerStyle={styles.card}>
            <Card.Image source={item.image} style={styles.image} />
            <Text h4 style={styles.cardTitle}>{item.title}</Text>
            <Button
                title="Make Prediction"
                onPress={() => getPrediction({ feature1: 1.23, feature2: 4.56 })}
                buttonStyle={styles.predictionButton}
            />
        </Card>
    );

    const getPrediction = async (data) => {
        try {
            const response = await axios.post('http://192.168.1.108:3000/predict', data);
            console.log('Prediction result:', response.data);
            // Use the prediction result in your app
        } catch (error) {
            console.error('Error fetching prediction:', error);
        }
    };

    return (
        <FlatList
            data={predictions}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            numColumns={2}
            contentContainerStyle={styles.container}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
    },
    card: {
        flex: 1,
        margin: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5, // For Android
    },
    image: {
        height: 150,
        resizeMode: 'cover',
        borderRadius: 10,
    },
    cardTitle: {
        marginVertical: 15,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18,
        color: '#211C84',
    },
    predictionButton: {
        backgroundColor: '#4D55CC',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginTop: 15,
    },
});
