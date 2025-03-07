import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Keyboard,
} from 'react-native';
import React, { useState, useEffect } from 'react';
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

const ChatScreen = () => {
  const route = useRoute();
  const { room } = route.params as { room: Room };
  const { username } = useSelector((state: RootState) => state.Auth.userData);
  const [message, setMessage] = useState('');
  const [localMessages, setLocalMessages] = useState<Message[]>([]);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  // Listen to keyboard events
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });

    // Cleanup listeners
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
  } = useSocket(room.id, username);

  useEffect(() => {
    const fetchPreviousMessages = async () => {
      const messages = await getPreviousMessages(room.id);
      if (messages) {
        console.log(messages, 'messages');
        setLocalMessages(messages);
      }
    };
    fetchPreviousMessages();
  }, [room.id]);

  useEffect(() => {
    if (socketMessages.length > 0) {
      setLocalMessages((prev) => [...prev, ...socketMessages]);
    }
  }, [socketMessages]);

  const handleSend = () => {
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

  if (!true) {
    return (
      <View style={styles.container}>
        <CommonHeader title={room.name} leftIcon={'arrow-left'} onLeftPress={handleLeftPress} />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size={'large'} color={Colors.primary} />
          <Text style={{ color: Colors.textSecondary }}>Connecting to chat...</Text>
        </View>
      </View>
    );
  }

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
        data={localMessages}
        renderItem={({ item }) => <MessageItem item={item} />}
        keyExtractor={(item) => `${item.id}`}
        inverted
        showsVerticalScrollIndicator={false}
      />

      <View style={styles.inputContainer}>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(12),
    paddingVertical: verticalScale(12),
    backgroundColor: Colors.borderColor,
    gap: scale(12),
  },
  input: {
    flex: 1,
    color: Colors.white,
    paddingVertical: scale(12),
    paddingHorizontal: scale(16),
    borderRadius: moderateScale(20),
    backgroundColor: Colors.cardBackground,
  },
});
