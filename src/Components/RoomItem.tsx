import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Room } from '../Interfaces/Network';
import { Colors } from '../Utils/Colors';
import { moderateScale, scale, verticalScale } from '../Utils/Responsive';
import { CommonStylesFn } from '../Utils/CommonStyles';
import { Fonts } from '../Utils/Fonts';
import IconContainer from './IconContainer';

interface RoomItemProps {
  room: Room;
  index: number;
}

const RoomItem = ({ room, index }: RoomItemProps) => {
  const handlePress = () => {};

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress} activeOpacity={0.7}>
      <View style={styles.leftContainer}>
        <View style={styles.roomNumberContainer}>
          <Text style={CommonStylesFn.text(4, Colors.white, Fonts.bold)}>{index + 1}</Text>
        </View>
        <IconContainer name={'message-text'} size={20} />
        <Text style={styles.roomName}>{room.name}</Text>
      </View>
      <IconContainer
        name={'chevron-right'}
        size={24}
        color={Colors.textSecondary}
        showBorder={false}
        backgroundColor={'transparent'}
      />
    </TouchableOpacity>
  );
};

export default RoomItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: verticalScale(50),
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.cardBackground,
    paddingVertical: verticalScale(12),
    paddingRight: scale(16),
    borderRadius: moderateScale(12),
    borderWidth: moderateScale(1),
    borderColor: Colors.borderColor,
  },

  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(16),
    height: '100%',
  },
  roomNumberContainer: {
    width: scale(32),
    height: verticalScale(50),
    borderRadius: moderateScale(10),
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },

  roomName: {
    ...CommonStylesFn.text(4, Colors.white, Fonts.medium),
  },
});
