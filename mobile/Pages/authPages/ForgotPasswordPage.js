import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  ImageBackground,
} from "react-native";
import styled from "styled-components/native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useApi } from "../../context/ApiContext";

export default function ForgotPasswordPage({ navigation }) {
  const [email, setEmail] = useState("");
  const { apiUrl } = useApi();

  const handleForgotPassword = async () => {
    if (!email) {
      Alert.alert("Error", "Please enter your email.");
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/api/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Success", "Password reset link sent to your email.");
      } else {
        Alert.alert("Error", data.msg || "Failed to send reset link.");
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong.");
    }
  };

  return (
    <Container behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <InnerBox>
        <HeaderText>Forget Password</HeaderText>
        <Label>Email Address</Label>
        <InputWrapper>
          <StyledInput
            placeholder="example@example.com"
            placeholderTextColor="#1dd2d8"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
          <Icon name="email" size={20} color="#1dd2d8" />
        </InputWrapper>

        <SendButton onPress={handleForgotPassword}>
          <SendButtonText>Send Reset Link</SendButtonText>
        </SendButton>

        <BackButton onPress={() => navigation.goBack()}>
          <BackText>Back to Login</BackText>
        </BackButton>
      </InnerBox>
    </Container>
  );
}

// Styled Components
const Background = styled(ImageBackground)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Container = styled(KeyboardAvoidingView)`
  flex: 1;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const InnerBox = styled.View`
  width: 85%;
  background-color: rgba(255, 255, 255, 0.85);
  padding: 30px;
  border-radius: 10px;
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.25;
  shadow-radius: 3.5px;
  elevation: 5;
`;

const HeaderText = styled.Text`
  font-size: 32px;
  font-weight: bold;
  color: #1dd2d8;
  text-align: center;
  margin-bottom: 25px;
`;

const Label = styled.Text`
  color: #333;
  font-weight: 600;
  margin-bottom: 8px;
`;

const InputWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: #f0f9ff;
  border-radius: 10px;
  padding: 0 10px;
  margin-bottom: 20px;
`;

const StyledInput = styled(TextInput)`
  flex: 1;
  height: 50px;
  color: #333;
`;

const SendButton = styled.TouchableOpacity`
  background-color: #1dd2d8;
  padding-vertical: 15px;
  border-radius: 8px;
  align-items: center;
  margin-top: 10px;
`;

const SendButtonText = styled.Text`
  color: #fff;
  font-size: 18px;
  font-weight: bold;
`;

const BackButton = styled.TouchableOpacity`
  margin-top: 20px;
`;

const BackText = styled.Text`
  color: #1dd2d8;
  font-size: 16px;
  text-align: center;
`;
