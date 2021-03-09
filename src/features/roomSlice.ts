import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

interface RoomState {
  roomId: string | null;
}

const initialState: RoomState = {
  roomId: null,
};

export const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    enterRoom: (state, action: { payload: string }) => {
      state.roomId = action.payload;
    },
  },
});

export const { enterRoom } = roomSlice.actions;

export const selectRoomId = (state: RootState) => state.room.roomId;

export default roomSlice.reducer;
