import { Room } from '../Interfaces/Network';
import APICall from '../Network/ApiCall';
import { EndPoints } from '../Network/EndPoints';
import { updateRooms } from '../Store/Rooms';
import { store } from '../Store/Store';
import { ToastType } from '../Utils/Const';
import { showToast } from '../Utils/Utility';

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
  const response = await APICall<Room>({
    method: 'post',
    url: EndPoints.createRoom,
    payload: {
      name,
    },
  });
  if (response.status === 200) {
    showToast(ToastType.success, 'Room created successfully');
    await getRooms();
    return response.data;
  } else {
    showToast(ToastType.error, 'Error creating room');
    return null;
  }
};
