import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, FlatList, Dimensions, Modal, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LineChart } from 'react-native-chart-kit';
import CaloriesPopup from '../components/CaloriesPopup';

const screenWidth = Dimensions.get('window').width;

export default function HealthTrackingPage({ navigation }) {
    const [calories, setCalories] = useState('');
    const [water, setWater] = useState('');
    const [exercise, setExercise] = useState('');
    const [healthData, setHealthData] = useState([]);
    const [loading, setLoading] = useState(true);

    const [isCaloriesPopupVisible, setCaloriesPopupVisible] = useState(false);
    const [isWaterPopupVisible, setWaterPopupVisible] = useState(false);
    const [totalWater, setTotalWater] = useState(0);

    useEffect(() => {
        fetchHealthData();
    }, []);

    const fetchHealthData = async () => {
        try {
            const token = await AsyncStorage.getItem('userToken');
            if (!token) {
                Alert.alert("Error", "No authentication token found.");
                return;
            }

            const response = await fetch('http://192.168.43.138:5000/api/health/get-health-data', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();
            if (response.ok) {
                setHealthData(data);
            } else {
                Alert.alert('Error', data.msg);
            }
        } catch (error) {
            Alert.alert('Error', 'Something went wrong.');
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        try {
            const token = await AsyncStorage.getItem('userToken');
            if (!token) {
                Alert.alert("Error", "No authentication token found.");
                return;
            }

            if (!calories || !water || !exercise) {
                Alert.alert("Error", "Please enter valid values for all fields.");
                return;
            }

            const response = await fetch('http://192.168.43.138:5000/api/health/track-health', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    calories: parseInt(calories) || 0,
                    water: parseFloat(water) || 0,
                    exercise: parseInt(exercise) || 0
                })
            });

            const data = await response.json();
            if (response.ok) {
                Alert.alert('Success', 'Health data saved successfully!');
                setCalories('');
                setWater('');
                setExercise('');
                await fetchHealthData(); // ✅ Yeni verileri anında çek
            } else {
                Alert.alert('Error', data.msg);
            }
        } catch (error) {
            Alert.alert('Error', 'Something went wrong.');
        }
    };

    // 🔥 Günlük toplamları hesapla (Aynı gün girilen değerleri topluyoruz)
    const dailyTotals = healthData.reduce((acc, item) => {
        const date = new Date(item.date).toLocaleDateString();
        if (!acc[date]) {
            acc[date] = { calories: 0, water: 0, exercise: 0 };
        }
        acc[date].calories += item.calories;
        acc[date].water += item.water;
        acc[date].exercise += item.exercise;
        return acc;
    }, {});

    const chartLabels = Object.keys(dailyTotals).slice(-7); // Son 7 gün
    const chartCalories = chartLabels.map(date => dailyTotals[date].calories || 0);
    const chartWater = chartLabels.map(date => dailyTotals[date].water || 0);
    const chartExercise = chartLabels.map(date => dailyTotals[date].exercise || 0);

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Track Your Health</Text>

            {/* Calories Input - Popup ile */}
            <TouchableOpacity onPress={() => setCaloriesPopupVisible(true)}>
                <TextInput
                    style={styles.input}
                    placeholder="Tap to enter Calories"
                    value={calories.toString()}
                    editable={false}
                />
            </TouchableOpacity>

            <CaloriesPopup
                visible={isCaloriesPopupVisible}
                onClose={() => setCaloriesPopupVisible(false)}
                onAddCalories={(total) => setCalories(total)}
            />

            {/* Water Input - Popup ile */}
            <TouchableOpacity onPress={() => setWaterPopupVisible(true)}>
                <TextInput
                    style={styles.input}
                    placeholder="Tap to enter Water (ml)"
                    value={water.toString()}
                    editable={false}
                />
            </TouchableOpacity>

            <Modal visible={isWaterPopupVisible} animationType="slide" transparent={true}>
                <View style={styles.overlay}>
                    <View style={styles.popup}>
                        <Text style={styles.header}>Track Your Water Intake</Text>
                        <Image source={require('../assets/glass.jpg')} style={styles.glassImage} />
                        <Text style={styles.totalWaterText}>{totalWater} ml</Text>
                        <TouchableOpacity style={styles.button} onPress={() => {
                            setTotalWater(totalWater + 200);
                            setWater((parseFloat(water) || 0) + 200);
                        }}>
                            <Text style={styles.buttonText}>+ 200ml</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.closeButton} onPress={() => setWaterPopupVisible(false)}>
                            <Text style={styles.buttonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* Exercise Input */}
            <TextInput
                style={styles.input}
                placeholder="Exercise (minutes)"
                keyboardType="numeric"
                value={exercise}
                onChangeText={setExercise}
            />

            <TouchableOpacity style={styles.button} onPress={handleSave}>
                <Text style={styles.buttonText}>Save Data</Text>
            </TouchableOpacity>

            {/* 📊 Gelişmiş Chart */}
            {chartLabels.length > 0 ? (
                <>
                    <LineChart
                        data={{
                            labels: chartLabels,
                            datasets: [
                                { data: chartCalories, color: () => "#FF9800", strokeWidth: 3 },
                                { data: chartWater, color: () => "#2196F3", strokeWidth: 3 },
                                { data: chartExercise, color: () => "#4CAF50", strokeWidth: 3 }
                            ]
                        }}
                        width={screenWidth - 40}
                        height={220}
                        yAxisSuffix=" kcal"
                        chartConfig={{
                            backgroundColor: '#211C84',
                            backgroundGradientFrom: '#211C84',
                            backgroundGradientTo: '#4A3FBC',
                            decimalPlaces: 0,
                            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`
                        }}
                        style={{ marginVertical: 10, borderRadius: 8 }}
                    />

                    {/* 🔥 Günlük Toplam Veriler */}
                    <View style={styles.dailyTotals}>
                        <Text style={styles.totalText}>🔥 Calories: {chartCalories.reduce((a, b) => a + b, 0)} kcal</Text>
                        <Text style={styles.totalText}>💧 Water: {chartWater.reduce((a, b) => a + b, 0)} ml</Text>
                        <Text style={styles.totalText}>🏋 Exercise: {chartExercise.reduce((a, b) => a + b, 0)} min</Text>
                    </View>
                </>
            ) : <Text style={styles.noDataText}>No data available</Text>}
        </View>
    );
}
const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
    header: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20, color: '#211C84' },

    /* Input Alanları */
    input: {
        backgroundColor: 'white',
        padding: 12,
        borderRadius: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        fontSize: 16
    },

    /* Butonlar */
    button: {
        backgroundColor: '#4D55CC',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 20
    },
    buttonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },

    /* Chart ve Günlük Toplamlar */
    noDataText: { fontSize: 16, color: '#777', textAlign: 'center', marginVertical: 20 },
    dailyTotals: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        marginTop: 15,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5
    },
    totalText: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 5 },

    /* Popup (Water & Calories) */
    overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
    popup: { backgroundColor: 'white', width: '80%', padding: 20, borderRadius: 10, alignItems: 'center' },

    /* Su İçme Popup (Glass Image) */
    glassImage: { width: 100, height: 100, alignSelf: 'center' },
    totalWaterText: { fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginVertical: 10 },

    /* Kapat Butonu */
    closeButton: { backgroundColor: '#777', padding: 10, borderRadius: 5, alignItems: 'center', marginTop: 5 },
});
