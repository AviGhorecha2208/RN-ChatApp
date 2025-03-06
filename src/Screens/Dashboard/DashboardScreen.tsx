import {
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Colors } from '../../Utils/Colors';
import { useSelector } from 'react-redux';
import { RootState, store } from '../../Store/Store';
import CommonHeader from '../../Components/CommonHeader';
import { moderateScale, scale, verticalScale } from '../../Utils/Responsive';
import { getRooms } from '../../ApiCalls/Room';
import RoomItem from '../../Components/RoomItem';
import { Screens } from '../../Utils/Const';
import { push, reset } from '../../Navigation/NavigationServices';
import { revertAll } from '../../Store/RevertAll';
import { CommonStylesFn } from '../../Utils/CommonStyles';
import { Fonts } from '../../Utils/Fonts';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const DashboardScreen = () => {
  const userData = useSelector((state: RootState) => state.Auth.userData);
  const rooms = useSelector((state: RootState) => state.Rooms.rooms);
  const [searchText, setSearchText] = useState('');
  const [searchedRooms, setSearchedRooms] = useState(rooms);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getRooms();
  }, []);

  useEffect(() => {
    setSearchedRooms(rooms);
  }, [rooms]);

  const logout = () => {
    reset({
      index: 0,
      routes: [{ name: Screens.RegisterUser }],
    });
    store.dispatch(revertAll());
  };

  const handleCreateRoom = () => {
    push(Screens.CreateRoom);
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await getRooms();
    setRefreshing(false);
  };

  const handleSearch = (text: string) => {
    setSearchText(text);
    if (text.trim() === '') {
      setSearchedRooms(rooms);
    } else {
      setSearchedRooms(
        rooms?.filter((room) => room.name?.toLowerCase().includes(text?.toLowerCase())),
      );
    }
  };

  return (
    <View style={styles.container}>
      <CommonHeader title={userData?.username || 'User'} leftIcon={'logout'} onLeftPress={logout} />
      <View style={styles.subContainer}>
        <View style={styles.flHeaderContainer}>
          <Text style={CommonStylesFn.text(4, Colors.white, Fonts.bold)}>{'Available Rooms'}</Text>
          <TouchableOpacity onPress={handleCreateRoom}>
            <Icon name={'plus'} size={moderateScale(20)} color={Colors.primary} />
          </TouchableOpacity>
        </View>
        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <Icon name={'magnify'} size={moderateScale(20)} color={Colors.primary} />
            <TextInput
              value={searchText}
              placeholder={'Search Room'}
              style={styles.searchInput}
              onChangeText={handleSearch}
            />
          </View>
        </View>
        <FlatList
          data={searchedRooms}
          renderItem={({ item, index }) => <RoomItem room={item} index={index} />}
          keyExtractor={(item) => `room-${item.id}`}
          contentContainerStyle={styles.flContent}
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
        />
      </View>
    </View>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  subContainer: {
    paddingHorizontal: scale(16),
  },
  flContent: {
    paddingVertical: verticalScale(12),
    gap: verticalScale(12),
  },
  flHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: verticalScale(12),
    gap: scale(12),
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(12),
    borderRadius: moderateScale(8),
    backgroundColor: Colors.white,
    paddingHorizontal: scale(12),
  },
  searchInput: {
    paddingVertical: verticalScale(8),
    flex: 1,
  },
  flSearchIcon: {
    paddingHorizontal: scale(12),
  },
});
