import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Card, Icon } from 'react-native-elements';
import axios from 'axios';
import { ActionSheetIOS, Platform } from 'react-native';

const BloodReportPredictionPage = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [loading, setLoading] = useState(false);

    const selectImageSource = () => {
        if (Platform.OS === 'ios') {
            ActionSheetIOS.showActionSheetWithOptions(
                {
                    options: ['Cancel', 'Take Photo', 'Choose from Gallery'],
                    cancelButtonIndex: 0,
                },
                async (buttonIndex) => {
                    if (buttonIndex === 1) {
                        await takePhoto();
                    } else if (buttonIndex === 2) {
                        await pickFromGallery();
                    }
                }
            );
        } else {
            Alert.alert(
                'Select Option',
                '',
                [
                    { text: 'Take Photo', onPress: takePhoto },
                    { text: 'Choose from Gallery', onPress: pickFromGallery },
                    { text: 'Cancel', style: 'cancel' },
                ]
            );
        }
    };

    const takePhoto = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission Denied', 'Camera access is required.');
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            setSelectedImage(result.assets[0].uri);
        }
    };

    const pickFromGallery = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            setSelectedImage(result.assets[0].uri);
        }
    };

    const extractTextAndPredict = async () => {
        if (!selectedImage) {
            Alert.alert('Error', 'Please select a blood report image first.');
            return;
        }

        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('file', {
                uri: selectedImage,
                name: 'blood_report.jpg',
                type: 'image/jpeg',
            });

            const response = await axios.post('http://192.168.63.138.138:8000/ocr-predict', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            if (response.data.error) {
                console.error('OCR Error:', response.data.error);
                Alert.alert('OCR Error', response.data.error);
            } else {
                const { prediction, confidence, input } = response.data;
                Alert.alert(
                    'Prediction Result',
                    `Prediction: ${prediction}\nConfidence: ${confidence}%\n\nInput Values:\n${JSON.stringify(input, null, 2)}`
                );
            }
        } catch (error) {
            console.error('Prediction Error:', error);
            Alert.alert('Error', 'Prediction failed.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScrollView style={styles.container}>
            <Card containerStyle={styles.card}>
                <Text style={styles.header}>Blood Report Prediction</Text>

                {selectedImage && (
                    <Image source={{ uri: selectedImage }} style={styles.image} />
                )}

                <TouchableOpacity style={styles.imageButton} onPress={selectImageSource}>
                    <Icon name="camera" type="font-awesome" color="#fff" />
                    <Text style={styles.imageButtonText}>Take Photo or Choose from Gallery</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.predictButton} onPress={extractTextAndPredict}>
                    {loading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <>
                            <Icon name="search" type="font-awesome" color="#fff" />
                            <Text style={styles.predictButtonText}>Predict Disease</Text>
                        </>
                    )}
                </TouchableOpacity>
            </Card>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    card: {
        borderRadius: 12,
        padding: 20,
        backgroundColor: '#fff',
    },
    header: {
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold',
        color: '#211C84',
        marginBottom: 20,
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        marginBottom: 20,
    },
    imageButton: {
        backgroundColor: '#4D55CC',
        paddingVertical: 12,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    imageButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 8,
    },
    predictButton: {
        backgroundColor: '#E53935',
        paddingVertical: 12,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
    predictButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 8,
    },
});

export default BloodReportPredictionPage;
