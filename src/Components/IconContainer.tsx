import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Colors } from '../Utils/Colors';
import { moderateScale } from '../Utils/Responsive';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { IconContainerProps } from '../Interfaces/Common';

const IconContainer = ({
  name,
  size = 20,
  color = Colors.primary,
  containerStyle,
  backgroundColor = Colors.cardBackground,
  showBorder = true,
  borderColor = Colors.borderColor,
  onPress,
}: IconContainerProps) => {
  return (
    <TouchableOpacity onPress={onPress} disabled={!onPress} activeOpacity={0.7}>
      <View
        style={[
          styles.container,
          {
            backgroundColor,
            borderWidth: showBorder ? moderateScale(1) : 0,
            borderColor: borderColor,
          },
          containerStyle,
        ]}
      >
        <Icon name={name} size={moderateScale(size)} color={color} />
      </View>
    </TouchableOpacity>
  );
};

export default IconContainer;

const styles = StyleSheet.create({
  container: {
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: moderateScale(20),
    backgroundColor: Colors.cardBackground,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Colors.borderColor,
  },
});
