import { StyleSheet, View, ViewStyle } from 'react-native';
import React from 'react';
import ReactNativeModal from 'react-native-modal';
import CommonButton from '../CommonButton';
import SubTitle from '../SubTitle';
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
        {title && (
          <SubTitle label={title} containerStyle={styles.titleContainer} textStyle={styles.title} />
        )}
        {subTitle && <SubTitle label={subTitle} containerStyle={styles.subTitleContainer} />}
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
    backgroundColor: Colors.white,
    marginHorizontal: scale(10),
    paddingHorizontal: scale(10),
    borderRadius: moderateScale(10),
    paddingVertical: verticalScale(10),
    borderWidth: moderateScale(1),
    borderColor: Colors.borderColor,
  },
  title: {
    ...CommonStylesFn.text(4, Colors.textPrimary, Fonts.medium),
  },
  subTitle: {
    ...CommonStylesFn.text(3.75, Colors.textPrimary, Fonts.regular),
    marginVertical: verticalScale(10),
    marginBottom: verticalScale(50),
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
  },
  button: {
    flex: 1,
    backgroundColor: Colors.primary,
    marginVertical: verticalScale(10),
  },
});
