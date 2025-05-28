import React, { useState, useEffect } from "react";
import {
  Text,
  Modal,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import styled from "styled-components/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useApi } from "../context/ApiContext";
import FeatureSelector from "../components/FeatureSelector";
import SimpleLineChart from "../components/SimpleLineChart";
import NormalRangeDisplay from "../components/NormalRangeDisplay";
import InfoIconWithModal from "../components/InfoIconWithModal";
import { parameterDescriptions } from "../components/parameterDescriptions";

const Container = styled.ScrollView`
  flex: 1;
  background-color: #f7fafa;
  padding: 20px;
`;

const Loading = styled(ActivityIndicator)`
  margin-top: 50px;
`;
const AnalyzeButton = styled.TouchableOpacity`
  background-color: #1dd2d8;
  padding: 12px 20px;
  border-radius: 8px;
  margin-top: 3px;
  margin-bottom: 40px;
  align-self: center;
`;

const AnalyzeButtonText = styled.Text`
  color: white;
  font-weight: bold;
  font-size: 16px;
`;

const ModalBackground = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.View`
  background-color: white;
  padding: 20px 25px;
  border-radius: 12px;
  width: 80%;
  max-height: 70%;
`;

const ModalTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #1dd2d8;
  margin-bottom: 15px;
  text-align: center;
`;

const ModalContent = styled.ScrollView`
  margin-bottom: 20px;
`;

const ModalText = styled.Text`
  font-size: 16px;
  color: #333;
  line-height: 22px;
`;

const ModalCloseButton = styled.TouchableOpacity`
  background-color: #1dd2d8;
  padding: 12px;
  border-radius: 8px;
  align-items: center;
`;

const ModalCloseButtonText = styled.Text`
  color: white;
  font-weight: bold;
  font-size: 16px;
`;

const screenWidth = Dimensions.get("window").width;

const AnemiaReportList = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedFeatures, setSelectedFeatures] = useState(["WBC"]);
  const { apiUrl } = useApi();

  // Modal ile ilgili state
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const analyzeWithAI = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      const feature = selectedFeatures[0];

      const featureValues = reports.map((report) => report.features?.[feature]);

      const response = await fetch(`${apiUrl}/api/analyze-ai`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          feature,
          values: featureValues,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        // Alert yerine modal göster
        setModalMessage(data.analysis);
        setModalVisible(true);
      } else {
        setModalMessage(data.error || "Analysis failed");
        setModalVisible(true);
      }
    } catch (error) {
      console.error("AI analysis error:", error);
      setModalMessage("Could not perform AI analysis.");
      setModalVisible(true);
    }
  };

  const fetchReports = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("userToken");
      const response = await fetch(`${apiUrl}/api/anemia-report/list`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (response.ok) {
        setReports(data.reports || []);
      } else {
        setModalMessage(data.error || "Something went wrong");
        setModalVisible(true);
      }
    } catch (error) {
      console.error("Fetch reports error:", error);
      setModalMessage("Could not fetch reports.");
      setModalVisible(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  return (
    <Container>
      {loading ? (
        <ActivityIndicator size="large" color="#1dd2d8" />
      ) : reports.length > 0 ? (
        <>
          <FeatureSelector
            selectedFeatures={selectedFeatures}
            setSelectedFeatures={setSelectedFeatures}
          />

          <SimpleLineChart reports={reports} featureKeys={selectedFeatures} />

          {/* Eğer sadece 1 özellik seçiliyse, normal aralığı göster */}
          {selectedFeatures.length === 1 && (
            <>
              {parameterDescriptions?.[selectedFeatures[0]?.trim()] && (
                <>
                  <InfoIconWithModal
                    title={`${selectedFeatures[0].trim()} Explanation`}
                    description={
                      parameterDescriptions[selectedFeatures[0].trim()]
                    }
                  />
                </>
              )}

              <NormalRangeDisplay featureKey={selectedFeatures[0]} />

              {/* ANALYZE WITH AI BUTONU */}
              <AnalyzeButton onPress={analyzeWithAI}>
                <AnalyzeButtonText>Analyze with AI</AnalyzeButtonText>
              </AnalyzeButton>
            </>
          )}

          {/* Diğer içerikler */}
        </>
      ) : (
        <Text>No reports found.</Text>
      )}

      {/* Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <ModalBackground>
          <ModalContainer>
            <ModalTitle>Analysis Result</ModalTitle>
            <ModalContent>
              <ModalText>{modalMessage}</ModalText>
            </ModalContent>
            <ModalCloseButton onPress={() => setModalVisible(false)}>
              <ModalCloseButtonText>Close</ModalCloseButtonText>
            </ModalCloseButton>
          </ModalContainer>
        </ModalBackground>
      </Modal>
    </Container>
  );
};

export default AnemiaReportList;
