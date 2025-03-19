import { fetchNotificationsAsync } from "@/redux/thunk/notification/notificationThunk";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the Notification type
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
      state.unshift(action.payload); // Thêm thông báo mới vào đầu danh sách
    },
    markAllAsRead: (state) => {
      return state.map((notification) => ({
        ...notification,
        is_read: true,
      }));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchNotificationsAsync.fulfilled, (_, action) => {
      return action.payload as unknown as Notification[];
    });
  },
});

export const { addNotification, markAllAsRead } = notificationSlice.actions;
export const notificationReducer = notificationSlice.reducer;
