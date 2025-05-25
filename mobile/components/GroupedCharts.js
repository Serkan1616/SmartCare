import React from "react";
import { View, Text, ScrollView, Dimensions } from "react-native";
import SimpleLineChart from "./SimpleLineChart"; // Önceki grafiğin olduğu dosya
import { featureGroups } from "./featureGroups";

const screenWidth = Dimensions.get("window").width;

const GroupedCharts = ({ reports }) => {
  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      {Object.entries(featureGroups).map(([groupName, features]) => (
        <View key={groupName} style={{ marginBottom: 40 }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: "#1dd2d8",
              marginBottom: 10,
            }}
          >
            {groupName}
          </Text>

          {features.map((featureKey) => (
            <SimpleLineChart
              key={featureKey}
              reports={reports}
              featureKey={featureKey}
            />
          ))}
        </View>
      ))}
    </ScrollView>
  );
};

export default GroupedCharts;
