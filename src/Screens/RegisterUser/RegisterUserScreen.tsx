import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../Utils/Colors';
import CommonButton from '../../Components/CommonButton';
import { moderateScale, scale, verticalScale, widthPx } from '../../Utils/Responsive';
import { CommonStylesFn } from '../../Utils/CommonStyles';
import { Fonts } from '../../Utils/Fonts';
import { handleRegisterUser } from '../../ApiCalls/Auth';

const RegisterUserScreen = () => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!username.trim()) {
      setError('Username is required');
      return;
    }
    if (username.length < 3) {
      setError('Username must be at least 3 characters');
      return;
    }
    setError('');
    await handleRegisterUser(username);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <View style={styles.formContainer}>
          <View style={styles.card}>
            <View style={styles.headerContainer}>
              <Text style={CommonStylesFn.text(4, Colors.white, Fonts.bold)}>{'Welcome to'}</Text>
              <Text style={CommonStylesFn.text(12, Colors.primary, Fonts.bold)}>{'Chat App'}</Text>
              <Text style={CommonStylesFn.text(3.5, Colors.white, Fonts.regular)}>
                {'Enter your username to start chatting'}
              </Text>
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder={'Enter username'}
                placeholderTextColor={Colors.textMuted}
                value={username}
                onChangeText={(text) => {
                  setUsername(text);
                  setError('');
                }}
                autoCapitalize={'none'}
                autoCorrect={false}
              />
              {error ? (
                <Text
                  style={[CommonStylesFn.text(3, Colors.error, Fonts.regular), styles.errorText]}
                >
                  {error}
                </Text>
              ) : null}
            </View>
            <CommonButton label={'Get Started'} onPress={handleSubmit} />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterUserScreen;

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
  headerContainer: {
    alignItems: 'center',
    marginBottom: verticalScale(20),
  },
  appTitle: {
    marginBottom: verticalScale(10),
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  subtitle: {
    opacity: 0.8,
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
  label: {
    marginBottom: verticalScale(8),
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  input: {
    borderWidth: moderateScale(1),
    borderColor: Colors.borderColor,
    borderRadius: moderateScale(12),
    marginTop: verticalScale(20),

    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(16),
    backgroundColor: Colors.surface,
    ...CommonStylesFn.text(3.5, Colors.textPrimary, Fonts.regular),
  },
  errorText: {
    marginTop: verticalScale(8),
  },
});
