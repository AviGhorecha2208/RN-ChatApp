import { createSlice } from '@reduxjs/toolkit';

const initialState: {
  userData: null;
} = {
  userData: null,
};

export const authSlice = createSlice({
  name: 'Auth',
  initialState,
  reducers: {
    saveUserData: (state, action) => {
      state.userData = action.payload;
    },
  },
});

export const { saveUserData } = authSlice.actions;

export default authSlice.reducer;
