import React, { useState } from "react";
import styled from "styled-components/native";
import { Alert, KeyboardAvoidingView, Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useApi } from "../../context/ApiContext";
import Icon from "react-native-vector-icons/MaterialIcons";

const Container = styled.ScrollView`
  flex: 1;
  background-color: #ffffff;
  padding: 30px 20px;
`;

const Header = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #1dd2d8;
  text-align: center;
  margin-bottom: 30px;
`;

const Label = styled.Text`
  font-size: 14px;
  color: #333;
  margin-bottom: 6px;
  margin-left: 4px;
`;

const InputContainer = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: #f2faff;
  border-radius: 10px;
  padding: 0 10px;
  margin-bottom: 15px;
  border: 1px solid #cdefff;
`;

const StyledTextInput = styled.TextInput`
  flex: 1;
  height: 50px;
  font-size: 16px;
  padding-left: 10px;
  color: #000;
`;

const IconButton = styled.TouchableOpacity`
  padding: 5px;
`;

const ForgetButton = styled.TouchableOpacity`
  margin-bottom: 20px;
`;

const ForgetText = styled.Text`
  text-align: right;
  color: #1dd2d8;
  font-size: 13px;
`;

const LoginButton = styled.TouchableOpacity`
  background-color: #1dd2d8;
  padding: 15px;
  border-radius: 30px;
  align-items: center;
  margin-bottom: 20px;
`;

const ButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
`;

const OrText = styled.Text`
  text-align: center;
  font-size: 14px;
  color: #888;
  margin-bottom: 15px;
`;

const SocialContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  gap: 15px;
  margin-bottom: 20px;
`;

const SocialIcon = styled.Image`
  width: 40px;
  height: 40px;
`;

const FooterText = styled.Text`
  text-align: center;
  font-size: 14px;
  color: #888;
`;

const Link = styled.Text`
  color: #1dd2d8;
`;

export default function LoginPage({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { apiUrl } = useApi();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter email and password.");
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        await AsyncStorage.setItem("userToken", data.token);
        Alert.alert("Login Successful!", `Welcome ${data.user.name}`);
        navigation.navigate("Home");
      } else {
        Alert.alert("Error", data.msg);
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong.");
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Container contentContainerStyle={{ paddingBottom: 40 }}>
        <Header>Welcome Back</Header>

        <Label>Email</Label>
        <InputContainer>
          <StyledTextInput
            placeholder="example@example.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#ccc"
          />
        </InputContainer>

        <Label>Password</Label>
        <InputContainer>
          <StyledTextInput
            placeholder="********"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            placeholderTextColor="#ccc"
          />
          <IconButton onPress={() => setShowPassword(!showPassword)}>
            <Icon
              name={showPassword ? "visibility-off" : "visibility"}
              size={20}
              color="#999"
            />
          </IconButton>
        </InputContainer>

        <ForgetButton
          onPress={() => Alert.alert("Forgot password", "Not implemented yet.")}
        >
          <ForgetText>Forgot your password?</ForgetText>
        </ForgetButton>

        <LoginButton onPress={handleLogin}>
          <ButtonText>Login</ButtonText>
        </LoginButton>

        <OrText>or sign in with</OrText>

        <SocialContainer>
          <SocialIcon source={require("../../assets/icon.png")} />
          <SocialIcon source={require("../../assets/icon.png")} />
          <SocialIcon source={require("../../assets/icon.png")} />
        </SocialContainer>

        <FooterText>
          Don't have an account?{" "}
          <Link onPress={() => navigation.navigate("Register")}>Sign Up</Link>
        </FooterText>
      </Container>
    </KeyboardAvoidingView>
  );
}
