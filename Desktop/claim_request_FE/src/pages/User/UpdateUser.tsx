import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import httpClient from "@constant/apiInstance";
import { ApiResponse } from "@/types/ApiResponse";
import { ApiResponseNoGeneric } from "@/types/ApiResponse";
import { User } from "@/types/User";
import { useNavigate } from "react-router-dom";
import { PATH } from "@constant/config";
import { X } from "lucide-react";
import styles from "./UpdateUser.module.css";
import { ToastContainer, toast } from "react-toastify";

interface UpdateUserProps {
  id: string;
  setOpenModal: (value: boolean) => void;
}
export const UpdateUser: React.FC<UpdateUserProps> = ({ id, setOpenModal }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<User>();
  const [user, setUser] = useState<User | null>(null);

  const fetchUserById = async (id: string) => {
    try {
      const response = await httpClient.get<ApiResponse<User[]>>(
        `/admin/staff/${id}`
      );
      const userData = response.data.data[0];
      console.log(userData);
      setUser(userData);
      reset(userData);
    } catch (error) {
      console.error("Fetch user error: " + error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchUserById(id);
    }
  }, [id]);

  const onSubmit = async (data: User) => {
    if (!user) return;
    const requestBody = {
      department: data.department || user.department,
      role_id: data.role_id || user.role_id,
      job_rank: data.job_rank || user.job_rank,
    };

    console.log(requestBody);
    try {
      await httpClient.put<ApiResponseNoGeneric>(
        `/admin/staff/${id}`,
        requestBody
      );
      toast("User updated successfully!");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error("Update user error: " + error);
    }
  };
  const handleCancel = () => {
    setOpenModal(false);
  };

  return (
    <div style={{ marginTop: "50px" }}>
      <div className="mx-auto p-8 bg-white shadow-xl rounded-xl">
        <div>
          <button
            onClick={() => handleCancel()}
            className={styles.cancel_button}
          >
            <div>
              <X />
            </div>
          </button>
        </div>
        <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">
          Update User
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className={styles.input_container}>
            <label
              className="block text-sm font-medium text-gray-600"
              htmlFor="full_name"
            >
              <div className={styles.flex}>
                <div className={styles.label_container}>
                  <span>*</span>
                </div>
                <div>
                  <span>Full Name</span>
                </div>
              </div>
            </label>
            <input
              disabled
              id="full_name"
              {...register("full_name")}
              className="mt-1 w-4/5 px-4 py-1.5 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
            />
            {errors.full_name && (
              <p className="text-red-500 text-sm mt-1">
                {errors.full_name.message}
              </p>
            )}
          </div>
          <div className={styles.input_container}>
            <label
              className="block text-sm font-medium text-gray-600"
              htmlFor="email"
            >
              <div className={styles.flex}>
                <div className={styles.label_container}>
                  <span>*</span>
                </div>
                <div>
                  <span>Email</span>
                </div>
              </div>
            </label>
            <input
              {...register("email")}
              disabled
              id="email"
              className="mt-1 w-4/5 px-4 py-1.5 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
            />
          </div>
          <div className={styles.input_container}>
            <label
              className="block text-sm font-medium text-gray-600"
              id="department"
            >
              <div className={styles.flex}>
                <div className={styles.label_container}>
                  <span>*</span>
                </div>
                <div>
                  <span>Department</span>
                </div>
              </div>
            </label>
            <input
              id="department"
              {...register("department", {
                required: "Department is required",
                minLength: {
                  value: 2,
                  message: "Must be at least 2 characters",
                },
                maxLength: {
                  value: 50,
                  message: "Must be at most 50 characters",
                },
              })}
              className="mt-1 w-4/5 px-4 py-1.5 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
            />
            {errors.department && (
              <p className="text-red-500 text-sm mt-1">
                {errors.department.message}
              </p>
            )}
          </div>

          <div className={styles.input_container}>
            <label
              className="block text-sm font-medium text-gray-600"
              htmlFor="role_id"
            >
              <div className={styles.flex}>
                <div className={styles.label_container}>
                  <span>*</span>
                </div>
                <div>
                  <span>Role ID</span>
                </div>
              </div>
            </label>
            <select
              id="role_id"
              {...register("role_id", { required: "Role ID is required" })}
              className="mt-1 w-4/5 px-4 py-1.5 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
            >
              <option value="">Select Role</option>
              <option value="1">1 - Admin</option>
              <option value="2">2 - Approver</option>
              <option value="3">3 - Finance</option>
              <option value="4">4 - Claimer</option>
            </select>
            {errors.role_id && (
              <p className="text-red-500 text-sm mt-1">
                {errors.role_id.message}
              </p>
            )}
          </div>

          <div className={styles.input_container}>
            <label
              className="block text-sm font-medium text-gray-600"
              htmlFor="job_rank"
            >
              <div className={styles.flex}>
                <div className={styles.label_container}>
                  <span>*</span>
                </div>
                <div>
                  <span>Job Rank</span>
                </div>
              </div>
            </label>
            <input
              id="job_rank"
              {...register("job_rank", {
                required: "Job Rank is required",
                minLength: {
                  value: 2,
                  message: "Must be at least 2 characters",
                },
                maxLength: {
                  value: 50,
                  message: "Must be at most 50 characters",
                },
              })}
              className="mt-1 w-4/5 px-4 py-1.5 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
            />
            {errors.job_rank && (
              <p className="text-red-500 text-sm mt-1">
                {errors.job_rank.message}
              </p>
            )}
          </div>

          <div className={styles.update_button_container}>
            <button type="submit" className={styles.update_button}>
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
