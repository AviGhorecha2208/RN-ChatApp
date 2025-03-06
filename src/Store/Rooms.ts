import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Room } from '../Interfaces/Network';
import { revertAll } from './RevertAll';

const initialState: {
  rooms: Room[];
} = {
  rooms: [],
};

export const roomsSlice = createSlice({
  name: 'Rooms',
  initialState,
  extraReducers: (builder) =>
    builder.addCase(revertAll, () => {
      return initialState;
    }),
  reducers: {
    updateRooms: (state, action: PayloadAction<Room[]>) => {
      state.rooms = action.payload;
    },
  },
});

export const { updateRooms } = roomsSlice.actions;

export default roomsSlice.reducer;
