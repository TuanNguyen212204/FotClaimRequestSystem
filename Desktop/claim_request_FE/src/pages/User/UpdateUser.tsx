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
export const UpdateUser: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");

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
      reset(userData); // Gán dữ liệu cũ vào form
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
      full_name: data.full_name || user.full_name,
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

      navigate(PATH.allUserInformation);
    } catch (error) {
      console.error("Update user error: " + error);
    }
  };
  const handleCancel = () => {
    navigate(PATH.allUserInformation);
  };
  return (
    <div style={{ marginTop: "50px" }}>
      <div className="max-w-lg mx-auto p-9 bg-white shadow-xl rounded-xl">
        <button onClick={() => handleCancel()} className={styles.cancel_button}>
          <X />
        </button>
        <h1 className="text-3xl font-bold text-gray-700 mb-6 text-center">
          Update User
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Full Name
            </label>
            <input
              {...register("full_name", {
                required: "Full name is required",
                minLength: {
                  value: 3,
                  message: "Must be at least 3 characters",
                },
                maxLength: {
                  value: 100,
                  message: "Must be at most 50 characters",
                },
              })}
              className="mt-1 w-4/5 px-4 py-1.5 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
            />
            {errors.full_name && (
              <p className="text-red-500 text-sm mt-1">
                {errors.full_name.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Department
            </label>
            <input
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

          <div>
            <label className="block text-sm font-medium text-gray-600">
              Role ID
            </label>
            <select
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

          <div>
            <label className="block text-sm font-medium text-gray-600">
              Job Rank
            </label>
            <input
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
