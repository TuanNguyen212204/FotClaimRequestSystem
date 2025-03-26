import { createSlice } from "@reduxjs/toolkit";
import {
  fetchNotificationsAsync,
  markNotificationAllAsRead,
} from "@/redux/thunk/notification/notificationThunk";

interface Notification {
  id: string;
  title: string;
  message: string;
  created_at: string;
  is_read: boolean;
}

const initialState: {
  notifications: Notification[];
  loading?: boolean;
  error?: string | null;
} = {
  notifications: [],
  loading: false,
  error: null,
};
export const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    addNotification: (state, action) => {
      const notificationLst = JSON.parse(
        JSON.stringify(state.notifications)
      ).notifications;
      const newList = {
        notifications: [action.payload, ...notificationLst ]
      };
      state.notifications = newList as unknown as Notification[];
    },

    markAllAsRead: (state) => {
      const notificationLst = JSON.parse(
        JSON.stringify(state.notifications)
      ).notifications;
      const newList = notificationLst.map((notification: Notification) => ({
        ...notification,
        is_read: true,
      }));
      console.log(newList)
      state.notifications = newList as unknown as Notification[];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotificationsAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNotificationsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications = action.payload as unknown as Notification[];
      })
      .addCase(fetchNotificationsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch notifications";
      })
      .addCase(markNotificationAllAsRead.fulfilled, (state, action) => {
        state.notifications = action.payload  as unknown as Notification[];
        
      });
  },
});

export const { addNotification, markAllAsRead } = notificationSlice.actions;
export default notificationSlice.reducer;
