import { createAsyncThunk } from "@reduxjs/toolkit";
import httpClient from "@/constant/apiInstance";
import { ApiResponse } from "@/types/ApiResponse";

export const fetchNotificationsAsync = createAsyncThunk(
  "notifications/fetchNotifications",
  async () => {
    const response = await httpClient.get<ApiResponse<Notification[]>>(
      "/notifications"
    );
    console.log(response.data)
    return response.data; // Assuming the API returns an array of notifications in the data field
  }
);

export const markNotificationAsRead = (id: number) => async (dispatch: any) => {
    try {
      await fetch(`/api/notifications/${id}/read`, {
        method: "POST",
      });
  
      dispatch({
        type: "MARK_NOTIFICATION_AS_READ",
        payload: id,
      });
    } catch (error) {
      console.error("Lỗi khi đánh dấu thông báo đã đọc:", error);
    }
  };
  