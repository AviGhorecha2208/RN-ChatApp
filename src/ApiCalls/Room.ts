import { Room, StatsResponse } from '../Interfaces/Network';
import APICall from '../Network/ApiCall';
import { EndPoints } from '../Network/EndPoints';
import { updateRooms, updateStats } from '../Store/Rooms';
import { store } from '../Store/Store';
import { Colors } from '../Utils/Colors';
import { ToastType } from '../Utils/Const';
import { showToast, Utility } from '../Utils/Utility';

export const getRooms = async () => {
  const response = await APICall<Room[]>({
    method: 'get',
    url: EndPoints.getRooms,
  });
  if (response.status === 200) {
    store.dispatch(updateRooms(response.data));
    return response.data;
  } else {
    showToast(ToastType.error, 'Error fetching rooms');
    return [];
  }
};

export const createRoom = async (name: string) => {
  try {
    const response = await APICall<Room>({
      method: 'post',
      url: EndPoints.createRoom,
      payload: {
        name,
      },
    });
    console.log(response, 'response');
    if (response.status === 200) {
      showToast(ToastType.success, 'Room created successfully');
      await getRooms();
      await getStats();
      return response.data;
    } else {
      showToast(ToastType.error, 'Error creating room');
      return null;
    }
  } catch (error: any) {
    showToast(ToastType.error, error.data.detail);
    return null;
  }
};

export const getRoom = async (id: string) => {
  const response = await APICall<Room>({
    method: 'get',
    url: EndPoints.getRoom + id,
  });
  if (response.status === 200) {
    return response.data;
  } else {
    showToast(ToastType.error, 'Error fetching room');
    return null;
  }
};

export const getStats = async () => {
  const response = await APICall<StatsResponse>({
    method: 'get',
    url: EndPoints.getStats,
  });
  if (response.status === 200) {
    store.dispatch(
      updateStats({
        ...response.data,
        active_users: response.data.active_users?.map((user) => ({
          username: user,
          color:
            user === store.getState().Auth?.userData?.username
              ? Colors.primary
              : Utility.getRandomColor(),
        })),
      }),
    );
    const timeout = setTimeout(() => {
      const tempRooms = response.data.active_rooms.map((room) => ({
        ...room,
        is_active: store
          .getState()
          .Rooms?.stats?.active_rooms?.map((item) => item.id)
          .includes(room.id),
      }));
      store.dispatch(updateRooms(tempRooms));
      clearTimeout(timeout);
    }, 200);
    return response.data;
  } else {
    showToast(ToastType.error, 'Error fetching stats');
    return null;
  }
};
