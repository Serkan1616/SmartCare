import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styled from "styled-components/native";

const featureGroups = {
  "White Blood Cells": ["WBC", "LYMp", "NEUTp", "LYMn", "NEUTn"],
  "Red Blood Cells & Hemoglobin": ["RBC", "HGB", "HCT", "MCV", "MCH", "MCHC"],
  "Platelets & Others": ["PLT", "PDW", "PCT"],
};

const Container = styled.View`
  margin-bottom: 20px;
`;

const GroupTitle = styled.Text`
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 8px;
  color: #1dd2d8;
`;

const FeatureItem = styled.TouchableOpacity`
  padding: 6px 12px;
  margin-bottom: 4px;
  background-color: ${(props) => (props.selected ? "#1dd2d8" : "#f0f0f0")};
  border-radius: 8px;
`;

const FeatureText = styled.Text`
  color: ${(props) => (props.selected ? "#fff" : "#333")};
  font-weight: 600;
`;

const FeatureSelector = ({ selectedFeatures, setSelectedFeatures }) => {
  const toggleFeature = (feature) => {
    if (selectedFeatures.includes(feature)) {
      setSelectedFeatures(selectedFeatures.filter((f) => f !== feature));
    } else {
      setSelectedFeatures([...selectedFeatures, feature]);
    }
  };

  return (
    <Container>
      {Object.entries(featureGroups).map(([groupName, features]) => (
        <View key={groupName} style={{ marginBottom: 16 }}>
          <GroupTitle>{groupName}</GroupTitle>
          {features.map((feature) => (
            <FeatureItem
              key={feature}
              selected={selectedFeatures.includes(feature)}
              onPress={() => toggleFeature(feature)}
            >
              <FeatureText selected={selectedFeatures.includes(feature)}>
                {feature}
              </FeatureText>
            </FeatureItem>
          ))}
        </View>
      ))}
    </Container>
  );
};

export default FeatureSelector;
