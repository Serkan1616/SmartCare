import React from "react";
import styled from "styled-components/native";
import { TouchableOpacity, Text, Image } from "react-native";

const Container = styled.View`
  flex: 1;
  background-color: #ffffff;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const Logo = styled.Image`
  width: 200px;
  height: 200px;
  margin-bottom: 15px;
`;

const Title = styled.Text`
  font-size: 28px;
  margin-bottom: 10px;
  color: #1fd4d8;
`;

const BoldText = styled.Text`
  font-weight: bold;
  color: #1fd4d8;
`;

const Description = styled.Text`
  font-size: 12px;
  text-align: center;
  color: #555;
  margin: 10px 20px 30px;
`;

const StyledButton = styled.TouchableOpacity`
  width: 80%;
  padding: 15px;
  border-radius: 25px;
  background-color: ${(props) => (props.outline ? "#e9f6fe" : "#1fd4d8")};
  margin-bottom: 15px;
  align-items: center;
`;

const ButtonText = styled.Text`
  color: ${(props) => (props.outline ? "#1dd2d8" : "#fff")};
  font-size: 16px;
  font-weight: bold;
`;

export default function EntryScreen({ navigation }) {
  return (
    <Container>
      <Logo source={require("../../assets/logo.png")} />

      <Title>
        <BoldText>Health</BoldText>Track
      </Title>

      <Description>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </Description>

      <StyledButton onPress={() => navigation.navigate("Login")}>
        <ButtonText>Log In</ButtonText>
      </StyledButton>

      <StyledButton outline onPress={() => navigation.navigate("Register")}>
        <ButtonText outline>Sign Up</ButtonText>
      </StyledButton>
    </Container>
  );
}
