import { FlatList, RefreshControl, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Colors } from '../../Utils/Colors';
import { useSelector } from 'react-redux';
import { RootState } from '../../Store/Store';
import CommonHeader from '../../Components/CommonHeader';
import { moderateScale, scale, verticalScale } from '../../Utils/Responsive';
import { getRooms, getStats } from '../../ApiCalls/Room';
import RoomItem from '../../Components/RoomItem';
import { Screens } from '../../Utils/Const';
import { push } from '../../Navigation/NavigationServices';
import { CommonStylesFn } from '../../Utils/CommonStyles';
import { Fonts } from '../../Utils/Fonts';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Utility } from '../../Utils/Utility';
import ConfirmationModal from '../../Components/Modals/ConfirmationModal';
import EmptyComponent from '../../Components/EmptyComponent';
import { Room } from '../../Interfaces/Network';

const ITEMS_PER_PAGE = 20;

const DashboardScreen = () => {
  const { username } = useSelector((state: RootState) => state.Auth.userData);
  const { rooms } = useSelector((state: RootState) => state.Rooms);
  const { stats } = useSelector((state: RootState) => state.Rooms);
  const { active_rooms, total_rooms, total_users } = stats;
  const [searchText, setSearchText] = useState('');
  const [searchedRooms, setSearchedRooms] = useState(active_rooms);
  const [showModal, setShowModal] = useState(false);
  const [displayedRooms, setDisplayedRooms] = useState<Room[]>([]);

  useEffect(() => {
    getRooms().then(() => {
      getStats();
    });
  }, []);

  useEffect(() => {
    setSearchedRooms(rooms);
    setSearchText('');
    setDisplayedRooms(rooms?.slice(0, ITEMS_PER_PAGE) || []);
  }, [rooms]);

  const handleCreateRoom = () => {
    push(Screens.CreateRoom);
  };

  const handleRefresh = async () => {
    try {
      await getRooms();
      await getStats();
    } catch (error) {
      console.log(error, 'handleRefresh error');
    }
  };

  const handleSearch = (text: string) => {
    setSearchText(text);
    if (text.trim() === '') {
      setSearchedRooms(rooms);
      setDisplayedRooms(rooms?.slice(0, ITEMS_PER_PAGE) || []);
    } else {
      const filteredRooms = rooms?.filter((room) =>
        room.name?.toLowerCase().includes(text?.toLowerCase()),
      );
      setSearchedRooms(filteredRooms);
      setDisplayedRooms(filteredRooms?.slice(0, ITEMS_PER_PAGE) || []);
    }
  };

  const loadMoreRooms = () => {
    const currentLength = displayedRooms.length;
    const nextBatch = searchedRooms?.slice(currentLength, currentLength + ITEMS_PER_PAGE) || [];

    if (nextBatch.length > 0) {
      setDisplayedRooms((prev) => [...prev, ...nextBatch]);
    }
  };

  return (
    <View style={styles.container}>
      <CommonHeader
        title={`${username || 'User'}`}
        leftIcon={'logout'}
        onLeftPress={() => {
          setShowModal(true);
        }}
        rightIcon={'plus'}
        onRightPress={handleCreateRoom}
      />
      <View style={styles.subContainer}>
        <View style={styles.flHeaderContainer}>
          <Text
            style={CommonStylesFn.text(4, Colors.white, Fonts.bold)}
          >{`Active Rooms (${active_rooms?.length} / ${total_rooms})`}</Text>
          <Text
            style={CommonStylesFn.text(4, Colors.white, Fonts.bold)}
          >{`Total Users: ${total_users}`}</Text>
        </View>
        <View style={styles.searchInputContainer}>
          <Icon name={'magnify'} size={moderateScale(20)} color={Colors.primary} />
          <TextInput
            value={searchText}
            placeholder={'Search From Active Rooms'}
            style={styles.searchInput}
            onChangeText={handleSearch}
            placeholderTextColor={Colors.white}
          />
        </View>
        <FlatList
          data={displayedRooms}
          renderItem={({ item, index }) => <RoomItem room={item} index={index} />}
          keyExtractor={(item) => `room-${item.id}`}
          contentContainerStyle={styles.flContent}
          showsVerticalScrollIndicator={true}
          refreshControl={<RefreshControl refreshing={false} onRefresh={handleRefresh} />}
          ListEmptyComponent={EmptyComponent}
          onEndReached={loadMoreRooms}
          onEndReachedThreshold={0.1}
        />
      </View>
      <ConfirmationModal
        showModal={showModal}
        setShowModal={setShowModal}
        title={'Logout'}
        subTitle={'Are you sure you want to logout?\n\nYour session will be terminated.'}
        onPressPositive={() => {
          Utility.logout();
          setShowModal(false);
        }}
      />
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
    flex: 1, // Changed to flex: 1 to ensure it takes available space
    paddingHorizontal: scale(16),
  },
  flContent: {
    paddingTop: verticalScale(12),
    paddingBottom: verticalScale(24),
    gap: verticalScale(12),
  },
  flHeaderContainer: {
    paddingVertical: verticalScale(12),
    gap: scale(12),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: verticalScale(4),
    gap: scale(12),
    borderRadius: moderateScale(8),
    marginBottom: verticalScale(4),
    backgroundColor: Colors.cardBackground,
    paddingHorizontal: scale(12),
  },
  searchInput: {
    flex: 1,
    color: Colors.white,
    paddingVertical: verticalScale(8),
  },
  flSearchIcon: {
    paddingHorizontal: scale(12),
  },
});
