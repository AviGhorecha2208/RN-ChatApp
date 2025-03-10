import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { CommonStylesFn } from '../Utils/CommonStyles';
import { Colors } from '../Utils/Colors';

const EmptyComponent = ({ title = 'No Data Found' }: { title?: string }) => {
  return (
    <View style={styles.container}>
      <Text style={CommonStylesFn.text(4, Colors.white)}>{title}</Text>
    </View>
  );
};

export default EmptyComponent;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
