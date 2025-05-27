import React, { useState } from "react";
import {
  ScrollView,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Text,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import { Card, Icon } from "react-native-elements";
import axios from "axios";
import styled from "styled-components/native";
import { useApi } from "../context/ApiContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AnemiaPredictionPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const { apiUrl, userToken } = useApi(); // Kullanıcı token'ı burada olduğunu varsayıyorum

  const chooseInputMethod = () => {
    Alert.alert(
      "Select Input Type",
      "How would you like to upload your report?",
      [
        { text: "📄 PDF", onPress: pickPdfFile },
        { text: "📷 Camera", onPress: takePhoto },
        { text: "🖼️ Gallery", onPress: pickImageFromGallery },
      ],
      { cancelable: true }
    );
  };

  const pickPdfFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
        copyToCacheDirectory: true,
      });
      if (!result.canceled && result.assets?.length > 0) {
        setSelectedFile(result.assets[0]);
      }
    } catch {
      Alert.alert("Error", "PDF selection failed.");
    }
  };

  const takePhoto = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("Permission required", "Camera access is needed.");
      return;
    }
    const result = await ImagePicker.launchCameraAsync({ quality: 1 });
    if (!result.canceled && result.assets?.length > 0) {
      setSelectedFile(result.assets[0]);
    }
  };

  const pickImageFromGallery = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("Permission required", "Gallery access is needed.");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({ quality: 1 });
    if (!result.canceled && result.assets?.length > 0) {
      setSelectedFile(result.assets[0]);
    }
  };

  const saveReportToServer = async (prediction, input_values) => {
    try {
      // Token'ı AsyncStorage'dan al
      const userToken = await AsyncStorage.getItem("userToken");
      if (!userToken) {
        Alert.alert("Error", "User not authenticated. Please login.");
        return;
      }

      // Axios isteği
      const response = await axios.post(
        `${apiUrl}/api/anemia-report/add`,
        { prediction, input_values },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.error(
        "Save report error:",
        error.response || error.message || error
      );
      Alert.alert("Error", "Could not save the report.");
    }
  };

  const sendFileForPrediction = async () => {
    if (!selectedFile) {
      Alert.alert("Warning", "Please select a file or image first.");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", {
        uri: selectedFile.uri,
        name: selectedFile.name || "image.jpg",
        type: selectedFile.mimeType || "image/jpeg",
      });

      const response = await axios.post(
        `http://192.168.1.8:8000/anemia-predict-from-pdf`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.error) {
        Alert.alert("Error", response.data.error);
      } else {
        const { prediction, input_values } = response.data;

        // Tahmin sonucunu yeni sayfaya yolla
        navigation.navigate("PredictionPage", { prediction, input_values });

        Alert.alert(
          "Prediction Result",
          `🧠 Anemia Type: ${prediction}\n\n📊 Values:\n${JSON.stringify(
            input_values,
            null,
            2
          )}`
        );

        // Prediction geldikten sonra backend’e kaydet
        await saveReportToServer(prediction, input_values);
      }
    } catch (error) {
      console.error("Prediction error:", error);
      Alert.alert("Error", "Prediction failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <StyledCard>
        <InfoTitle>🩸 Understanding Anemia</InfoTitle>
        <InfoText>
          {"\n"}Anemia is a medical condition where your blood doesn't have
          enough healthy red blood cells or hemoglobin. This can cause symptoms
          like:
          {"\n\n"} • Fatigue and weakness
          {"\n"} • Pale skin
          {"\n"} • Shortness of breath
          {"\n"} • Dizziness or headaches
          {"\n\n"}
          <Text style={{ fontWeight: "bold" }}>🧪 Common Types Include:</Text>
          {"\n"} 🔸 Iron Deficiency Anemia
          {"\n"} 🔸 Leukemia
          {"\n"} 🔸 Leukemia with Thrombocytopenia
          {"\n"} 🔸 Macrocytic Anemia
          {"\n"} 🔸 Normocytic Hypochromic Anemia
          {"\n"} 🔸 Normocytic Normochromic Anemia
          {"\n"} 🔸 Other Microcytic Anemia
          {"\n"} 🔸 Thrombocytopenia
          {"\n\n"}📋 Diagnosis is based on CBC tests including:
          {"\n"}Hemoglobin (HGB), RBC, WBC, Platelets (PLT), MCV, MCH, MCHC.
        </InfoText>

        <ImageWrapper>
          <StyledImage source={require("../assets/Anemia.png")} />
          <ImageNote></ImageNote>
        </ImageWrapper>
      </StyledCard>

      <StyledCard>
        <SectionHeader>📤 Upload Report (PDF / Image)</SectionHeader>

        <ActionButton onPress={chooseInputMethod}>
          <Icon name="upload" type="font-awesome" color="#fff" />
          <ButtonText>
            {selectedFile
              ? selectedFile.name || "Selected Image"
              : "Upload Report"}
          </ButtonText>
        </ActionButton>

        <PredictButton onPress={sendFileForPrediction}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <>
              <Icon name="search" type="font-awesome" color="#fff" />
              <ButtonText>Predict Anemia</ButtonText>
            </>
          )}
        </PredictButton>
      </StyledCard>
    </Container>
  );
};

export default AnemiaPredictionPage;

// Styled Components
const Container = styled.ScrollView`
  flex: 1;
  background-color: #e0f7f9; /* Hafif açık, uyumlu arka plan */
`;

const StyledCard = styled(Card).attrs({
  containerStyle: {
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    backgroundColor: "#fff",
    shadowColor: "#1dd2d8",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
})``;

const SectionHeader = styled.Text`
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  color: #1dd2d8; /* Tema rengi */
  margin-bottom: 20px;
`;

const InfoTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #1dd2d8;
`;

const InfoText = styled.Text`
  font-size: 14px;
  color: #333;
  line-height: 22px;
`;

const ImageWrapper = styled.View`
  margin-top: 15px;
  align-items: center;
`;

const StyledImage = styled.Image`
  width: 200px;
  height: 120px;
  border-radius: 10px;
  margin-top: 10px;
`;

const ImageNote = styled.Text`
  margin-top: 6px;
  font-size: 14px;
  color: #555; /* Hafif koyu, tema ile uyumlu */
  font-style: italic;
`;

const ActionButton = styled(TouchableOpacity)`
  background-color: #1dd2d8; /* Tema rengi */
  padding-vertical: 12px;
  border-radius: 8px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
`;

const PredictButton = styled(TouchableOpacity)`
  background-color: #128f94; /* Tema rengine biraz daha koyu, vurgu için */
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
