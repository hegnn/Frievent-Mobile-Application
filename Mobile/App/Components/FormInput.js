import React from 'react';
import {View, Text, TextInput, Pressable} from 'react-native';
import {Colors, EventColors} from '../utility/Colors';

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
  title,
  autoCapitalize = true,
}) => {
  const Divider = () => (
    <View
      style={{
        width: '100%',
        height: 1,
        opacity: 0.1,
        backgroundColor: 'gray',
        marginBottom: 20,
      }}
    />
  );

  return (
    <View>
      <Text style={{color: EventColors.green, marginBottom: 7}}>{title}</Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          // borderWidth: 1,
          alignItems: 'center',
        }}>
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={'gray'}
          secureTextEntry={hidePassword}
          style={{
            backgroundColor: Colors.whiteBackground,
            flexDirection: 'row',
            alignItems: 'center',
            fontSize: 17,
            flex: 1,
            height: 40,
            fontWeight: 'bold',
          }}
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType || 'default'}
          autoCapitalize={!autoCapitalize ? 'none' : 'sentences'}
          autoCorrect={false}
        />

        {setHidePassword && (
          <Pressable onPress={() => setHidePassword(!hidePassword)}>
            <Text> {hidePassword ? 'Show' : 'Hide'} </Text>
          </Pressable>
        )}
      </View>
      <Divider />
    </View>
  );
};

export default FormInput;
