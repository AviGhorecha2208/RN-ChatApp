import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { Colors } from '../Utils/Colors';
import { heightPx, moderateScale, widthPx } from '../Utils/Responsive';

interface AppLoaderProps {
  visible?: boolean;
}

const AppLoader = forwardRef((props: AppLoaderProps, ref) => {
  const { visible = false } = props;
  const [isLoading, setIsLoading] = useState(false);

  const showLoader = (isLoading: boolean | ((prevState: boolean) => boolean)) =>
    setIsLoading(isLoading);

  useImperativeHandle(ref, () => ({
    showLoader,
  }));

  if (visible || isLoading) {
    return (
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <ActivityIndicator color={Colors.primary} size={'large'} />
        </View>
      </View>
    );
  }
  return null;
});

export default AppLoader;

const styles = StyleSheet.create({
  container: {
    zIndex: 1000,
    position: 'absolute',
    width: widthPx(100),
    height: heightPx(105),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.overlay50,
  },
  innerContainer: {
    width: moderateScale(80),
    height: moderateScale(80),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: moderateScale(20),
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
});
