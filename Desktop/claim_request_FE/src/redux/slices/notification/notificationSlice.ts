import { createSlice } from "@reduxjs/toolkit";
import {
  fetchNotificationsAsync,
  markNotificationAllAsRead,
  markNotificationAsReadById,
} from "@/redux/thunk/notification/notificationThunk";

interface Notification {
  id: number;
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
        notifications: [action.payload, ...notificationLst],
      };
      state.notifications = newList as unknown as Notification[];
    },
    updateMarkAsRead: (state, action) => {
      const id  = action.payload; // Giả sử payload chứa id của thông báo
      const notificationLst = JSON.parse(
        JSON.stringify(state.notifications)
      ).notifications
      const notificationIndex = notificationLst.findIndex((n:Notification) => n.id === id);
      console.log(notificationIndex) 
      if (notificationIndex !== -1) {
        notificationLst[notificationIndex].is_read = true;
      }
      console.log(notificationLst)
      state.notifications = {notifications: notificationLst} as unknown as Notification[];
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
      .addCase(markNotificationAllAsRead.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(markNotificationAllAsRead.fulfilled, (state, action) => {
        state.loading = false;
        console.log(state.notifications);
        console.log(action.payload);
        state.notifications = action.payload as unknown as Notification[]; // Updated notifications from API
      })
      .addCase(markNotificationAllAsRead.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || "Failed to mark notifications as read";
      })
      .addCase(markNotificationAsReadById.pending, (state) => {
        state.loading = true; // Đang xử lý yêu cầu
        state.error = null;
      })
      .addCase(markNotificationAsReadById.fulfilled, (state, action) => {
        state.loading = false; // Hoàn thành yêu cầu
        // Cập nhật thông báo trong state
        const updatedNotification = action.payload; // Giả sử payload chứa thông báo đã được cập nhật
        const index = state.notifications.findIndex(
          (n) => n.id === updatedNotification.id
        );
        if (index !== -1) {
          state.notifications[index] = {
            ...state.notifications[index],
            ...updatedNotification,
          }; // Cập nhật thông báo
        }
      })
      .addCase(markNotificationAsReadById.rejected, (state, action) => {
        state.loading = false; // Hoàn thành yêu cầu
        state.error =
          action.error.message || "Failed to mark notification as read"; // Xử lý lỗi
      });
  },
});

export const { addNotification, updateMarkAsRead } = notificationSlice.actions;
export default notificationSlice.reducer;
