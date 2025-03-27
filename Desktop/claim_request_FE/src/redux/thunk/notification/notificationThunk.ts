import { createAsyncThunk } from "@reduxjs/toolkit";
import httpClient from "@/constant/apiInstance";
import { ApiResponse } from "@/types/ApiResponse";

export const fetchNotificationsAsync = createAsyncThunk(
  "notifications/fetchNotifications",
  async () => {
    const response = await httpClient.get<ApiResponse<Notification[]>>(
      "/notifications"
    );
    return response.data;
  }
);

export const markNotificationAllAsRead = createAsyncThunk(
  "notifications/markAllAsRead",
  async () => {
    const response = await httpClient.post<ApiResponse<Notification[]>>(
      "/notifications/mark-all-read"
    );
    console.log(response);
    return response.data;
  }
);

export const markNotificationAsReadById = createAsyncThunk(
  "notification/markAsRead",
  async (id: number) => {
    const response = await httpClient.post<ApiResponse<Notification[]>>(
      `/notifications/${id}/read`
    )
    return response.data
  }
)