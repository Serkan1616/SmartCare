import React, { useState } from "react";
import styled from "styled-components/native";
import { Icon } from "react-native-elements";
import { Alert, TouchableOpacity } from "react-native";
import { useApi } from "../../context/ApiContext";

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

const DateInput = styled(StyledTextInput)`
  color: #aaa;
`;

const TermsText = styled.Text`
  font-size: 12px;
  color: #888;
  text-align: center;
  margin-bottom: 20px;
`;

const Link = styled.Text`
  color: #1dd2d8;
`;

const SignUpButton = styled.TouchableOpacity`
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

export default function RegisterPage({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [dob, setDob] = useState("");

  const { apiUrl } = useApi();

  const handleRegister = async () => {
    if (!name || !email || !password) {
      Alert.alert("Error", "Please fill out all fields.");
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Registration Successful!", "You can now log in.");
        navigation.navigate("Login");
      } else {
        Alert.alert("Error", data.msg);
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong.");
    }
  };

  return (
    <Container contentContainerStyle={{ paddingBottom: 40 }}>
      <Header>New Account</Header>

      <Label>Full name</Label>
      <InputContainer>
        <StyledTextInput
          placeholder="example@example.com"
          value={name}
          onChangeText={setName}
          placeholderTextColor="#ccc"
        />
      </InputContainer>

      <Label>Password</Label>
      <InputContainer>
        <StyledTextInput
          placeholder="************"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          placeholderTextColor="#ccc"
        />
      </InputContainer>

      <Label>Email</Label>
      <InputContainer>
        <StyledTextInput
          placeholder="example@example.com"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
          placeholderTextColor="#ccc"
        />
      </InputContainer>

      <Label>Mobile Number</Label>
      <InputContainer>
        <StyledTextInput
          placeholder="05xxxxxxxxx"
          keyboardType="phone-pad"
          value={mobile}
          onChangeText={setMobile}
          placeholderTextColor="#ccc"
        />
      </InputContainer>

      <Label>Date Of Birth</Label>
      <InputContainer>
        <DateInput
          placeholder="DD / MM / YYYY"
          value={dob}
          onChangeText={setDob}
          placeholderTextColor="#ccc"
        />
      </InputContainer>

      <TermsText>
        By continuing, you agree to <Link>Terms of Use</Link> and{" "}
        <Link>Privacy Policy</Link>.
      </TermsText>

      <SignUpButton onPress={handleRegister}>
        <ButtonText>Sign Up</ButtonText>
      </SignUpButton>

      <OrText>or sign up with</OrText>

      <SocialContainer>
        <SocialIcon source={require("../../assets/icon.png")} />
        <SocialIcon source={require("../../assets/icon.png")} />
        <SocialIcon source={require("../../assets/icon.png")} />
      </SocialContainer>

      <FooterText>
        already have an account?{" "}
        <Link onPress={() => navigation.navigate("Login")}>Log in</Link>
      </FooterText>
    </Container>
  );
}
