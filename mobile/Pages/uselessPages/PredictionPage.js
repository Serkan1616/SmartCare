import React from "react";
import { View, Text, ScrollView, StyleSheet, Button } from "react-native";

const PredictionPage = ({ route, navigation }) => {
  const prediction = route?.params?.prediction ?? "Unknown";
  const input_values = route?.params?.input_values ?? {};

  const getAdviceFromPrediction = (prediction) => {
    switch (prediction) {
      case "Iron Deficiency Anemia":
        return "🟤 Eat iron-rich foods like red meat, spinach, and legumes. Iron supplements may help.";
      case "Leukemia":
        return "⚠️ Leukemia is a serious condition. Please consult a hematologist immediately.";
      case "Leukemia with Thrombocytopenia":
        return "⚠️ Complex case. Consult a specialist urgently.";
      case "Macrocytic Anemia":
        return "🟡 Consider increasing Vitamin B12 and folate intake (eggs, dairy, leafy greens).";
      case "Normocytic Hypochromic Anemia":
        return "🔵 Could be due to chronic illness or mild iron deficiency. Get a detailed blood panel.";
      case "Normocytic Normochromic Anemia":
        return "🔵 Often linked to chronic conditions. Follow up with your physician.";
      case "Other Microcytic Anemia":
        return "🟤 May need further testing. Could be iron deficiency or genetic.";
      case "Thrombocytopenia":
        return "🔴 Low platelet count. Avoid injury and consult your doctor.";
      default:
        return "ℹ️ No specific advice available. Please consult your physician.";
    }
  };

  const advice = getAdviceFromPrediction(prediction);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🧠 Anemia Prediction Result</Text>
      <View style={styles.predictionBox}>
        <Text style={styles.prediction}>{prediction}</Text>
      </View>

      <Text style={styles.title}>💡 Nutrition Advice</Text>
      <View style={styles.adviceBox}>
        <Text style={styles.advice}>{advice}</Text>
      </View>

      <Text style={styles.title}>📊 Your Blood Values</Text>
      <View style={styles.valuesContainer}>
        {Object.entries(input_values).map(([key, value]) => (
          <Text key={key} style={styles.valueItem}>
            {key}: {value}
          </Text>
        ))}
      </View>

      <View style={{ marginTop: 30 }}>
        <Button title="🔙 Back to Home" onPress={() => navigation.goBack()} />
      </View>

      {/* Future Feature Placeholder */}
      <View style={{ marginTop: 10 }}>
        <Button title="📤 Share Report (Coming Soon)" disabled />
      </View>
    </ScrollView>
  );
};

export default PredictionPage;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f5faff",
    flexGrow: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0077b6",
    marginBottom: 10,
  },
  predictionBox: {
    backgroundColor: "#e0f7fa",
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  prediction: {
    fontSize: 18,
    color: "#023e8a",
  },
  adviceBox: {
    backgroundColor: "#fff3cd",
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  advice: {
    fontSize: 16,
    color: "#7c4700",
  },
  valuesContainer: {
    backgroundColor: "#ffffff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  valueItem: {
    fontSize: 14,
    color: "#333",
    marginBottom: 5,
  },
});
