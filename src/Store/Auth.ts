import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RegisterUserResponse } from '../Interfaces/Network';
import { revertAll } from '../Store/RevertAll';

const initialState: {
  userData: RegisterUserResponse;
} = {
  userData: {
    username: '',
    id: null,
    created_at: '',
    expires_at: '',
  },
};

export const authSlice = createSlice({
  name: 'Auth',
  initialState,
  extraReducers: (builder) =>
    builder.addCase(revertAll, () => {
      return initialState;
    }),
  reducers: {
    updateUserData: (state, action: PayloadAction<RegisterUserResponse>) => {
      state.userData = action.payload;
    },
  },
});

export const { updateUserData } = authSlice.actions;

export default authSlice.reducer;
