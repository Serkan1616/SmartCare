import { useState, useEffect } from "react";
import {
  ScrollView,
  ActivityIndicator,
  Alert,
  ImageBackground,
} from "react-native";
import styled from "styled-components/native";
import axios from "axios";
import { useApi } from "../context/ApiContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const COLORS = {
  Breakfast: "#FF7F50",
  Lunch: "#3CB371",
  Snack: "#FFA500",
  Dinner: "#4682B4",
  Effects: "#8B0000",
};

const MealPlanPage = ({ route }) => {
  const [diagnosis, setDiagnosis] = useState(
    route?.params?.prediction ?? "Unknown"
  );
  const [loading, setLoading] = useState(false);
  const [mealPlan, setMealPlan] = useState("");
  const { apiUrl } = useApi();

  const [token, setToken] = useState(null);

  useEffect(() => {
    const init = async () => {
      try {
        setLoading(true);

        // Kullanıcı token'ını al
        const storedToken = await AsyncStorage.getItem("userToken");
        if (!storedToken) {
          Alert.alert("Error", "User not authenticated.");
          setLoading(false);
          return;
        }
        setToken(storedToken);

        // Eğer diagnosis Unknown ise kayıtlı meal planı getir
        if (diagnosis === "Unknown") {
          const response = await axios.get(`${apiUrl}/api/meal-plan`, {
            headers: { Authorization: `Bearer ${storedToken}` },
          });

          const planText = response.data.mealPlanText || "";
          const realDiagnosis = response.data.diagnosis || "Unknown";

          setMealPlan(planText);
          setDiagnosis(realDiagnosis); // 🔁 diagnosis'i güncelle
        }
      } catch (err) {
        if (err.response && err.response.status === 404) {
          setMealPlan("");
        } else {
          Alert.alert("Error", "Failed to load saved meal plan.");
          console.error(err);
        }
      } finally {
        setLoading(false);
      }
    };

    init();
  }, [apiUrl, diagnosis]);

  const fetchMealPlan = async () => {
    if (!token) {
      Alert.alert("Error", "User not authenticated.");
      return;
    }

    setLoading(true);
    try {
      // Meal plan oluşturmak için backend endpointine POST isteği (örneğin /api/plan-meal)
      const response = await axios.post(
        `${apiUrl}/api/plan-meal`,
        { diagnosis },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const planText = response.data.mealPlan || "No meal plan received.";
      setMealPlan(planText);

      // Yeni planı kaydet
      await axios.post(
        `${apiUrl}/api/meal-plan`,
        { diagnosis, mealPlanText: planText },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (err) {
      console.error("Meal plan fetch or save error:", err);
      Alert.alert("Error", "Failed to fetch or save meal plan.");
    } finally {
      setLoading(false);
    }
  };

  // mealPlan içeriğini bölümlere ayır
  const parts = {};
  if (mealPlan) {
    ["Breakfast", "Lunch", "Snack", "Dinner", "Effects", "Suggestions"].forEach(
      (section) => {
        const regex = new RegExp(`${section}:\\s*([^\\n]+)`, "i");
        const match = mealPlan.match(regex);
        parts[section] = match ? match[1].trim() : "";
      }
    );
  }

  const backgroundImages = {
    Breakfast: require("../assets/breakfast.jpg"),
    Lunch: require("../assets/lunch.jpg"),
    Snack: require("../assets/snack.jpg"),
    Dinner: require("../assets/dinner.jpg"),
  };

  return (
    <Container>
      <Header>Personalized Meal Plan</Header>
      <SubText>Anemia Type: {diagnosis}</SubText>

      <FetchButton onPress={fetchMealPlan} disabled={loading}>
        <ButtonText>{loading ? "Loading..." : "Generate Plan"}</ButtonText>
      </FetchButton>

      {loading && <ActivityIndicator size="large" color="#1dd2d8" />}

      {!loading && mealPlan ? (
        <>
          {[
            "Breakfast",
            "Lunch",
            "Snack",
            "Dinner",
            "Effects",
            "Suggestions",
          ].map((section) => {
            if (!parts[section]) return null;

            if (section !== "Effects" && section !== "Suggestions") {
              return (
                <ImageBackground
                  key={section}
                  source={backgroundImages[section]}
                  style={{
                    borderRadius: 12,
                    overflow: "hidden",
                    marginBottom: 40,
                  }}
                  imageStyle={{ borderRadius: 12, opacity: 0.15 }}
                >
                  <PlanBox
                    style={{
                      backgroundColor: "transparent",
                      paddingVertical: 40,
                      paddingHorizontal: 30,
                    }}
                  >
                    <SectionTitle style={{ color: COLORS[section] }}>
                      {section}
                    </SectionTitle>
                    <PlanText selectable>{parts[section]}</PlanText>
                  </PlanBox>
                </ImageBackground>
              );
            }

            return (
              <EffectsBox key={section}>
                <SectionTitle style={{ color: COLORS[section] }}>
                  {section}
                </SectionTitle>
                <PlanText selectable>{parts[section]}</PlanText>
              </EffectsBox>
            );
          })}
        </>
      ) : null}
    </Container>
  );
};

export default MealPlanPage;

// Styled Components
const Container = styled.ScrollView`
  flex: 1;
  padding: 20px;
`;

const Header = styled.Text`
  font-size: 22px;
  font-weight: bold;
  text-align: center;
  color: #1dd2d8;
  margin-bottom: 10px;
`;

const SubText = styled.Text`
  font-size: 16px;
  text-align: center;
  margin-bottom: 20px;
`;

const FetchButton = styled.TouchableOpacity`
  background-color: #1dd2d8;
  padding: 12px;
  border-radius: 10px;
  align-items: center;
  margin-bottom: 20px;
  opacity: ${(props) => (props.disabled ? 0.6 : 1)};
`;

const ButtonText = styled.Text`
  color: white;
  font-size: 16px;
`;

const PlanBox = styled.View`
  background-color: white;
  border-radius: 12px;
  elevation: 3;
`;

const EffectsBox = styled.View`
  background-color: #e6f9e6;
  border-left-width: 6px;
  border-left-color: #2e8b57;
  border-radius: 12px;
  padding: 40px 30px;
  margin-bottom: 40px;
  elevation: 3;
`;

const SectionTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 8px;
`;

const PlanText = styled.Text`
  font-size: 14px;
  line-height: 22px;
  color: #333;
`;
