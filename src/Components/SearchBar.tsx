import { Image, Pressable, StyleSheet, TextInput, View, ViewStyle } from 'react-native';
import React from 'react';
import { moderateScale, scale, verticalScale } from '../Utils/Responsive';
import { Colors } from '../Utils/Colors';
import { Images } from '../Assets/Images/Images';

const SearchBar = ({
  onPressSearch,
  containerStyle,
}: {
  onPressSearch: () => void;
  containerStyle?: ViewStyle;
}) => {
  return (
    <View style={[styles.headerContainer, containerStyle]}>
      <TextInput placeholder='Search' style={styles.searchInput} />
      <Pressable onPress={onPressSearch} style={styles.searchButton}>
        <Image source={Images.search} style={styles.searchImage} />
      </Pressable>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  headerContainer: {
    paddingTop: verticalScale(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: scale(10),
  },
  searchButton: {
    paddingVertical: moderateScale(10),
    paddingHorizontal: moderateScale(10),
    backgroundColor: Colors.white,
    borderRadius: moderateScale(10),
    borderWidth: moderateScale(1),
    borderColor: Colors.borderColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchImage: {
    width: moderateScale(20),
    height: moderateScale(20),
    resizeMode: 'contain',
    tintColor: Colors.black,
  },
  searchInput: {
    flex: 1,
    height: moderateScale(40),
    textAlignVertical: 'center',
    borderWidth: moderateScale(1),
    borderColor: Colors.borderColor,
    borderRadius: moderateScale(10),
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(5),
  },
});
``;
