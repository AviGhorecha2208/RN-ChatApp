import { RegisterUserResponse } from '../Interfaces/Network';
import { navigationRef } from '../Navigation/Navigation';
import { replace } from '../Navigation/NavigationServices';
import APICall from '../Network/ApiCall';
import { EndPoints } from '../Network/EndPoints';
import { updateUserData } from '../Store/Auth';
import { store } from '../Store/Store';
import { Screens, ToastType } from '../Utils/Const';
import { showToast } from '../Utils/Utility';

const handleRegisterUser = async (username: string) => {
  try {
    const response = await APICall<RegisterUserResponse>({
      url: EndPoints.registerUser,
      payload: { username },
      method: 'post',
    });
    if (response?.status === 200) {
      store.dispatch(updateUserData(response.data));
      showToast(ToastType.success, 'Register/Login Successfully');
      replace(Screens.Dashboard);
    } else {
      showToast(ToastType.error, 'Failed to register. Please try again.');
    }
    return response;
  } catch (error) {
    showToast(ToastType.error, 'Failed to register. Please try again.');
  }
};

export { handleRegisterUser };
