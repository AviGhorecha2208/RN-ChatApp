import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { CommonStylesFn } from '../Utils/CommonStyles';
import { Colors } from '../Utils/Colors';
import { Fonts } from '../Utils/Fonts';
import { moderateScale, verticalScale } from '../Utils/Responsive';
import { Message } from '../Interfaces/Network';

const MessageItem = ({ item }: { item: Message }) => {
  return (
    <View style={[styles.messageContainer, styles.sentMessage]}>
      <Text style={[CommonStylesFn.text(3, Colors.textSecondary, Fonts.medium), styles.username]}>
        {item?.username}
      </Text>
      <Text style={[CommonStylesFn.text(3.5, Colors.white, Fonts.regular), styles.messageText]}>
        {item?.content}
      </Text>
    </View>
  );
};

export default MessageItem;

const styles = StyleSheet.create({
  username: {
    marginBottom: verticalScale(4),
  },
  messageContainer: {
    maxWidth: '80%',
    padding: moderateScale(12),
    borderRadius: moderateScale(16),
    marginVertical: verticalScale(4),
  },
  messageText: {
    lineHeight: 20,
  },
  timestamp: {
    marginTop: verticalScale(4),
    textAlign: 'right',
  },
  sentMessage: {
    alignSelf: 'flex-end',
    backgroundColor: Colors.sentMessage,
    borderBottomRightRadius: moderateScale(4),
  },
  receivedMessage: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.receivedMessage,
    borderBottomLeftRadius: moderateScale(4),
  },
});
