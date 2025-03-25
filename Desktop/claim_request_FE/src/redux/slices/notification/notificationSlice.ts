import { fetchNotificationsAsync } from "@/redux/thunk/notification/notificationThunk";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Notification = {
  id: string;
  message: string;
  is_read: boolean;
};

const notificationSlice = createSlice({
  name: "notifications",
  initialState: [] as Notification[],
  reducers: {
    addNotification: (state, action: PayloadAction<Notification>) => {
      console.log(action.payload);
      return [action.payload, ...state];
    },
    markAllAsRead: (state) => {
      if (state.length === 0) return state;
      return state.map((notification) => ({
        ...notification,
        is_read: true,
      }));
    },
    markAsRead: (state, action: PayloadAction<string>) => {
      return state.map((notification) =>
        notification.id === action.payload
          ? { ...notification, is_read: true }
          : notification
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchNotificationsAsync.fulfilled, (_, action) => {
      console.log(action.payload);
      return action.payload as unknown as Notification[];
    });
  },
});

export const { addNotification, markAllAsRead, markAsRead } =
  notificationSlice.actions;
export const notificationReducer = notificationSlice.reducer;
