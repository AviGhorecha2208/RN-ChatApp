import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import React, { useState } from 'react';
import { Colors } from '../../Utils/Colors';
import CommonButton from '../../Components/CommonButton';
import { moderateScale, scale, verticalScale, widthPx } from '../../Utils/Responsive';
import { CommonStylesFn } from '../../Utils/CommonStyles';
import { Fonts } from '../../Utils/Fonts';
import { createRoom } from '../../ApiCalls/Room';
import { pop } from '../../Navigation/NavigationServices';
import CommonHeader from '../../Components/CommonHeader';

const CreateRoomScreen = () => {
  const [roomName, setRoomName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!roomName.trim()) {
      setError('Room name is required');
      return;
    }
    if (roomName.length < 3) {
      setError('Room name must be at least 3 characters');
      return;
    }
    setError('');
    await createRoom(roomName);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <CommonHeader title={'Create Room'} leftIcon={'arrow-left'} onLeftPress={() => pop()} />
      <View style={styles.formContainer}>
        <View style={styles.card}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder={'Enter room name'}
              placeholderTextColor={Colors.textMuted}
              value={roomName}
              onChangeText={(text) => {
                setRoomName(text);
                setError('');
              }}
              autoCapitalize={'none'}
              autoCorrect={false}
            />
            {error ? (
              <Text style={[CommonStylesFn.text(3, Colors.error, Fonts.regular), styles.errorText]}>
                {error}
              </Text>
            ) : null}
          </View>
          <CommonButton label={'Create Room'} onPress={handleSubmit} />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default CreateRoomScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: verticalScale(40),
  },
  card: {
    width: widthPx(85),
    backgroundColor: Colors.cardBackground,
    borderRadius: moderateScale(16),
    paddingHorizontal: scale(24),
    paddingVertical: verticalScale(24),
  },
  inputContainer: {
    marginBottom: verticalScale(24),
  },
  input: {
    borderWidth: moderateScale(1),
    borderColor: Colors.borderColor,
    borderRadius: moderateScale(12),
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(16),
    backgroundColor: Colors.surface,
    ...CommonStylesFn.text(3.5, Colors.textPrimary, Fonts.regular),
  },
  errorText: {
    marginTop: verticalScale(8),
  },
});
