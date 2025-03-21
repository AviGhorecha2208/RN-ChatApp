import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Room, StatsPayload } from '../Interfaces/Network';
import { revertAll } from './RevertAll';

const initialState: {
  rooms: Room[];
  stats: StatsPayload;
} = {
  rooms: [],
  stats: {
    total_rooms: 0,
    total_users: 0,
    active_rooms: [],
    active_users: [],
  },
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
    updateStats: (state, action: PayloadAction<StatsPayload>) => {
      state.stats = action.payload;
    },
  },
});

export const { updateRooms, updateStats } = roomsSlice.actions;

export default roomsSlice.reducer;
