import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ScreenSize} from '../utility/Consts';

const Loader = () => {
  return (
    <View
      style={{
        position: 'absolute',
        width: ScreenSize.width,
        height: ScreenSize.height,
        backgroundColor: 'black',
        opacity: 0.6,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
      }}>
      <ActivityIndicator size={'large'} />
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({});
