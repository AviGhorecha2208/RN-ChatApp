import APICall from '../Network/ApiCall';
import { EndPoints } from '../Network/EndPoints';
import { ToastType } from '../Utils/Const';
import { showToast } from '../Utils/Utility';

interface ApiMessage {
  content: string;
  created_at: string;
  id: number;
  room_id: string;
  user_id: number;
  username: string;
}

export const getPreviousMessages = async (roomId: number) => {
  try {
    const response = await APICall<ApiMessage[]>({
      method: 'get',
      url: `${EndPoints.getRooms}/${roomId}/messages`,
    });
    console.log('getPreviousMessages response', response);
    if (response.status === 200) {
      return response.data;
    } else {
      showToast(ToastType.error, 'Error fetching previous messages');
      return null;
    }
  } catch (error) {
    console.log('Error fetching previous messages:', error);
    showToast(ToastType.error, 'Error fetching previous messages');
    return null;
  }
};
