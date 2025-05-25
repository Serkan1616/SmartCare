import React, { useState } from "react";
import styled from "styled-components/native";
import { ScrollView, TouchableOpacity, Text } from "react-native";
import { Feather } from "@expo/vector-icons";

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

const HorizontalScroll = styled.ScrollView`
  margin-bottom: 20px;
`;

const DatePill = styled.View`
  background-color: ${(props) => (props.active ? "#1dd2d8" : "#fff")};
  padding: 10px 14px;
  border-radius: 12px;
  margin-right: 10px;
  border: 1px solid #1dd2d8;
`;

const DatePillText = styled.Text`
  color: ${(props) => (props.active ? "#fff" : "#1dd2d8")};
  font-weight: bold;
  font-size: 14px;
`;

const ScheduleCard = styled.View`
  background-color: white;
  padding: 16px;
  margin-bottom: 10px;
  border-radius: 12px;
  shadow-color: #000;
  shadow-opacity: 0.05;
  shadow-radius: 6px;
  elevation: 2;
`;

const ScheduleDate = styled.Text`
  font-size: 14px;
  color: #888;
`;

const ScheduleDetail = styled.Text`
  font-size: 15px;
  font-weight: bold;
  color: #1dd2d8;
  margin-top: 4px;
`;

const CardRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-bottom: 20px;
`;

const FeatureCard = ({ title, image, description, buttonTitle, onPress }) => (
  <FeatureCardContainer>
    <FeatureImage source={{ uri: image }} />
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
  width: 100%;
  height: 100px;
  border-radius: 8px;
  margin-bottom: 8px;
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

export default function HomePage({ navigation }) {
  const [selectedDate, setSelectedDate] = useState(new Date());

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

      <SectionTitle>Upcoming Schedule</SectionTitle>

      <HorizontalScroll horizontal showsHorizontalScrollIndicator={false}>
        {["9 MON", "10 TUE", "11 WED", "12 THU", "13 FRI", "14 SAT"].map(
          (date, i) => (
            <DatePill key={i} active={i === 2}>
              <DatePillText active={i === 2}>{date}</DatePillText>
            </DatePill>
          )
        )}
      </HorizontalScroll>

      <ScheduleCard>
        <ScheduleDate>11 Month - Wednesday - Today</ScheduleDate>
        <ScheduleDetail>10:00 am — Dr. Olivia Turner</ScheduleDetail>
      </ScheduleCard>

      <ScheduleCard>
        <ScheduleDate>16 Month - Monday</ScheduleDate>
        <ScheduleDetail>08:00 am — Dr. Alexander Bennett</ScheduleDetail>
      </ScheduleCard>

      <SectionTitle>Features</SectionTitle>

      <CardRow>
        <FeatureCard
          title="Health Profile"
          image="https://ddagal3o2o4a.cloudfront.net/assets/icon-health-profile-4aae4aa1f94c40f08331b46e356a0c69e597f3aea7f08b55381712a13e58cf9d.png"
          description="Create your health profile to track your personal health data."
          buttonTitle="Create Health Profile"
          onPress={() => navigation.navigate("HealthProfile")}
        />

        <FeatureCard
          title="Anemia Prediction"
          image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-C524dbyEgoX4VeSZfPLGVqiA9BOloNOegw&s"
          description="Upload your hemogram report to detect anemia with AI."
          buttonTitle="Check Your Risk"
          onPress={() => navigation.navigate("AnemiaPrediction")}
        />
      </CardRow>

      <CardRow>
        <FeatureCard
          title="Hemogram Statistics"
          image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJYMJZ1yXpN3zmGfJLCb9kocHinLtXVezkYQ&s"
          description="Track your hemogram values over time."
          buttonTitle="Track Health"
          onPress={() => navigation.navigate("Analysis")}
        />

        <FeatureCard
          title="Nutrition Advice"
          image="https://www.ayushmanhhs.in/wp-content/uploads/2024/05/Cancer-Screening-1-612x321.jpg"
          description="Smart food suggestions based on anemia type."
          buttonTitle="Get Screening"
          onPress={() => navigation.navigate("Predictions")}
        />
      </CardRow>
    </Container>
  );
}
