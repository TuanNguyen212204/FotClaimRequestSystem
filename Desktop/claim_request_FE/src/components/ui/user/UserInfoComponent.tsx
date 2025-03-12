import React, { useState, useEffect } from "react";
import styles from "@components/ui/user/UserInfoComponent.module.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@redux/index";
import { fetchUserByIdAsync } from "@redux/thunk/User/userThunk";
import { User } from "@/types/User";
import { useNotification } from "@/components/ui/Notification/NotificationContext";
import { selectUserById } from "@redux/selector/userSelector";
import httpClient from "@constant/apiInstance";
import LoadingOverlay from "@components/ui/Loading/LoadingOverlay";

export const UserInfoComponent: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const selectedUser = useSelector(selectUserById);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState<Partial<User>>({});
  const [confirmPassword, setConfirmPassword] = useState("");
  const notification = useNotification();

  const accessToken = localStorage.getItem("access_token");
  const userId = localStorage.getItem("user_id");

  useEffect(() => {
    if (accessToken && userId) {
      dispatch(fetchUserByIdAsync());
    }
  }, [dispatch, accessToken, userId]);

  useEffect(() => {
    if (selectedUser && selectedUser.length > 0) {
      setEditedUser(selectedUser[0]);
    }
  }, [selectedUser]);

  const handleSave = async () => {
    if (!userId || !editedUser) {
      notification.show({
        message: "Cannot save, missing user information.",
        type: "error",
      });
      return;
    }

    if (editedUser.password && editedUser.password.trim() !== "") {
      if (editedUser.password !== confirmPassword) {
        notification.show({
          message: "New password and confirm password do not match.",
          type: "error",
        });
        return;
      }
    }

    try {
      const requestBody: {
        full_name: string;
        email: string;
        department: string;
        job_rank: string;
        password?: string;
      } = {
        full_name: editedUser.full_name || "",
        email: editedUser.email || "",
        department: editedUser.department || "",
        job_rank: editedUser.job_rank || "",
      };

      if (editedUser.password && editedUser.password.trim() !== "") {
        requestBody.password = editedUser.password;
      }

      await httpClient.put(`/admin/staff/${userId}`, requestBody);

      dispatch(fetchUserByIdAsync());
      setIsEditing(false);
      notification.show({
        message: "Update user successfully.",
        type: "success",
      });
    } catch (error) {
      console.error("Update User error: " + error);
      notification.show({
        message: "Update user failed: " + (error as any).message,
        type: "error",
      });
    }
  };

  if (!accessToken || !userId) {
    return (
      <div className={styles.profileContainer}>
        <h2 style={{ textAlign: "center", color: "#ff4d4f" }}>
          You need to login to view personal information.
        </h2>
        <button
          onClick={() => (window.location.href = "/login")}
          className={styles.saveButton}
          style={{ display: "block", margin: "1rem auto" }}
        >
          Login
        </button>
      </div>
    );
  }

  if (!selectedUser || selectedUser.length === 0) {
    return <LoadingOverlay></LoadingOverlay>;
  }

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileHeader}>
        <div className={styles.avatarSection}>
          <img
            src="https://i.pinimg.com/736x/63/f0/0d/63f00d6ebe2c93b945be3c39135503c2.jpg"
            alt="Avatar"
            className={styles.profileAvatar}
          />
          <button
            onClick={() => setIsEditing(true)}
            className={styles.editButton}
          >
            ✏️
          </button>
        </div>

        <div className={styles.profileInfo}>
          <h1>{selectedUser[0].full_name || "Full Name"}</h1>
          <p className={styles.position}>
            {selectedUser[0].job_rank || "No position"}
          </p>
          <p className={styles.company}>
            Department: {selectedUser[0].department || "Undetermined"}
          </p>

          <div className={styles.statsContainer}>
            <div className={styles.statItem}>
              <h3>{`${selectedUser[0].salary || "N/A"} $`}</h3>
              <span>Salary</span>
            </div>
            <div className={styles.statItem}>
              <h3>
                {selectedUser[0].user_status === 1 ? "Online" : "Offline"}
              </h3>
              <span>Status</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.profileContent}>
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>User Information</h2>
          {!isEditing ? (
            <>
              <p>
                <strong>Username:</strong>
                {selectedUser[0].username || "N/A"}
              </p>
              <p>
                <strong>Fullname:</strong> {selectedUser[0].full_name || "N/A"}
              </p>
              <p>
                <strong>Email:</strong> {selectedUser[0].email || "N/A"}
              </p>
              <p>
                <strong>Department:</strong>
                {selectedUser[0].department || "N/A"}
              </p>
              <p>
                <strong>Position:</strong> {selectedUser[0].job_rank || "N/A"}
              </p>
              <p>
                <strong>Salary:</strong> {selectedUser[0].salary || "N/A"}
              </p>
              <p>
                <strong>Role:</strong> {selectedUser[0].role_name || "N/A"}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                {selectedUser[0].user_status === 1 ? "Online" : "Offline"}
              </p>
            </>
          ) : (
            <div className={styles.editModal}>
              <div className={styles.modalContent}>
                <h2>Edit Information</h2>
                <div className={styles.formSection}>
                  <label>Full Name:</label>
                  <input
                    value={editedUser.full_name || ""}
                    onChange={(e) =>
                      setEditedUser({
                        ...editedUser,
                        full_name: e.target.value,
                      })
                    }
                  />
                </div>
                <div className={styles.formSection}>
                  <label>Email:</label>
                  <input
                    type="email"
                    value={editedUser.email || ""}
                    onChange={(e) =>
                      setEditedUser({ ...editedUser, email: e.target.value })
                    }
                  />
                </div>
                <div className={styles.formSection}>
                  <label>New Password:</label>
                  <input
                    type="password"
                    value={editedUser.password || ""}
                    onChange={(e) =>
                      setEditedUser({ ...editedUser, password: e.target.value })
                    }
                    placeholder="password"
                  />
                </div>
                <div className={styles.formSection}>
                  <label>Verify New Password:</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="verify password"
                  />
                </div>
                <div className={styles.formSection}>
                  <label>Department:</label>
                  <input
                    value={editedUser.department || ""}
                    onChange={(e) =>
                      setEditedUser({
                        ...editedUser,
                        department: e.target.value,
                      })
                    }
                  />
                </div>
                <div className={styles.formSection}>
                  <label>Position:</label>
                  <input
                    value={editedUser.job_rank || ""}
                    onChange={(e) =>
                      setEditedUser({ ...editedUser, job_rank: e.target.value })
                    }
                  />
                </div>
                <div className={styles.buttonGroup}>
                  <button className={styles.saveButton} onClick={handleSave}>
                    Save
                  </button>
                  <button
                    className={styles.cancelButton}
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
