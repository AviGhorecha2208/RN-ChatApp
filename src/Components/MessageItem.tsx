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
    return moment(timestamp).format('HH:mm');
  };

  return (
    <View style={[styles.container, isCurrentUser ? styles.rightContainer : styles.leftContainer]}>
      {!isCurrentUser && (
        <Text style={[CommonStylesFn.text(3, Colors.textSecondary, Fonts.medium)]}>
          {item.username}
        </Text>
      )}
      <View
        style={[styles.messageContainer, isCurrentUser ? styles.rightMessage : styles.leftMessage]}
      >
        <Text
          style={[
            CommonStylesFn.text(
              3.5,
              isCurrentUser ? Colors.white : Colors.textPrimary,
              Fonts.regular,
            ),
          ]}
        >
          {item.content}
        </Text>
      </View>
      <Text
        style={[
          CommonStylesFn.text(2.5, Colors.textSecondary, Fonts.regular),
          isCurrentUser ? styles.rightTime : styles.leftTime,
        ]}
      >
        {formatMessageTime(item.created_at)}
      </Text>
    </View>
  );
};

export default MessageItem;

const styles = StyleSheet.create({
  container: {
    marginVertical: verticalScale(4),
    maxWidth: '80%',
  },
  leftContainer: {
    alignSelf: 'flex-start',
    marginLeft: scale(8),
  },
  rightContainer: {
    alignSelf: 'flex-end',
    marginRight: scale(8),
  },
  messageContainer: {
    padding: moderateScale(12),
    borderRadius: moderateScale(16),
    marginTop: verticalScale(4),
  },
  leftMessage: {
    backgroundColor: Colors.cardBackground,
    borderTopLeftRadius: moderateScale(4),
  },
  rightMessage: {
    backgroundColor: Colors.primary,
    borderTopRightRadius: moderateScale(4),
  },
  leftTime: {
    marginLeft: scale(4),
    marginTop: verticalScale(4),
  },
  rightTime: {
    marginRight: scale(4),
    marginTop: verticalScale(4),
    textAlign: 'right',
  },
});
