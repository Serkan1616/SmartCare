import React, { useState } from "react";
import { Modal, Text, View, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";

const IconWrapper = styled.TouchableOpacity`
  margin-left: 8px;
  padding: 4px;

  display: flex;
  flex-direction: row;
  gap: 8px;
`;

const ModalContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalBox = styled.View`
  background-color: white;
  padding: 25px 20px 30px 20px;
  margin: 20px;
  border-radius: 16px;
  max-width: 90%;
  elevation: 8; /* Android shadow */
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.3;
  shadow-radius: 8px;
`;

const TitleText = styled.Text`
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 12px;
  color: #333;
`;

const DescriptionText = styled.Text`
  font-size: 15px;
  color: #555;
  line-height: 22px;
`;

const CloseButton = styled.TouchableOpacity`
  margin-top: 20px;
  align-self: flex-end;
  background-color: #1dd2d8;
  padding: 8px 16px;
  border-radius: 20px;
`;

const CloseButtonText = styled.Text`
  color: white;
  font-weight: bold;
  font-size: 14px;
`;

const InfoIconWithModal = ({ title, description }) => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <IconWrapper onPress={() => setVisible(true)}>
        <Ionicons name="information-circle-outline" size={22} color="#1dd2d8" />
        <TitleText>{title}</TitleText>
      </IconWrapper>
      <Modal visible={visible} transparent animationType="fade">
        <ModalContainer>
          <ModalBox>
            <TitleText>{title}</TitleText>
            <DescriptionText>{description}</DescriptionText>
            <CloseButton onPress={() => setVisible(false)}>
              <CloseButtonText>Close</CloseButtonText>
            </CloseButton>
          </ModalBox>
        </ModalContainer>
      </Modal>
    </>
  );
};

export default InfoIconWithModal;
