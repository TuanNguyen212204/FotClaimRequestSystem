import { io } from "socket.io-client";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { addNotification } from "@/redux/slices/notification/notificationSlice";

export const useSocket = (userId: string) => {
  const socketRef = useRef<any>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("Initializing socket connection...");

    // Khởi tạo socket với reconnection options
    socketRef.current = io("http://localhost:3002", {
      withCredentials: true,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    // Handle connection
    socketRef.current.on("connect", () => {
      console.log("Socket connected successfully");
      if (userId) {
        socketRef.current.emit("login", userId);
        console.log("Emitted login event with userId:", userId);
      }
    });

    // Handle new notifications
    socketRef.current.on("new_notification", (notification: any) => {
      console.log("Received new notification:", notification);
      dispatch(addNotification(notification));
    });

    // Error handling
    socketRef.current.on("connect_error", (error: any) => {
      console.error("Socket connection error:", error);
    });

    socketRef.current.on("error", (error: any) => {
      console.error("Socket error:", error);
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        console.log("Socket disconnected");
      }
    };
  }, [userId, dispatch]);

  return socketRef.current;
};
