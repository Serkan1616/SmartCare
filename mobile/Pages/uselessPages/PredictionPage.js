import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Modal,
  TouchableOpacity,
} from "react-native";
import styled from "styled-components/native";
import { normalRanges } from "../../components/normalRanges";

const PredictionPage = ({ route, navigation }) => {
  const prediction = route?.params?.prediction ?? "Unknown";
  const input_values = route?.params?.input_values ?? {};

  const getAdviceFromPrediction = (prediction) => {
    switch (prediction) {
      case "Iron deficiency anemia":
        return "🟤 Eat iron-rich foods like red meat, spinach, and legumes. Iron supplements may help.";
      case "Leukemia":
        return "⚠️ Leukemia is a serious condition. Please consult a hematologist immediately.";
      case "Leukemia with thrombocytopenia":
        return "⚠️ Complex case. Consult a specialist urgently.";
      case "Macrocytic anemia":
        return "🟡 Consider increasing Vitamin B12 and folate intake (eggs, dairy, leafy greens).";
      case "Normocytic hypochromic anemia":
        return "🔵 Could be due to chronic illness or mild iron deficiency. Get a detailed blood panel.";
      case "Normocytic normochromic anemia":
        return "🔵 Often linked to chronic conditions. Follow up with your physician.";
      case "Other microcytic anemia":
        return "🟤 May need further testing. Could be iron deficiency or genetic.";
      case "Thrombocytopenia":
        return "🔴 Low platelet count. Avoid injury and consult your doctor.";
      default:
        return "ℹ️ No specific advice available. Please consult your physician.";
    }
  };

  const advice = getAdviceFromPrediction(prediction);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedInfo, setSelectedInfo] = useState({
    key: "",
    description: "",
  });

  const openModal = (key, description) => {
    setSelectedInfo({ key, description });
    setModalVisible(true);
  };

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

      <ActionButton
        onPress={() => navigation.navigate("MealPlan", { prediction })}
      >
        <ButtonText>🍽️ View Meal Plan</ButtonText>
      </ActionButton>

      <Text style={styles.title}>📊 Your Blood Values</Text>
      <View style={styles.gridContainer}>
        {Object.entries(input_values).map(([key, value]) => {
          const range = normalRanges[key];
          const numericValue = parseFloat(value);
          const isNormal = range
            ? numericValue >= range.min && numericValue <= range.max
            : true;
          const unit = range?.unit ?? "";
          const description = range?.description ?? "No description available.";

          return (
            <TouchableOpacity
              key={key}
              style={[
                styles.valueCard,
                { borderColor: isNormal ? "#28a745" : "#dc3545" },
              ]}
              onPress={() => openModal(key, description)}
            >
              <Text style={styles.valueKey}>{key}</Text>
              <Text
                style={[
                  styles.valueText,
                  { color: isNormal ? "#28a745" : "#dc3545" },
                ]}
              >
                {value} {unit}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>{selectedInfo.key}</Text>
            <Text style={styles.modalDescription}>
              {selectedInfo.description}
            </Text>
            <ActionButton onPress={() => setModalVisible(false)}>
              <ButtonText>Close</ButtonText>
            </ActionButton>
          </View>
        </View>
      </Modal>

      <ButtonWrapper>
        <ActionButton onPress={() => navigation.navigate("Home")}>
          <ButtonText>Back to Home</ButtonText>
        </ActionButton>
        <PredictButton onPress={() => navigation.navigate("Analysis")}>
          <ButtonText> Show Analysis Results</ButtonText>
        </PredictButton>
      </ButtonWrapper>
    </ScrollView>
  );
};

export default PredictionPage;

// Styled components (buttons)
const ActionButton = styled.TouchableOpacity`
  background-color: #1dd2d8;
  padding-vertical: 12px;
  padding-horizontal: 12px;
  border-radius: 8px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
`;

const PredictButton = styled.TouchableOpacity`
  background-color: #128f94;
  padding-vertical: 12px;
  border-radius: 8px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
`;

const ButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  margin-left: 8px;
`;

const ButtonWrapper = styled.View`
  margin-top: 30px;
`;

// Styles
const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f0fefe",
    flexGrow: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1dd2d8",
    marginBottom: 10,
  },
  predictionBox: {
    backgroundColor: "#c6f4f6",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  prediction: {
    fontSize: 18,
    color: "#056b6c",
    fontWeight: "600",
  },
  adviceBox: {
    backgroundColor: "#fff8e1",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  advice: {
    fontSize: 16,
    color: "#7c5f00",
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 8,
    marginBottom: 20,
  },
  valueCard: {
    width: "47%",
    borderWidth: 1.2,
    borderRadius: 6,
    padding: 10,
    backgroundColor: "#f9f9f9",
    marginBottom: 10,
  },
  valueKey: {
    fontSize: 13,
    color: "#333",
    fontWeight: "600",
  },
  valueText: {
    fontSize: 14,
    fontWeight: "bold",
  },

  // Modal styles
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#fff",
    padding: 25,
    borderRadius: 12,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1dd2d8",
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 15,
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
  },
});
