import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Colors } from '../../Utils/Colors';
import CommonHeader from '../../Components/CommonHeader';
import IconContainer from '../../Components/IconContainer';
import { useRoute } from '@react-navigation/native';
import { Message, Room } from '../../Interfaces/Network';
import { useSocket } from '../../Hooks/useSocket';
import { useSelector } from 'react-redux';
import { RootState } from '../../Store/Store';
import { getPreviousMessages } from '../../ApiCalls/Chat';
import MessageItem from '../../Components/MessageItem';
import { moderateScale, scale, verticalScale } from '../../Utils/Responsive';
import { pop } from '../../Navigation/NavigationServices';
import { showToast } from '../../Utils/Utility';
import { ToastType } from '../../Utils/Const';
import CommonButton from '../../Components/CommonButton';
import { CommonStylesFn } from '../../Utils/CommonStyles';
import { Fonts } from '../../Utils/Fonts';

const ChatScreen = () => {
  const route = useRoute();
  const { room } = route.params as { room: Room };
  const { username } = useSelector((state: RootState) => state.Auth.userData);
  const [message, setMessage] = useState('');
  const [localMessages, setLocalMessages] = useState<Message[]>([]);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [messagesFromSocket, setMessagesFromSocket] = useState<Message[]>([]);
  const userColors = useRef<{ [key: string]: string }>({});

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const {
    isConnected,
    messages: socketMessages,
    sendMessage,
    disconnect,
    connect,
    gotError,
  } = useSocket(room.id, username);

  const fetchPreviousMessages = useCallback(async () => {
    const messages = await getPreviousMessages(room.id);
    if (messages) {
      setLocalMessages(messages);
    }
  }, [room.id]);

  useEffect(() => {
    fetchPreviousMessages();
  }, [fetchPreviousMessages]);

  useEffect(() => {
    // console.log(socketMessages, 'socketMessages');
    if (socketMessages.length > 0) {
      setMessagesFromSocket(socketMessages);
    }
  }, [socketMessages]);

  const handleSend = async () => {
    const messageToSend = message.trim();
    if (messageToSend && isConnected) {
      sendMessage(messageToSend);
      setMessage('');
    } else if (!messageToSend) {
      showToast(ToastType.error, 'Please enter a message');
    } else if (!isConnected) {
      showToast(ToastType.error, 'Not connected to the chat');
    }
  };

  const handleLeftPress = () => {
    disconnect();
    pop();
  };

  const allMessages = [...localMessages, ...messagesFromSocket].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
  );

  const coloredMessages = allMessages.map((messageItem) => {
    const hue = Math.floor(Math.random() * 360);
    const saturation = 70 + Math.random() * 30;
    const lightness = 45 + Math.random() * 15;
    const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    if (!userColors.current[messageItem.username]) {
      userColors.current[messageItem.username] = color;
    }
    return {
      ...messageItem,
      color: userColors.current[messageItem.username],
    };
  });

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
      keyboardVerticalOffset={
        isKeyboardVisible ? (Platform.OS === 'ios' ? verticalScale(100) : verticalScale(60)) : 0
      }
    >
      <CommonHeader title={room.name} leftIcon={'arrow-left'} onLeftPress={handleLeftPress} />

      <FlatList
        data={coloredMessages}
        renderItem={({ item }) => <MessageItem item={item} />}
        keyExtractor={(item) => `${item.id}`}
        inverted
        contentContainerStyle={{ paddingVertical: verticalScale(10) }}
        showsVerticalScrollIndicator={false}
      />

      <View style={styles.inputContainer}>
        {isConnected ? (
          <>
            <TextInput
              style={styles.input}
              placeholder={'Type a message...'}
              value={message}
              onChangeText={setMessage}
              placeholderTextColor={Colors.white}
              multiline
            />
            <IconContainer
              name={'send'}
              size={20}
              onPress={handleSend}
              backgroundColor={Colors.primary}
              color={Colors.white}
            />
          </>
        ) : gotError ? (
          <CommonButton
            label={'Reconnect'}
            onPress={connect}
            containerStyle={styles.reconnectButton}
          />
        ) : (
          <Text
            style={[
              CommonStylesFn.text(3.5, Colors.white, Fonts.medium),
              { paddingVertical: scale(12) },
            ]}
          >
            {'Connecting to chat...'}
          </Text>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: scale(12),
    paddingVertical: verticalScale(12),
    backgroundColor: Colors.borderColor,
    gap: scale(12),
  },
  input: {
    flex: 1,
    paddingVertical: scale(12),
    paddingHorizontal: scale(16),
    borderRadius: moderateScale(20),
    backgroundColor: Colors.cardBackground,
    ...CommonStylesFn.text(3.5, Colors.white, Fonts.medium),
  },
  reconnectButton: {
    width: '50%',
    alignSelf: 'center',
  },
});
