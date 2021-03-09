import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import roomReducer from "../features/roomSlice";

export const store = configureStore({
  reducer: {
    room: roomReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
