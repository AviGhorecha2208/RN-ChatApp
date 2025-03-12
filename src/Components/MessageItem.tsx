import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Message } from '../Interfaces/Network';
import { Colors } from '../Utils/Colors';
import { CommonStylesFn } from '../Utils/CommonStyles';
import { Fonts } from '../Utils/Fonts';
import { moderateScale, scale, verticalScale } from '../Utils/Responsive';
import { useSelector } from 'react-redux';
import { RootState } from '../Store/Store';
import moment from 'moment';

interface MessageItemProps {
  item: Message;
}

const MessageItem = ({ item }: MessageItemProps) => {
  const { username } = useSelector((state: RootState) => state.Auth.userData);
  const isCurrentUser = item.username === username;

  const formatMessageTime = (timestamp: string) => {
    return moment(timestamp).format('hh:mm a');
  };

  return (
    <View style={[styles.container, isCurrentUser ? styles.rightContainer : styles.leftContainer]}>
      {!isCurrentUser && (
        <Text style={[CommonStylesFn.text(3, item?.color ?? Colors.textSecondary, Fonts.medium)]}>
          {item?.username}
        </Text>
      )}
      <Text style={styles.message}>{item?.content}</Text>
      <Text style={styles.time}>{formatMessageTime(item?.created_at)}</Text>
    </View>
  );
};

export default MessageItem;

const styles = StyleSheet.create({
  container: {
    marginVertical: verticalScale(4),
    maxWidth: '80%',
    backgroundColor: Colors.borderColor,
    borderRadius: moderateScale(16),
    marginHorizontal: scale(10),
    paddingHorizontal: scale(12),
    paddingVertical: verticalScale(4),
  },
  leftContainer: {
    alignSelf: 'flex-start',
  },
  rightContainer: {
    alignSelf: 'flex-end',
    backgroundColor: Colors.primary,
  },
  message: {
    marginVertical: verticalScale(8),
    ...CommonStylesFn.text(3.75, Colors.white, Fonts.regular),
  },
  time: {
    width: '100%',
    alignSelf: 'flex-end',
    ...CommonStylesFn.text(2.5, Colors.textPrimary, Fonts.regular),
  },
});
