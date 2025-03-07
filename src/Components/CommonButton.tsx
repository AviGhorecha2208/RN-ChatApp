import {
  ActivityIndicator,
  Image,
  ImageStyle,
  Pressable,
  StyleSheet,
  Text,
  TextStyle,
  ViewStyle,
} from 'react-native';
import React from 'react';
import { moderateScale, scale, verticalScale } from '../Utils/Responsive';
import { Colors } from '../Utils/Colors';
import { CommonStylesFn } from '../Utils/CommonStyles';
import { Fonts } from '../Utils/Fonts';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

interface CommonButtonProps {
  label: string;
  textStyle?: TextStyle;
  containerStyle?: ViewStyle | ViewStyle[];
  disabledStyle?: ViewStyle;
  isDisabled?: boolean;
  isLoading?: boolean;
  onPress: () => void;
  leftIcon?: any;
  leftIconStyle?: ImageStyle;
}

const CommonButton = ({
  label = '',
  containerStyle = {},
  textStyle = {},
  isDisabled,
  disabledStyle = {},
  isLoading,
  onPress,
  leftIcon,
  leftIconStyle,
}: CommonButtonProps) => {
  const animatedScale = useSharedValue(1);

  const handlePressIn = () => {
    animatedScale.value = withSpring(0.95);
  };

  const handlePressOut = () => {
    animatedScale.value = withSpring(1);
  };

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: animatedScale.value }],
    };
  });

  return (
    <Animated.View style={[styles.container, rStyle, containerStyle, isDisabled && disabledStyle]}>
      <Pressable
        style={styles.pressableContainer}
        onPress={onPress}
        disabled={isLoading || isDisabled}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        {leftIcon && <Image source={leftIcon} style={[styles.leftIcon, leftIconStyle]} />}
        {isLoading ? (
          <ActivityIndicator size={'small'} color={Colors.white} />
        ) : (
          <Text style={[CommonStylesFn.text(4, Colors.white, Fonts.medium), textStyle]}>
            {label}
          </Text>
        )}
      </Pressable>
    </Animated.View>
  );
};

export default CommonButton;

const styles = StyleSheet.create({
  container: {
    height: verticalScale(40),
    borderRadius: moderateScale(10),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
  },
  leftIcon: {
    width: moderateScale(20),
    height: moderateScale(20),
  },
  pressableContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: scale(10),
  },
});
