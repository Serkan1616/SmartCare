import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useApi } from "../../context/ApiContext";

export default function HealthProfilePage({ navigation }) {
  const [healthData, setHealthData] = useState({
    age: "",
    height: "",
    weight: "",
    bloodType: "",
    smoking: "",
    alcohol: "",
    medicalConditions: "",
  });
  const { apiUrl } = useApi();

  useEffect(() => {
    fetchHealthProfile();
  }, []);

  const fetchHealthProfile = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      const response = await fetch(`${apiUrl}/api/profile`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (response.ok && data.healthProfile) {
        setHealthData(data.healthProfile);
      }
    } catch (error) {
      console.error("Error fetching health profile:", error);
    }
  };

  const handleSave = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      const response = await fetch(`${apiUrl}/api/profile/update`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(healthData),
      });

      const data = await response.json();
      if (response.ok) {
        Alert.alert("Success", "Health profile updated successfully!");
        navigation.goBack();
      } else {
        Alert.alert("Error", data.msg);
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong.");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}> Personal Health Profile</Text>
      <Text style={styles.subtitle}>
        {"\n"} Please fill in the details to help us provide better Nutrition
        Advice.
      </Text>

      <View style={styles.form}>
        {[
          {
            label: "Age",
            key: "age",
            placeholder: "e.g. 25",
            keyboardType: "numeric",
          },
          {
            label: "Height (cm)",
            key: "height",
            placeholder: "e.g. 165",
            keyboardType: "numeric",
          },
          {
            label: "Weight (kg)",
            key: "weight",
            placeholder: "e.g. 60",
            keyboardType: "numeric",
          },
          {
            label: "Blood Type",
            key: "bloodType",
            placeholder: "e.g. A+, B-",
            keyboardType: "default",
          },
          {
            label: "Do you smoke?",
            key: "smoking",
            placeholder: "Yes / No",
            keyboardType: "default",
          },
          {
            label: "Do you drink alcohol?",
            key: "alcohol",
            placeholder: "Yes / No",
            keyboardType: "default",
          },
          {
            label: "Medical Conditions",
            key: "medicalConditions",
            placeholder: "e.g. Asthma, Diabetes",
            keyboardType: "default",
          },
        ].map((field) => (
          <View key={field.key} style={styles.inputGroup}>
            <Text style={styles.label}>{field.label}</Text>
            <TextInput
              style={styles.input}
              placeholder={field.placeholder}
              value={healthData[field.key]}
              keyboardType={field.keyboardType}
              onChangeText={(text) =>
                setHealthData({ ...healthData, [field.key]: text })
              }
            />
          </View>
        ))}

        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Save Profile</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#1dd2d8",
    textAlign: "center",
    marginTop: 10,
  },
  subtitle: {
    fontSize: 14,
    textAlign: "center",
    color: "#666",
    marginBottom: 20,
  },
  form: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    color: "#333",
    marginBottom: 5,
    fontWeight: "500",
  },
  input: {
    height: 45,
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    backgroundColor: "#F9F9F9",
  },
  button: {
    marginTop: 20,
    marginBottom: 40,
    backgroundColor: "#1dd2d8",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});
