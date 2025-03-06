import { SafeAreaView, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import React from 'react';
import { Colors } from '../Utils/Colors';

const AppContainer = ({
  children,
  containerStyles,
}: {
  children: React.ReactNode;
  containerStyles?: StyleProp<ViewStyle>;
}) => {
  return <SafeAreaView style={[styles.container, containerStyles || {}]}>{children}</SafeAreaView>;
};

export default AppContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});
