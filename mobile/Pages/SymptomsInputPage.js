import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, ScrollView, Switch, TouchableOpacity } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import { Picker } from '@react-native-picker/picker'; // Picker eklendi
import axios from 'axios';

export default function SymptomsInputPage({ navigation }) {
    const [gender, setGender] = useState('');
    const [age, setAge] = useState('');
    const [hypertension, setHypertension] = useState(false);
    const [heartDisease, setHeartDisease] = useState(false);
    const [workType, setWorkType] = useState('');
    const [avgGlucoseLevel, setAvgGlucoseLevel] = useState('');
    const [bmi, setBmi] = useState('');

    const handlePrediction = async () => {
        try {
            const response = await axios.post('http://192.168.63.138.138:8000/predict', {
                gender: parseInt(gender),
                age: parseFloat(age),
                hypertension: hypertension ? 1 : 0,
                heart_disease: heartDisease ? 1 : 0,
                work_type: parseInt(workType),
                avg_glucose_level: parseFloat(avgGlucoseLevel),
                bmi: parseFloat(bmi)
            });

            Alert.alert(
                'Prediction Result',
                `Possible Disease: ${response.data.prediction === 1 ? 'Positive' : 'Negative'}\nConfidence: ${response.data.confidence}%`
            );
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Failed to predict disease.');
        }
    };

    return (
        <ScrollView style={styles.container}>
            <Card containerStyle={styles.card}>
                <Text style={styles.header}>Health Information</Text>

                {/* Gender - Dropdown */}
                <View style={styles.inputWrapper}>
                    <Icon name="user" type="font-awesome" color="#211C84" size={20} />
                    <Picker
                        selectedValue={gender}
                        onValueChange={setGender}
                        style={styles.picker}
                    >
                        <Picker.Item label="Select Gender" value="" />
                        <Picker.Item label="Male" value="1" />
                        <Picker.Item label="Female" value="0" />
                    </Picker>
                </View>

                {/* Age */}
                <View style={styles.inputWrapper}>
                    <Icon name="calendar" type="font-awesome" color="#211C84" size={20} />
                    <TextInput
                        value={age}
                        onChangeText={setAge}
                        placeholder="Age"
                        keyboardType="numeric"
                        style={styles.input}
                    />
                </View>

                {/* Hypertension */}
                <View style={styles.switchWrapper}>
                    <Icon name="heartbeat" type="font-awesome" color="#E53935" size={20} />
                    <Text style={styles.switchLabel}>Hypertension</Text>
                    <Switch value={hypertension} onValueChange={setHypertension} />
                </View>

                {/* Heart Disease */}
                <View style={styles.switchWrapper}>
                    <Icon name="heart" type="font-awesome" color="#E53935" size={20} />
                    <Text style={styles.switchLabel}>Heart Disease</Text>
                    <Switch value={heartDisease} onValueChange={setHeartDisease} />
                </View>

                {/* Work Type - Dropdown + Açıklama */}
                <View style={styles.inputWrapper}>
                    <Icon name="briefcase" type="font-awesome" color="#211C84" size={20} />
                    <Picker
                        selectedValue={workType}
                        onValueChange={setWorkType}
                        style={styles.picker}
                    >
                        <Picker.Item label="Select Work Type" value="" />
                        <Picker.Item label="Private" value="0" />
                        <Picker.Item label="Self-employed" value="1" />
                        <Picker.Item label="Govt job" value="2" />
                        <Picker.Item label="Children" value="3" />
                        <Picker.Item label="Never worked" value="4" />
                    </Picker>
                </View>


                {/* Average Glucose Level */}
                <View style={styles.inputWrapper}>
                    <Icon name="tint" type="font-awesome" color="#4CAF50" size={20} />
                    <TextInput
                        value={avgGlucoseLevel}
                        onChangeText={setAvgGlucoseLevel}
                        placeholder="Average Glucose Level"
                        keyboardType="numeric"
                        style={styles.input}
                    />
                </View>

                {/* BMI */}
                <View style={styles.inputWrapper}>
                    <Icon name="weight" type="material-community" color="#FFA000" size={20} />
                    <TextInput
                        value={bmi}
                        onChangeText={setBmi}
                        placeholder="BMI"
                        keyboardType="numeric"
                        style={styles.input}
                    />
                </View>

                {/* Predict Button */}
                <TouchableOpacity style={styles.predictButton} onPress={handlePrediction}>
                    <Text style={styles.predictButtonText}>Predict</Text>
                </TouchableOpacity>
            </Card>
        </ScrollView>
    );
}

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
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F8F9FA',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        padding: 12,
        marginBottom: 10,
    },
    input: {
        flex: 1,
        marginLeft: 10,
        fontSize: 16,
        color: '#333',
    },
    picker: {
        flex: 1,
        marginLeft: 10,
    },
    switchWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F8F9FA',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        padding: 12,
        marginBottom: 10,
    },
    switchLabel: {
        flex: 1,
        marginLeft: 10,
        fontSize: 16,
        color: '#333',
    },
    predictButton: {
        backgroundColor: '#4D55CC',
        paddingVertical: 12,
        borderRadius: 8,
        marginTop: 20,
        alignItems: 'center',
    },
    predictButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    infoText: {
        marginTop: 10,
        padding: 10,
        backgroundColor: '#F0F8FF',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        fontSize: 14,
        color: '#333',
    },
});
