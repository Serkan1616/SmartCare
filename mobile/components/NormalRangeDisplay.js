import React from "react";
import { Text } from "react-native";
import styled from "styled-components/native";
import { normalRanges } from "./normalRanges";

const RangeBox = styled.View`
  background-color: #d0f0f9;
  padding: 12px 16px;
  border-radius: 12px;
  margin-top: 10px;
  margin-bottom: 30px;
  border: 1.5px solid #1dd2d8;
`;

const RangeText = styled.Text`
  color: #0a3d4d;
  font-weight: 600;
  font-size: 15px;
`;

const NormalRangeDisplay = ({ featureKey }) => {
  if (!featureKey || !(featureKey in normalRanges)) return null;

  const { min, max } = normalRanges[featureKey];
  return (
    <RangeBox>
      <RangeText>
        Normal range for{" "}
        <Text style={{ fontWeight: "bold" }}>{featureKey}</Text>: {min} - {max}
      </RangeText>
    </RangeBox>
  );
};

export default NormalRangeDisplay;
