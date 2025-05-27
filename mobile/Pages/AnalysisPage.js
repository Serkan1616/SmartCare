import React, { useState, useEffect } from "react";
import { Text } from "react-native";
import { FlatList, ActivityIndicator, Alert, Dimensions } from "react-native";
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

const screenWidth = Dimensions.get("window").width;

const AnemiaReportList = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedFeatures, setSelectedFeatures] = useState(["WBC"]);
  const { apiUrl } = useApi();

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
        Alert.alert("Analysis Result", data.analysis);
      } else {
        Alert.alert("Error", data.error || "Analysis failed");
      }
    } catch (error) {
      console.error("AI analysis error:", error);
      Alert.alert("Error", "Could not perform AI analysis.");
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
        Alert.alert("Error", data.error || "Something went wrong");
      }
    } catch (error) {
      console.error("Fetch reports error:", error);
      Alert.alert("Error", "Could not fetch reports.");
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
    </Container>
  );
};

export default AnemiaReportList;
