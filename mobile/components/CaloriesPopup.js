import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Modal, StyleSheet } from 'react-native';

// Örnek Kalori Verisi (CSV'den çekilecek)
const foodData = [
    { name: "Banana", calories: 89 },
    { name: "Apple", calories: 52 },
    { name: "Orange", calories: 62 },
    { name: "Rice (100g)", calories: 130 },
    { name: "Chicken Breast (100g)", calories: 165 },
    { name: "Egg", calories: 78 },
    { name: "Milk (1 cup)", calories: 103 },
];

export default function CaloriesPopup({ visible, onClose, onAddCalories }) {
    const [searchText, setSearchText] = useState('');
    const [filteredFood, setFilteredFood] = useState(foodData);
    const [selectedFoods, setSelectedFoods] = useState([]);
    const [totalCalories, setTotalCalories] = useState(0);

    useEffect(() => {
        setFilteredFood(foodData); // Her açıldığında listeyi sıfırla
    }, [visible]);

    // Arama işlemi
    const handleSearch = (text) => {
        setSearchText(text);
        const filtered = foodData.filter(food =>
            food.name.toLowerCase().includes(text.toLowerCase())
        );
        setFilteredFood(filtered);
    };

    // Yemek seçme işlemi
    const handleSelectFood = (food) => {
        setSelectedFoods([...selectedFoods, food]);
        setTotalCalories(totalCalories + food.calories);
    };

    // Seçilen yemekleri kaydetme ve pop-up'ı kapatma
    const handleSave = () => {
        onAddCalories(totalCalories); // Ana sayfadaki inputa toplam kaloriyi gönder
        onClose(); // Popup'ı kapat
    };

    return (
        <Modal visible={visible} animationType="slide" transparent={true}>
            <View style={styles.overlay}>
                <View style={styles.popup}>
                    <Text style={styles.header}>Select Your Food</Text>

                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search food..."
                        value={searchText}
                        onChangeText={handleSearch}
                    />

                    <FlatList
                        data={filteredFood}
                        keyExtractor={(item) => item.name}
                        renderItem={({ item }) => (
                            <TouchableOpacity style={styles.foodItem} onPress={() => handleSelectFood(item)}>
                                <Text style={styles.foodName}>{item.name}</Text>
                                <Text style={styles.foodCalories}>{item.calories} kcal</Text>
                            </TouchableOpacity>
                        )}
                    />

                    <Text style={styles.totalCalories}>Total Calories: {totalCalories} kcal</Text>

                    <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                        <Text style={styles.buttonText}>Save</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                        <Text style={styles.buttonText}>Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
    popup: { backgroundColor: 'white', width: '80%', padding: 20, borderRadius: 10 },
    header: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
    searchInput: { borderWidth: 1, borderColor: '#ccc', padding: 8, marginBottom: 10, borderRadius: 5 },
    foodItem: { flexDirection: 'row', justifyContent: 'space-between', padding: 10, borderBottomWidth: 1, borderColor: '#eee' },
    foodName: { fontSize: 16 },
    foodCalories: { fontSize: 16, color: '#777' },
    totalCalories: { fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginVertical: 10 },
    saveButton: { backgroundColor: '#211C84', padding: 10, borderRadius: 5, alignItems: 'center', marginTop: 10 },
    closeButton: { backgroundColor: '#777', padding: 10, borderRadius: 5, alignItems: 'center', marginTop: 5 },
    buttonText: { color: 'white', fontSize: 16 },
});
