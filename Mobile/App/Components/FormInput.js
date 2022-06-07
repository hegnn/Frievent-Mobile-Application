import React from "react";
import { View, Text, TextInput, Pressable } from "react-native";

const FormInput = ({
  placeholder,
  containerStyle,
  inputStyle,
  hidePassword,
  setHidePassword,
  value,
  onChangeText,
  icon,
  iconRight,
  keyboardType,
}) => {
  return (
    <View
      style={{
        borderRadius: 15,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10,
        marginVertical: 10,
        ...containerStyle,
      }}
    >
      <TextInput
        style={{ fontSize: 15, flex: 1, height: 40, ...inputStyle }}
        placeholder={placeholder}
        secureTextEntry={hidePassword}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType || "default"}
        autoCapitalize="none"
      />
      {setHidePassword && (
        <Pressable onPress={setHidePassword}>
          <Text> {hidePassword ? "Show" : "Hide"} </Text>
        </Pressable>
      )}
    </View>
  );
};

export default FormInput;
