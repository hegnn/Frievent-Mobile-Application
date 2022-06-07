import { StyleSheet, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import Tab from "./Tab";
import Indicator from "./Indicator";

const Tabs = ({ data, scrollX, onItemPress }) => {
  const [measures, setMeasures] = useState([]);
  const containerRef = useRef();

  useEffect(() => {
    let temp = [];
    data.forEach((item) => {
      if (item.ref.current && containerRef.current) {
        item.ref.current.measureLayout(
          containerRef.current,
          (x, y, width, height) => {
            temp.push({ x, y, width, height });

            temp.length === data.length && setMeasures(temp);
          }
        );
      }
    });
  }, [measures]);

  return (
    <View style={{ marginBottom: 20 }}>
      <View
        ref={containerRef}
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        {data.map((item, index) => {
          return (
            <Tab
              key={item.title}
              item={item}
              ref={item.ref}
              onItemPress={() => onItemPress(index)}
              index={index}
              scrollX={scrollX}
            />
          );
        })}
      </View>

      {measures.length > 0 && (
        <Indicator measures={measures} scrollX={scrollX} data={data} />
      )}
    </View>
  );
};

export default Tabs;

const styles = StyleSheet.create({});
