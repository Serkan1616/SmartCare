import React from 'react';
import { FlatList, StyleSheet, View, Text } from 'react-native';
import { Card, Button } from 'react-native-elements';

export default function PredictionPage({ navigation }) {
    const predictions = [
        {
            id: '1',
            title: "Retina Cancer Prediction",
            image: require('../../assets/retina_cancer.jpg'),
        }
    ];

    const renderItem = ({ item }) => (
        <Card containerStyle={styles.card}>
            <Card.Image source={item.image} style={styles.image} />
            <Text h4 style={styles.cardTitle}>{item.title}</Text>

            {/* Retina Cancer Prediction için yönlendirme */}
            <Button
                title="Make Prediction"
                onPress={() => navigation.navigate('RetinaPrediction')}
                buttonStyle={styles.predictionButton}
            />
        </Card>
    );

    return (
        <FlatList
            data={predictions}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.container}
        />
    );
}

const styles = StyleSheet.create({
    container: { padding: 15 },
    card: {
        flex: 1,
        margin: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
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
