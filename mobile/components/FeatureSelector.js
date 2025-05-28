import React from "react";
import { View } from "react-native";
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

const FeatureGrid = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
`;

const FeatureItem = styled.TouchableOpacity`
  width: 30%;
  margin-right: 3.33%;
  margin-bottom: 10px;
  padding: 8px 6px;
  background-color: ${(props) => (props.selected ? "#1dd2d8" : "#f0f0f0")};
  border-radius: 8px;
  align-items: center;

  ${(props) =>
    props.index % 3 === 2 &&
    `
    margin-right: 0;
  `}
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
          <FeatureGrid>
            {features.map((feature, index) => (
              <FeatureItem
                key={feature}
                selected={selectedFeatures.includes(feature)}
                onPress={() => toggleFeature(feature)}
                index={index}
              >
                <FeatureText selected={selectedFeatures.includes(feature)}>
                  {feature}
                </FeatureText>
              </FeatureItem>
            ))}
          </FeatureGrid>
        </View>
      ))}
    </Container>
  );
};

export default FeatureSelector;
