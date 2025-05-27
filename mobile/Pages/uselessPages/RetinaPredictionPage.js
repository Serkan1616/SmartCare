import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  Image,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Card, Icon } from "react-native-elements";
import axios from "axios";

export default function RetinaPredictionPage() {
  const [selectedImage, setSelectedImage] = useState(null);

  // İzinleri isteme
  useEffect(() => {
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Required",
          "We need access to your camera roll to proceed."
        );
      }
    })();
  }, []);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const handlePrediction = async () => {
    if (!selectedImage) {
      Alert.alert("Error", "Please select an image first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", {
      uri: selectedImage,
      name: "retina_image.jpg",
      type: "image/jpeg",
    });

    try {
      const response = await axios.post(
        "http://192.168.63.138.138:8000/retina-predict",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      const predictedCategory = response.data.prediction || "Unknown";
      const confidence = response.data.confidence || "N/A";

      Alert.alert(
        "Prediction Result",
        `Prediction: ${predictedCategory}\nConfidence: ${confidence}%`
      );
    } catch (error) {
      console.error("Error during prediction:", error);
      Alert.alert("Error", "Failed to get prediction.");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Card containerStyle={styles.card}>
        <Text style={styles.header}>Retina Cancer Prediction</Text>

        {/* Görüntü Seçme */}
        {selectedImage && (
          <Image source={{ uri: selectedImage }} style={styles.image} />
        )}

        <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
          <Icon name="image" type="font-awesome" color="#fff" />
          <Text style={styles.imageButtonText}>Choose Image</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.predictButton}
          onPress={handlePrediction}
        >
          <Icon name="search" type="font-awesome" color="#fff" />
          <Text style={styles.predictButtonText}>Predict</Text>
        </TouchableOpacity>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  card: {
    borderRadius: 12,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    color: "#211C84",
    marginBottom: 20,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  imageButton: {
    backgroundColor: "#4D55CC",
    paddingVertical: 12,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  imageButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 8,
  },
  predictButton: {
    backgroundColor: "#E53935",
    paddingVertical: 12,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  predictButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 8,
  },
});
