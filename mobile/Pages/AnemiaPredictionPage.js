import React, { useState } from 'react';
import {
    View, Text, StyleSheet, ScrollView, Alert,
    TouchableOpacity, ActivityIndicator, Image
} from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import { Card, Icon } from 'react-native-elements';
import axios from 'axios';

const AnemiaPredictionPage = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(false);

    // Kullanıcıdan giriş tipi seçmesini iste
    const chooseInputMethod = () => {
        Alert.alert(
            'Select Input Type',
            'How would you like to upload your report?',
            [
                { text: '📄 PDF', onPress: pickPdfFile },
                { text: '📷 Camera', onPress: takePhoto },
                { text: '🖼️ Gallery', onPress: pickImageFromGallery },
            ],
            { cancelable: true }
        );
    };

    // PDF seç
    const pickPdfFile = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: 'application/pdf',
                copyToCacheDirectory: true,
            });
            if (!result.canceled && result.assets?.length > 0) {
                setSelectedFile(result.assets[0]);
            }
        } catch {
            Alert.alert('Error', 'PDF selection failed.');
        }
    };

    // Kamera ile fotoğraf çek
    const takePhoto = async () => {
        const permission = await ImagePicker.requestCameraPermissionsAsync();
        if (!permission.granted) {
            Alert.alert('Permission required', 'Camera access is needed.');
            return;
        }
        const result = await ImagePicker.launchCameraAsync({ quality: 1 });
        if (!result.canceled && result.assets?.length > 0) {
            setSelectedFile(result.assets[0]);
        }
    };

    // Galeriden fotoğraf seç
    const pickImageFromGallery = async () => {
        const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permission.granted) {
            Alert.alert('Permission required', 'Gallery access is needed.');
            return;
        }
        const result = await ImagePicker.launchImageLibraryAsync({ quality: 1 });
        if (!result.canceled && result.assets?.length > 0) {
            setSelectedFile(result.assets[0]);
        }
    };

    // Tahmin isteği gönder
    const sendFileForPrediction = async () => {
        if (!selectedFile) {
            Alert.alert('Warning', 'Please select a file or image first.');
            return;
        }

        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('file', {
                uri: selectedFile.uri,
                name: selectedFile.name || 'image.jpg',
                type: selectedFile.mimeType || 'image/jpeg',
            });

            const response = await axios.post('http://192.168.63.138:8000/anemia-predict-from-pdf', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.data.error) {
                Alert.alert('Error', response.data.error);
            } else {
                Alert.alert(
                    'Prediction Result',
                    `🧠 Anemia Type: ${response.data.prediction}\n\n📊 Values:\n${JSON.stringify(response.data.input_values, null, 2)}`
                );
            }
        } catch (error) {
            console.error('Prediction error:', error);
            Alert.alert('Error', 'Prediction failed.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScrollView style={styles.container}>
            {/* Bilgilendirme Kartı */}
            <Card containerStyle={styles.infoCard}>
                <Text style={styles.infoTitle}>🩸 What is Anemia?</Text>
                <Text style={styles.infoText}>
                    Anemia is a condition where the blood lacks enough healthy red blood cells or hemoglobin.
                    It leads to fatigue, weakness, and shortness of breath. There are many types such as:
                    {'\n\n'}🔸 Iron Deficiency Anemia{'\n'}🔸 Macrocytic Anemia{'\n'}🔸 Normocytic Anemia
                    {'\n\n'}Diagnosis is based on CBC test values such as:
                    Hemoglobin (HGB), RBC, WBC, Platelets (PLT), MCV, MCH, and MCHC.
                </Text>

                <View style={styles.imageWrapper}>
                    <Image
                        source={require('../assets/kan.jpg')}
                        style={styles.image}
                    />
                    <Text style={styles.imageNote}>Example blood analysis illustration</Text>
                </View>
            </Card>

            {/* Yükleme ve Tahmin Kartı */}
            <Card containerStyle={styles.card}>
                <Text style={styles.header}>📤 Upload Report (PDF / Image)</Text>

                <TouchableOpacity style={styles.imageButton} onPress={chooseInputMethod}>
                    <Icon name="upload" type="font-awesome" color="#fff" />
                    <Text style={styles.imageButtonText}>
                        {selectedFile ? selectedFile.name || 'Selected Image' : 'Upload Report'}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.predictButton} onPress={sendFileForPrediction}>
                    {loading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <>
                            <Icon name="search" type="font-awesome" color="#fff" />
                            <Text style={styles.predictButtonText}>Predict Anemia</Text>
                        </>
                    )}
                </TouchableOpacity>
            </Card>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f2f2f2' },
    card: {
        borderRadius: 12, padding: 20, marginBottom: 20, backgroundColor: '#fff',
    },
    header: {
        textAlign: 'center', fontSize: 20, fontWeight: 'bold',
        color: '#1e3d59', marginBottom: 20,
    },
    imageButton: {
        backgroundColor: '#4D55CC', paddingVertical: 12, borderRadius: 8,
        flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 10,
    },
    imageButtonText: {
        color: '#fff', fontSize: 16, fontWeight: 'bold', marginLeft: 8,
    },
    predictButton: {
        backgroundColor: '#E53935', paddingVertical: 12, borderRadius: 8,
        flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 10,
    },
    predictButtonText: {
        color: '#fff', fontSize: 16, fontWeight: 'bold', marginLeft: 8,
    },
    infoCard: {
        borderRadius: 12, padding: 20, marginBottom: 20, backgroundColor: '#fff',
    },
    infoTitle: {
        fontSize: 20, fontWeight: 'bold', color: '#B71C1C', marginBottom: 10,
    },
    infoText: {
        fontSize: 16, color: '#444', lineHeight: 22,
    },
    imageWrapper: {
        marginTop: 15, alignItems: 'center',
    },
    image: {
        width: 200, height: 120, borderRadius: 10, marginTop: 10,
    },
    imageNote: {
        marginTop: 6, fontSize: 14, color: '#888', fontStyle: 'italic',
    },
});

export default AnemiaPredictionPage;
