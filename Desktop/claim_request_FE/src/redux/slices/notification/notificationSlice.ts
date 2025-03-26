import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchNotificationsAsync, markNotificationAsRead } from "@/redux/thunk/notification/notificationThunk";

interface Notification {
  id: string;
  title: string;
  message: string;
  created_at: string;
  is_read: boolean;
}

interface NotificationState {
  notifications: Notification[];
  loading: boolean;
  error: string | null;
}

const initialState: NotificationState = {
  notifications: [],
  loading: false,
  error: null,
};

export const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    addNotification: (state, action) => {
      const notificationLst =  JSON.parse(JSON.stringify(state.notifications)).notifications
      notificationLst.unshift(action.payload); 
      console.log("Sau khi cập nhật:", notificationLst);
    },
    
    markAllAsRead: (state) => {
      state.notifications = state.notifications.map((notification) => ({
        ...notification,
        is_read: true,
      }));
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
      .addCase(markNotificationAsRead.fulfilled, (state, action) => {
        state.notifications = state.notifications.map((notification) =>
          notification.id === action.meta.arg
            ? { ...notification, is_read: true }
            : notification
        );
      });
  },
});

export const { addNotification, markAllAsRead } = notificationSlice.actions;
export default notificationSlice.reducer;
