import { createAsyncThunk } from "@reduxjs/toolkit";
import httpClient from "@/constant/apiInstance";
import { ApiResponse } from "@/types/ApiResponse";

export const fetchNotificationsAsync = createAsyncThunk(
  "notifications/fetchNotifications",
  async () => {
    const response = await httpClient.get<ApiResponse<Notification[]>>(
      "/notifications"
    );
    return response.data; // Lấy chỉ phần data chứa danh sách thông báo
  }
);


export const markNotificationAsRead = createAsyncThunk(
  "notifications/markAsRead",
  async (id: string) => {
    const response = await httpClient.post(`/notifications/${id}/read`);
    return response.data;
  }
);
