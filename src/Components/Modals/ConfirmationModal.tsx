import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import React from 'react';
import ReactNativeModal from 'react-native-modal';
import CommonButton from '../CommonButton';
import { Colors } from '../../Utils/Colors';
import { SCREEN_HEIGHT, moderateScale, scale, verticalScale } from '../../Utils/Responsive';
import { CommonStylesFn } from '../../Utils/CommonStyles';
import { Fonts } from '../../Utils/Fonts';

interface ConfirmationModalProps {
  title: string;
  isLoading?: boolean;
  subTitle?: string;
  showModal: boolean;
  positiveLabel?: string;
  negativeLabel?: string;
  modalContainerStyle?: ViewStyle;
  backdropColor?: string;
  setShowModal: (value: boolean) => void;
  onPressPositive?: () => void;
  onPressNegative?: () => void;
}

const ConfirmationModal = ({
  title,
  isLoading,
  subTitle,
  showModal,
  positiveLabel,
  negativeLabel,
  modalContainerStyle,
  backdropColor,
  setShowModal,
  onPressPositive = () => null,
  onPressNegative = () => null,
}: ConfirmationModalProps) => {
  const closeModal = () => {
    if (!isLoading) {
      setShowModal(false);
    }
  };

  const handleCancel = () => {
    onPressNegative();
    closeModal();
  };

  return (
    <ReactNativeModal
      animationIn={'zoomIn'}
      animationOut={'zoomOut'}
      isVisible={showModal}
      style={[styles.modalContainer, modalContainerStyle]}
      onBackdropPress={closeModal}
      backdropColor={backdropColor}
      useNativeDriverForBackdrop={true}
      deviceHeight={SCREEN_HEIGHT}
    >
      <View style={styles.modalChildContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subTitle}>{subTitle}</Text>
        <View style={styles.buttonContainer}>
          <CommonButton
            label={negativeLabel ?? 'Cancel'}
            onPress={handleCancel}
            containerStyle={styles.cancelButton}
          />
          <CommonButton
            label={positiveLabel ?? 'Okay'}
            onPress={onPressPositive}
            containerStyle={styles.button}
            isLoading={isLoading}
            textStyle={{ color: Colors.white }}
          />
        </View>
      </View>
    </ReactNativeModal>
  );
};

export default ConfirmationModal;

const styles = StyleSheet.create({
  subTitleContainer: {
    marginVertical: verticalScale(10),
  },
  modalContainer: {
    margin: 0,
  },
  modalChildContainer: {
    backgroundColor: Colors.surface,
    marginHorizontal: scale(16),
    paddingHorizontal: scale(16),
    borderRadius: moderateScale(10),
    paddingVertical: verticalScale(10),
    borderWidth: moderateScale(1),
    borderColor: Colors.borderColor,
  },
  title: {
    ...CommonStylesFn.text(4.5, Colors.textPrimary, Fonts.medium),
    marginBottom: verticalScale(10),
    paddingBottom: verticalScale(10),
    borderBottomWidth: moderateScale(1),
    borderColor: Colors.borderColor,
  },
  subTitle: {
    ...CommonStylesFn.text(3.75, Colors.textPrimary, Fonts.regular),
    marginVertical: verticalScale(10),
    marginBottom: verticalScale(20),
  },
  titleContainer: {
    paddingVertical: verticalScale(10),
    borderBottomColor: Colors.primary,
    borderBottomWidth: moderateScale(1),
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(10),
  },
  cancelButton: {
    flex: 1,
    marginVertical: verticalScale(10),
    backgroundColor: Colors.background,
    borderWidth: moderateScale(1),
    borderColor: Colors.primary,
  },
  button: {
    flex: 1,
    backgroundColor: Colors.primary,
    marginVertical: verticalScale(10),
  },
});
