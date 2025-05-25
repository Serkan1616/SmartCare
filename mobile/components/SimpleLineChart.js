import React from "react";
import { Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { normalRanges } from "./normalRanges"; // Normal aralıkların olduğu obje
import Svg, { Rect, Defs, LinearGradient, Stop } from "react-native-svg";

const screenWidth = Dimensions.get("window").width;

const colors = [
  "#1dd2d8",
  "#ff6384",
  "#36a2eb",
  "#ffcd56",
  "#4bc0c0",
  "#9966ff",
  "#ff9f40",
];

const SimpleLineChart = ({ reports, featureKeys }) => {
  if (
    !reports ||
    reports.length === 0 ||
    !featureKeys ||
    featureKeys.length === 0
  )
    return null;

  // Raporları tarihe göre sırala
  const sortedReports = [...reports].sort(
    (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
  );

  // Grafik label'ları
  const labels = sortedReports.map((_, i) => `#${i + 1}`);

  let datasets = featureKeys.map((key, idx) => ({
    data: sortedReports.map((r) => r.features?.[key] || 0),
    color: () => colors[idx % colors.length],
    strokeWidth: 2,
  }));

  if (featureKeys.length === 1) {
    const key = featureKeys[0];
    const normalRange = normalRanges[key];
    if (normalRange) {
      const { min, max } = normalRange;

      const minLine = Array(labels.length).fill(min);
      const maxLine = Array(labels.length).fill(max);

      datasets = [
        ...datasets,
        {
          data: minLine,
          color: () => "rgba(19, 171, 138, 0.8)",
          strokeWidth: 3, // Daha kalın çizgi
          withDots: true, // Noktaları göster
          // Noktaların görünümünü özelleştir
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#1dd2d8",
            fill: "#1dd2d8",
          },
        },
        {
          data: maxLine,
          color: () => "rgba(19, 171, 138, 0.8)",
          strokeWidth: 3,
          withDots: true,
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#1dd2d8",
            fill: "#1dd2d8",
          },
        },
      ];
    }
  }

  const data = {
    labels,
    datasets,
    legend: featureKeys,
  };

  return (
    <LineChart
      data={data}
      width={screenWidth - 40}
      height={260}
      chartConfig={{
        backgroundColor: "#ffffff",
        backgroundGradientFrom: "#f7fafa",
        backgroundGradientTo: "#f7fafa",
        decimalPlaces: 1,
        color: (opacity = 1) => `rgba(29, 210, 216, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        propsForDots: {
          r: "4",
          strokeWidth: "2",
          stroke: "#1dd2d8",
        },
        style: {
          borderRadius: 16,
        },
      }}
      bezier
      style={{
        marginVertical: 15,
        borderRadius: 16,
      }}
    />
  );
};

export default SimpleLineChart;
