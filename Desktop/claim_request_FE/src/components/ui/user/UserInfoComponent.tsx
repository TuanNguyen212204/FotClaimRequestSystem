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
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const UserInfoComponent: React.FC = () => {
  const { t } = useTranslation("userInfo");
  const dispatch = useDispatch<AppDispatch>();
  const selectedUser = useSelector(selectUserById);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState<Partial<User>>({});
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSalaryVisible, setIsSalaryVisible] = useState(false);
  const [isOtRateVisible, setIsOtRateVisible] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const navigate = useNavigate();

  const accessToken = localStorage.getItem("access_token");
  const userId = localStorage.getItem("user_id");

  // Lấy backendUrl và staticBaseUrl từ biến môi trường
  const backendUrl =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";
  const staticBaseUrl =
    import.meta.env.VITE_STATIC_BASE_URL || "http://localhost:3000";

  // Hàm để tạo URL đầy đủ cho avatar
  const getFullAvatarUrl = (avatarPath: string | undefined): string => {
    const defaultAvatar =
      "https://i.pinimg.com/736x/63/f0/0d/63f00d6ebe2c93b945be3c39135503c2.jpg";

    if (!avatarPath) {
      return defaultAvatar;
    }

    // Nếu avatarPath đã là URL đầy đủ (bắt đầu bằng http), trả về luôn
    if (avatarPath.startsWith("http")) {
      return avatarPath;
    }

    // Nếu avatarPath không bắt đầu bằng /uploads/avatars/, bổ sung phần này
    const normalizedAvatarPath = avatarPath.startsWith("/uploads/avatars/")
      ? avatarPath
      : `/uploads/avatars/${
          avatarPath.startsWith("avatar-") ? "" : "avatar-"
        }${avatarPath}`;

    // Sử dụng staticBaseUrl để tạo URL cho file tĩnh
    return `${staticBaseUrl}${normalizedAvatarPath}`;
  };

  useEffect(() => {
    if (accessToken && userId) {
      dispatch(fetchUserByIdAsync());
    }
  }, [dispatch, accessToken, userId]);

  useEffect(() => {
    if (selectedUser) {
      setEditedUser(selectedUser);
      if (selectedUser.user_status === 2) {
        toast.warning(t("toast.change_password_first_time"));
        setTimeout(() => {
          navigate("/change-password");
        }, 2000);
      } else if (selectedUser.user_status === 0) {
        toast.error(t("toast.account_inactive"));
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } else {
      setEditedUser({});
    }
  }, [selectedUser, navigate, t]);

  const getRoleName = (roleId: number | undefined): string => {
    switch (roleId) {
      case 1:
        return t("admin");
      case 2:
        return t("approver");
      case 3:
        return t("finance");
      case 4:
        return t("claimer");
      default:
        return t("na");
    }
  };

  const getUserStatusLabel = (status: number | undefined): string => {
    switch (status) {
      case 1:
        return t("active");
      case 0:
        return t("disabled");
      case 2:
        return t("need_first_time_login");
      default:
        return t("unknown");
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const validImageTypes = ["image/jpeg", "image/png", "image/gif"];
      if (!validImageTypes.includes(file.type)) {
        toast.error(t("toast.invalid_image_file"));
        return;
      }
      const maxSizeInMB = 5;
      if (file.size > maxSizeInMB * 1024 * 1024) {
        toast.error(t("toast.file_size_exceeded"));
        return;
      }
      setAvatarFile(file);
      const previewUrl = URL.createObjectURL(file);
      setEditedUser({ ...editedUser, avatar: previewUrl });
    }
  };

  const validateFields = async () => {
    if (!editedUser.email || editedUser.email.trim() === "") {
      toast.error(t("toast.email_required"));
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(editedUser.email || "")) {
      toast.error(t("toast.invalid_email"));
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
        toast.error(t("toast.email_exists"));
        return false;
      }
    } catch (error) {
      toast.error(t("toast.email_validation_failed"));
      return false;
    }

    if (editedUser.password && editedUser.password.trim() !== "") {
      if (editedUser.password !== confirmPassword) {
        toast.error(t("toast.password_mismatch"));
        return false;
      }
      if (editedUser.password.length < 6) {
        toast.error(t("toast.password_too_short"));
        return false;
      }
    }

    return true;
  };

  const handleSave = async () => {
    if (!userId || !editedUser) {
      toast.error(t("toast.missing_user_info"));
      return;
    }

    const isValid = await validateFields();
    if (!isValid) {
      return;
    }

    try {
      // 1. Cập nhật avatar nếu có file avatar
      if (avatarFile) {
        const avatarFormData = new FormData();
        avatarFormData.append("avatar", avatarFile);

        await httpClient.post(`/users/${userId}/avatar`, avatarFormData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }

      // 2. Cập nhật các thông tin khác (email, password) - không gửi department
      const userFormData = new FormData();
      userFormData.append("email", editedUser.email || "");
      if (editedUser.password && editedUser.password.trim() !== "") {
        userFormData.append("password", editedUser.password);
      }

      await httpClient.put(`/admin/staff/${userId}`, userFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // 3. Sau khi cập nhật thành công, gọi lại API GET để làm mới dữ liệu người dùng
      await dispatch(fetchUserByIdAsync());
      setIsEditing(false);
      setAvatarFile(null);
      toast.success(t("toast.update_success"));

      // 4. Nếu người dùng cần đổi mật khẩu lần đầu (user_status === 2)
      if (editedUser.password && editedUser.user_status === 2) {
        await httpClient.put(`/admin/staff/${userId}`, {
          user_status: 1,
        });
        dispatch(fetchUserByIdAsync());
      }
    } catch (error) {
      console.error("Update User error: ", error);
      toast.error(`${t("toast.update_failed")} ${(error as any).message}`);
    }
  };

  if (!accessToken || !userId) {
    return (
      <div className={styles.profileContainer}>
        <h2 style={{ textAlign: "center", color: "#ff4d4f" }}>
          {t("login_required")}
        </h2>
        <button
          onClick={() => navigate("/")}
          className={styles.saveButton}
          style={{ display: "block", margin: "1rem auto" }}
        >
          {t("login")}
        </button>
      </div>
    );
  }

  if (!selectedUser) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>{t("loading")}</p>
      </div>
    );
  }

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileHeader}>
        <div className={styles.avatarSection}>
          <img
            src={getFullAvatarUrl(selectedUser.avatar)}
            alt="Avatar"
            className={styles.profileAvatar}
            onError={(e) =>
              (e.currentTarget.src =
                "https://i.pinimg.com/736x/63/f0/0d/63f00d6ebe2c93b945be3c39135503c2.jpg")
            }
          />
          <div className={styles.updateButtonWrapper}>
            <button
              onClick={() => setIsEditing(true)}
              className={styles.editButton}
            >
              {t("edit_information")}
            </button>
          </div>
        </div>

        <div className={styles.profileInfo}>
          <h1>{selectedUser.full_name || "Full Name"}</h1>
          <p className={styles.position}>
            <span>{t("job_rank_label")}</span>{" "}
            {selectedUser.job_rank || t("na")}
            <span>{t("department_label")}</span>{" "}
            {selectedUser.department || t("na")}
          </p>

          <div className={styles.statsContainer}>
            <div className={styles.statItem}>
              <span className={styles.statIcon}>💰</span>
              <h3>
                {isSalaryVisible
                  ? `${selectedUser.salary || t("na")} $`
                  : "****"}
              </h3>
              <button
                onClick={() => setIsSalaryVisible(!isSalaryVisible)}
                className={styles.eyeButton}
              >
                {isSalaryVisible ? "👁️" : "👁️‍🗨️"}
              </button>
              <span>{t("salary")}</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statIcon}>⏰</span>
              <h3>
                {isOtRateVisible
                  ? `${selectedUser.ot_rate || t("na")} %`
                  : "****"}
              </h3>
              <button
                onClick={() => setIsOtRateVisible(!isOtRateVisible)}
                className={styles.eyeButton}
              >
                {isOtRateVisible ? "👁️" : "👁️‍🗨️"}
              </button>
              <span>{t("ot_rate")}</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statIcon}>📡</span>
              <h3>{getUserStatusLabel(selectedUser.user_status)}</h3>
              <span>{t("status")}</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.profileContent}>
        <div className={styles.infoSection}>
          <h2 className={styles.sectionTitle}>{t("information")}</h2>
          <div className={styles.infoDetails}>
            <p>
              <strong>{t("username_label")}</strong>{" "}
              {selectedUser.username || t("na")}
            </p>
            <p>
              <strong>{t("email_label")}</strong>{" "}
              {selectedUser.email || t("na")}
            </p>
            <p>
              <strong>{t("role_label")}</strong>
              {getRoleName(selectedUser.role_id) || t("na")}
            </p>
            <p>
              <strong>{t("department_label")}</strong>{" "}
              {selectedUser.department || t("na")}
            </p>
            <p>
              <strong>{t("job_rank_label")}</strong>{" "}
              {selectedUser.job_rank || t("na")}
            </p>
            <p>
              <strong>{t("status_label")}</strong>
              {getUserStatusLabel(selectedUser.user_status)}
            </p>
          </div>
        </div>
      </div>

      {isEditing && (
        <div className={styles.editModal}>
          <div className={styles.modalContent}>
            <h2>{t("edit_information")}</h2>
            <div className={styles.formSection}>
              <label>
                <span className={styles.required}>*</span>{" "}
                {t("full_name_label")}
              </label>
              <input
                value={editedUser.full_name || ""}
                disabled
                style={{
                  backgroundColor: "#f0f0f0",
                  cursor: "not-allowed",
                }}
              />
            </div>
            <div className={styles.formSection}>
              <label>
                <span className={styles.required}>*</span> {t("email_label")}
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
              <label>{t("avatar_label")}</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
              />
              {editedUser.avatar && (
                <img
                  src={editedUser.avatar}
                  alt="Avatar Preview"
                  style={{ width: "100px", height: "100px", marginTop: "10px" }}
                />
              )}
            </div>
            <div className={styles.formSection}>
              <label>{t("new_password_label")}</label>
              <input
                type="password"
                value={editedUser.password || ""}
                onChange={(e) =>
                  setEditedUser({ ...editedUser, password: e.target.value })
                }
                placeholder={t("new_password_label")}
              />
            </div>
            <div className={styles.formSection}>
              <label>{t("verify_new_password_label")}</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder={t("verify_new_password_label")}
              />
            </div>
            <div className={styles.formSection}>
              <label>{t("department_label")}</label>
              <input
                value={editedUser.department || ""}
                disabled
                style={{
                  backgroundColor: "#f0f0f0",
                  cursor: "not-allowed",
                }}
              />
            </div>
            <div className={styles.formSection}>
              <label>{t("job_rank_label")}</label>
              <input
                value={editedUser.job_rank || ""}
                disabled
                style={{
                  backgroundColor: "#f0f0f0",
                  cursor: "not-allowed",
                }}
              />
            </div>
            <div className={styles.buttonGroup}>
              <button className={styles.saveButton} onClick={handleSave}>
                {t("save")}
              </button>
              <button
                className={styles.cancelButton}
                onClick={() => setIsEditing(false)}
              >
                {t("cancel")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserInfoComponent;
