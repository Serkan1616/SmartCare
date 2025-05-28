import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Alert,
  ActivityIndicator,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import styled from "styled-components/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { useApi } from "../../context/ApiContext";
import { Icon } from "react-native-elements";

const ProfilePage = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { apiUrl } = useApi();

  useFocusEffect(
    React.useCallback(() => {
      fetchProfile();
    }, [])
  );

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) {
        Alert.alert("Error", "No authentication token found.");
        return;
      }

      const response = await fetch(`${apiUrl}/api/profile`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (response.ok) {
        setUser(data);
      } else {
        Alert.alert("Error", data.msg);
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Centered>
        <ActivityIndicator size="large" color="#211C84" />
      </Centered>
    );
  }

  const { mealPlan, lastAnemiaReport, healthProfile } = user || {};

  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ProfileHeader>
          <AvatarContainer>
            <AvatarImage
              source={{
                uri:
                  user?.avatarUrl ||
                  "https://randomuser.me/api/portraits/men/41.jpg",
              }}
            />
            <EditAvatarButton
              onPress={() => navigation.navigate("ProfileEdit")}
            >
              <Icon name="edit" type="font-awesome" color="white" size={14} />
            </EditAvatarButton>
          </AvatarContainer>
        </ProfileHeader>

        <FormContainer>
          <Label>Full Name</Label>
          <Input editable={false} value={user?.name || ""} />

          <Label>Phone Number</Label>
          <Input editable={false} value={user?.phone || "+000 000 0000"} />

          <Label>Email</Label>
          <Input editable={false} value={user?.email || ""} />

          <Row>
            <HalfWidthInputContainer>
              <Label>Age</Label>
              <Input editable={false} value={healthProfile?.age || ""} />
            </HalfWidthInputContainer>
            <HalfWidthInputContainer>
              <Label>Height</Label>
              <Input editable={false} value={healthProfile?.height || ""} />
            </HalfWidthInputContainer>
          </Row>

          <Row>
            <HalfWidthInputContainer>
              <Label>Weight</Label>
              <Input editable={false} value={healthProfile?.weight || ""} />
            </HalfWidthInputContainer>
            <HalfWidthInputContainer>
              <Label>Blood Type</Label>
              <Input editable={false} value={healthProfile?.bloodType || ""} />
            </HalfWidthInputContainer>
          </Row>

          <Row>
            <HalfWidthInputContainer>
              <Label>Smoking</Label>
              <Input editable={false} value={healthProfile?.smoking || ""} />
            </HalfWidthInputContainer>
            <HalfWidthInputContainer>
              <Label>Alcohol</Label>
              <Input editable={false} value={healthProfile?.alcohol || ""} />
            </HalfWidthInputContainer>
          </Row>

          <Label>Medical Conditions</Label>
          <Input
            editable={false}
            multiline
            value={healthProfile?.medicalConditions || ""}
          />

          <Label>Meal Plan</Label>
          <Input
            editable={false}
            value={
              mealPlan?.title
                ? `${mealPlan.title} (created at: ${new Date(
                    mealPlan.createdAt
                  ).toLocaleDateString()})`
                : "No Meal Plan Found"
            }
          />

          <Label>Last Anemia Report</Label>
          <Input
            editable={false}
            multiline
            value={
              lastAnemiaReport
                ? `Result: ${lastAnemiaReport.result}\nCreated At: ${new Date(
                    lastAnemiaReport.createdAt
                  ).toLocaleDateString()}`
                : "No Report Found"
            }
          />

          <UpdateButton onPress={() => navigation.navigate("ProfileEdit")}>
            <ButtonText>Update Profile</ButtonText>
          </UpdateButton>
        </FormContainer>
      </ScrollView>
    </Container>
  );
};

export default ProfilePage;

// Styled Components
const Container = styled.View`
  flex: 1;
  background-color: #ffffff;
`;

const Centered = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ProfileHeader = styled.View`
  align-items: center;
  background: #1dd2d8;
  padding: 40px 0 20px;
`;

const AvatarContainer = styled.View`
  position: relative;
  margin-bottom: 10px;
`;

const AvatarImage = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 50px;
`;

const EditAvatarButton = styled.TouchableOpacity`
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: #1dd2d8;
  padding: 6px;
  border-radius: 20px;
`;

const FormContainer = styled.View`
  padding: 20px;
`;

const Label = styled.Text`
  font-size: 14px;
  color: #333333;
  margin-top: 15px;
  margin-bottom: 5px;
`;

const Input = styled.TextInput`
  background-color: #f0f8ff;
  border-radius: 10px;
  padding: 12px;
  font-size: 16px;
  color: #333;
`;

const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const HalfWidthInputContainer = styled.View`
  flex: 0.48;
`;

const UpdateButton = styled.TouchableOpacity`
  background: #1dd2d8;
  border-radius: 25px;
  padding: 14px;
  margin-top: 30px;
  align-items: center;
`;

const ButtonText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: bold;
`;
