import { Pressable, StyleSheet, Animated } from "react-native";
import React, { forwardRef } from "react";
import { ScreenSize } from "../utility/Consts";
import { Colors } from "../utility/Colors";

const Tab = forwardRef(({ item, onItemPress, scrollX, index }, ref) => {
  const isActive = Math.round(scrollX._value / ScreenSize.width) === index;

  return (
    <Pressable ref={ref} onPress={onItemPress}>
      <Animated.Text
        style={{
          fontWeight: "500",
          fontSize: 15,
          color: isActive ? Colors.black : "gray",
        }}
      >
        {item.title}
      </Animated.Text>
    </Pressable>
  );
});

export default Tab;

const styles = StyleSheet.create({});
