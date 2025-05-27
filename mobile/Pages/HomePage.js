import React, { useState } from "react";
import styled from "styled-components/native";
import { Feather } from "@expo/vector-icons";
import { Calendar } from "react-native-calendars";

const Container = styled.ScrollView`
  flex: 1;
  background-color: #f9f9f9;
  padding: 20px;
`;

const TopBar = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const UserSection = styled.View`
  flex-direction: row;
  align-items: center;
  flex: 1;
`;

const Avatar = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 20px;
`;

const GreetingText = styled.View`
  margin-left: 10px;
`;

const WelcomeLine = styled.Text`
  font-size: 14px;
  color: #1dd2d8;
`;

const NameLine = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #333;
`;

const IconGroup = styled.View`
  flex-direction: row;
  gap: 12px;
`;

const IconButton = styled.TouchableOpacity`
  padding: 5px;
`;

const SectionTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin: 10px 0;
  color: #333;
`;

const CardRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-bottom: 20px;
`;

const FeatureCard = ({ title, image, description, buttonTitle, onPress }) => (
  <FeatureCardContainer>
    <ImageWrapper>
      <FeatureImage
        source={typeof image === "string" ? { uri: image } : image}
      />
    </ImageWrapper>
    <FeatureTitle>{title}</FeatureTitle>
    <FeatureDescription>{description}</FeatureDescription>
    <FeatureButton onPress={onPress}>
      <FeatureButtonText>{buttonTitle}</FeatureButtonText>
    </FeatureButton>
  </FeatureCardContainer>
);

const FeatureCardContainer = styled.View`
  width: 48%;
  background-color: white;
  border-radius: 12px;
  padding: 12px;
  margin-bottom: 12px;
  elevation: 2;
`;

const FeatureImage = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  margin-bottom: 8px;
`;

const ImageWrapper = styled.View`
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const FeatureTitle = styled.Text`
  font-weight: bold;
  font-size: 16px;
  color: #1dd2d8;
  margin-bottom: 4px;
`;

const FeatureDescription = styled.Text`
  font-size: 13px;
  color: #666;
  margin-bottom: 10px;
`;

const FeatureButton = styled.TouchableOpacity`
  background-color: #1dd2d8;
  padding: 8px;
  border-radius: 8px;
  align-items: center;
`;

const FeatureButtonText = styled.Text`
  color: white;
  font-weight: bold;
  font-size: 13px;
`;

const SelectedDateText = styled.Text`
  font-size: 15px;
  color: #1dd2d8;
  margin-top: 10px;
`;

export default function HomePage({ navigation }) {
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <Container>
      <TopBar>
        <UserSection>
          <Avatar
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
            }}
          />
          <GreetingText>
            <WelcomeLine>Hi, WelcomeBack</WelcomeLine>
            <NameLine>Jane Doe</NameLine>
          </GreetingText>
        </UserSection>
        <IconGroup>
          <IconButton>
            <Feather name="settings" size={22} color="#1dd2d8" />
          </IconButton>
          <IconButton>
            <Feather name="search" size={22} color="#1dd2d8" />
          </IconButton>
        </IconGroup>
      </TopBar>

      <SectionTitle>Schedule</SectionTitle>

      <Calendar
        onDayPress={(day) => {
          setSelectedDate(day.dateString);
        }}
        markedDates={{
          [selectedDate]: {
            selected: true,
            selectedColor: "#1dd2d8",
          },
        }}
        theme={{
          selectedDayBackgroundColor: "#1dd2d8",
          todayTextColor: "#1dd2d8",
          arrowColor: "#1dd2d8",
        }}
      />

      {selectedDate && (
        <SelectedDateText>Selected Date: {selectedDate}</SelectedDateText>
      )}

      <SectionTitle>Features</SectionTitle>

      <CardRow>
        <FeatureCard
          title="Health Profile"
          image={require("../assets/HealthProfile.png")}
          description="Create your health profile to track your personal health data."
          buttonTitle="Create Health Profile"
          onPress={() => navigation.navigate("HealthProfile")}
        />

        <FeatureCard
          title="Anemia Prediction"
          image={require("../assets/AnemiaPrediction.png")}
          description="Upload your hemogram report to detect anemia with AI."
          buttonTitle="Check Your Risk"
          onPress={() => navigation.navigate("AnemiaPrediction")}
        />
      </CardRow>

      <CardRow>
        <FeatureCard
          title="Hemogram Statistics"
          image={require("../assets/Hemogram.png")}
          description="Track your hemogram values over time."
          buttonTitle="Track Health"
          onPress={() => navigation.navigate("Analysis")}
        />

        <FeatureCard
          title="Nutrition Advice"
          image={require("../assets/NutritionAdvice.png")}
          description="Smart food suggestions based on anemia type."
          buttonTitle="Get Screening"
          onPress={() => navigation.navigate("Predictions")}
        />
      </CardRow>
    </Container>
  );
}
