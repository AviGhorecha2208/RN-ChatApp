import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Colors } from '../Utils/Colors';
import { moderateScale, scale, verticalScale } from '../Utils/Responsive';
import { CommonStylesFn } from '../Utils/CommonStyles';
import { Fonts } from '../Utils/Fonts';
import IconContainer from './IconContainer';

interface CommonHeaderProps {
  title: string;
  leftIcon?: string;
  rightIcon?: string;
  onLeftPress?: () => void;
  onRightPress?: () => void;
  showLeft?: boolean;
  showRight?: boolean;
}

const CommonHeader = ({
  title,
  leftIcon,
  rightIcon,
  onLeftPress,
  onRightPress,
}: CommonHeaderProps) => {
  return (
    <View style={styles.header}>
      {leftIcon ? (
        <IconContainer name={leftIcon} color={Colors.danger} size={20} onPress={onLeftPress} />
      ) : (
        <View style={styles.emptyContainer} />
      )}
      <Text style={[CommonStylesFn.text(4.5, Colors.white, Fonts.medium), styles.title]}>
        {title}
      </Text>
      {rightIcon ? (
        <IconContainer name={rightIcon} color={Colors.accent} size={20} onPress={onRightPress} />
      ) : (
        <View style={styles.emptyContainer} />
      )}
    </View>
  );
};

export default CommonHeader;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(12),
    backgroundColor: Colors.surface,
    borderBottomWidth: moderateScale(1),
    borderBottomColor: Colors.borderColor,
  },
  title: {
    flex: 1,
    textAlign: 'center',
    marginHorizontal: scale(8),
  },
  emptyContainer: {
    width: moderateScale(40),
  },
});
