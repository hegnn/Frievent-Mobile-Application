import { Animated, StyleSheet } from "react-native";
import React from "react";
import { ScreenSize } from "../utility/Consts";
import { Colors } from "../utility/Colors";

const Indicator = ({ measures, scrollX, data }) => {
  const inputRange = data.map((_, i) => i * ScreenSize.width);
  const indicatorWidth = scrollX.interpolate({
    inputRange,
    outputRange: measures.map((measure) => measure.width - measure.width / 4),
  });
  const translateX = scrollX.interpolate({
    inputRange,
    outputRange: measures.map((measure) => measure.x + measure.width / 8),
  });

  return (
    <Animated.View
      style={{
        height: 1.3,
        borderRadius: 50,
        marginTop: 5,
        width: indicatorWidth,
        backgroundColor: Colors.black,
        left: 0,
        transform: [
          {
            translateX,
          },
        ],
      }}
    />
  );
};

export default Indicator;

const styles = StyleSheet.create({});
