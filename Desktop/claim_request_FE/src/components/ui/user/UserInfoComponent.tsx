import React, { useState, useEffect } from "react";
import styles from "@components/ui/user/UserInfoComponent.module.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@redux/index";
import { fetchUserByIdAsync } from "@redux/thunk/User/userThunk";
import { User } from "@/types/User";
import { selectUserById } from "@redux/selector/userSelector";
import httpClient from "@constant/apiInstance";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const UserInfoComponent: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const selectedUser = useSelector(selectUserById);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState<Partial<User>>({});
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSalaryVisible, setIsSalaryVisible] = useState(false);

  const accessToken = localStorage.getItem("access_token");
  const userId = localStorage.getItem("user_id");

  useEffect(() => {
    if (accessToken && userId) {
      dispatch(fetchUserByIdAsync());
    }
  }, [dispatch, accessToken, userId]);

  useEffect(() => {
    if (selectedUser) {
      setEditedUser(selectedUser);
    } else {
      setEditedUser({});
    }
  }, [selectedUser]);

  const validateFields = async () => {
    if (!editedUser.full_name || editedUser.full_name.trim() === "") {
      toast.error("Full Name is required!");
      return false;
    }
    if (!editedUser.email || editedUser.email.trim() === "") {
      toast.error("Email is required!");
      return false;
    }
    if (!editedUser.department || editedUser.department.trim() === "") {
      toast.error("Department is required!");
      return false;
    }
    if (!editedUser.job_rank || editedUser.job_rank.trim() === "") {
      toast.error("Job Rank is required!");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(editedUser.email || "")) {
      toast.error("Please enter a valid email address!");
      return false;
    }

    try {
      const response = await httpClient.get<any>("/admin/staffs");
      const users = response.data.data;
      const emailExists = users.some(
        (user: User) =>
          user.email === editedUser.email && user.user_id !== userId
      );
      if (emailExists) {
        toast.error("This email is already in use!");
        return false;
      }
    } catch (error) {
      toast.error("Failed to validate email. Please try again.");
      return false;
    }

    if (editedUser.password && editedUser.password.trim() !== "") {
      if (editedUser.password !== confirmPassword) {
        toast.error("New password and confirm password do not match!");
        return false;
      }
      if (editedUser.password.length < 6) {
        toast.error("Password must be at least 6 characters long!");
        return false;
      }
    }

    return true;
  };

  const handleSave = async () => {
    if (!userId || !editedUser) {
      toast.error("Cannot save, missing user information.");
      return;
    }

    const isValid = await validateFields();
    if (!isValid) {
      return;
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
      toast.success("Update user successfully.");
    } catch (error) {
      console.error("Update User error: " + error);
      toast.error("Update user failed: " + (error as any).message);
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

  if (!selectedUser) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Loading...</p>
      </div>
    );
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
          <h1>{selectedUser.full_name || "Full Name"}</h1>
          <p className={styles.position}>
            {selectedUser.job_rank || "No position"}
          </p>
          <p className={styles.company}>
            Department: {selectedUser.department || "Undetermined"}
          </p>

          <div className={styles.statsContainer}>
            <div className={styles.statItem}>
              <div className={styles.salaryWrapper}>
                <h3>
                  {isSalaryVisible
                    ? `${selectedUser.salary || "N/A"} $`
                    : "****"}
                </h3>
                <button
                  onClick={() => setIsSalaryVisible(!isSalaryVisible)}
                  className={styles.eyeButton}
                >
                  {isSalaryVisible ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>
              <span>Salary</span>
            </div>
            <div className={styles.statItem}>
              <h3>{selectedUser.user_status === 1 ? "Online" : "Offline"}</h3>
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
                <strong>Username:</strong> {selectedUser.username || "N/A"}
              </p>
              <p>
                <strong>Fullname:</strong> {selectedUser.full_name || "N/A"}
              </p>
              <p>
                <strong>Email:</strong> {selectedUser.email || "N/A"}
              </p>
              <p>
                <strong>Department:</strong> {selectedUser.department || "N/A"}
              </p>
              <p>
                <strong>Position:</strong> {selectedUser.job_rank || "N/A"}
              </p>
              <p>
                <strong>Salary:</strong>
                <div className={styles.salaryWrapper}>
                  <span>
                    {isSalaryVisible ? selectedUser.salary || "N/A" : "****"}
                  </span>
                  <button
                    onClick={() => setIsSalaryVisible(!isSalaryVisible)}
                    className={styles.eyeButton}
                  >
                    {isSalaryVisible ? "👁️" : "👁️‍🗨️"}
                  </button>
                </div>
              </p>
              <p>
                <strong>Role:</strong> {selectedUser.role_name || "N/A"}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                {selectedUser.user_status === 1 ? "Online" : "Offline"}
              </p>
            </>
          ) : (
            <div className={styles.editModal}>
              <div className={styles.modalContent}>
                <h2>Edit Information</h2>
                <div className={styles.formSection}>
                  <label>
                    <span className={styles.required}>*</span> Full Name:
                  </label>
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
                  <label>
                    <span className={styles.required}>*</span> Email:
                  </label>
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
                  <label>
                    <span className={styles.required}>*</span> Department:
                  </label>
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
                  <label>
                    <span className={styles.required}>*</span> Position:
                  </label>
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
