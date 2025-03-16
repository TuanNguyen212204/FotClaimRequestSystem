import React from "react";
import { useNavigate } from "react-router-dom";
import { PATH } from "@constant/config";
import { useEffect, useState } from "react";
import httpClient from "@/constant/apiInstance";
import { User } from "@/types/User";
import { useForm } from "react-hook-form";
import { fetchAllUserAsync, fetchTotalPage } from "@redux/thunk/User/userThunk";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "@redux/index.ts";
import { X } from "lucide-react";
import { toast } from "react-toastify";
import styles from "./CreateUser.module.css";
import {
  selectAllUser,
  selectTotalPageOfAllUser,
} from "@/redux/selector/userSelector";
import { LoadingProvider } from "@/components/ui/Loading/LoadingContext";
import LoadingOverlay from "@/components/ui/Loading/LoadingOverlay";
export const CreateUser: React.FC = ({
  openModal,
  setOpenModal,
}: {
  openModal: boolean;
  onClick: () => void;
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector(selectAllUser);
  const totalPage = String(useSelector(selectTotalPageOfAllUser));
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>();

  const onSubmit = async (data: User) => {
    setLoading(true);
    const requestBody = {
      full_name: data.full_name,
      department: data.department,
      email: data.email,
      salary: data.salary,
      role: data.role_id,
      job_rank: data.job_rank,
    };
    console.log(requestBody);
    try {
      const response = await httpClient.post(
        "/admin/create-staff",
        requestBody
      );
      if (response.status === 200) {
        await dispatch(fetchAllUserAsync(totalPage.toString()));
        toast.success("Create user successfully!");
        navigate(PATH.allUserInformation);
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error("Update user error: " + error.message);
      } else {
        toast.error("Unexpected error", error);
      }
      alert("Failed to create user. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  const handleCancel = () => {
    setOpenModal(false);
  };

  return (
    <div>
      <div>
        {loading && (
          <div>
            <LoadingProvider>
              <LoadingOverlay />
            </LoadingProvider>
          </div>
        )}
      </div>
      <div style={{ marginTop: "50px" }}>
        <div className=" mx-auto p-8 bg-white shadow-xl rounded-xl">
          <button
            onClick={() => handleCancel()}
            className={styles.cancel_button}
          >
            <X />
          </button>
          <h1 className="text-3xl font-bold text-green-700 mb-6 text-center">
            Create User
          </h1>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
            {/* Full Name */}
            <div className={styles.input_container}>
              <label
                className="block text-sm font-medium text-gray-600"
                htmlFor="full_name"
              >
                <div style={{ display: "flex" }}>
                  <div style={{ paddingTop: "2px", color: "red" }}>
                    <span style={{ paddingTop: "2px" }}>*</span>
                  </div>
                  <div>
                    <span>Full Name</span>
                  </div>
                </div>
              </label>
              <input
                id="full_name"
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
                className="mt-1 w-4/5 px-4 py-1.5 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
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
                <div style={{ display: "flex" }}>
                  <div style={{ paddingTop: "2px", color: "red" }}>
                    <span style={{ paddingTop: "2px" }}>*</span>
                  </div>
                  <div>
                    <span>Email</span>
                  </div>
                </div>
              </label>
              <input
                id="email"
                type="email"
                {...register("email", {
                  required: "Email is required",
                })}
                className="mt-1 w-4/5 px-4 py-1.5 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
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
                htmlFor="department"
              >
                <div style={{ display: "flex" }}>
                  <div style={{ paddingTop: "2px", color: "red" }}>
                    <span style={{ paddingTop: "2px" }}>*</span>
                  </div>
                  <div>
                    <span>Department</span>
                  </div>
                </div>
              </label>
              <input
                id="department"
                type="text"
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
                className="mt-1 w-4/5 px-4 py-1.5 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
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
                htmlFor="salary"
              >
                <div style={{ display: "flex" }}>
                  <div style={{ paddingTop: "2px", color: "red" }}>
                    <span style={{ paddingTop: "2px" }}>*</span>
                  </div>
                  <div>
                    <span>Salary</span>
                  </div>
                </div>
              </label>
              <input
                id="salary"
                {...register("salary", {
                  required: "Salary is required",
                  minLength: {
                    value: 0,
                    message: "Salary must greater than 0",
                  },
                })}
                className="mt-1 w-4/5 px-4 py-1.5 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
              />
              {errors.salary && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.salary.message}
                </p>
              )}
            </div>
            <div className={styles.input_container}>
              <label
                className="block text-sm font-medium text-gray-600"
                htmlFor="role_id"
              >
                <div style={{ display: "flex" }}>
                  <div style={{ paddingTop: "2px", color: "red" }}>
                    <span style={{ paddingTop: "2px" }}>*</span>
                  </div>
                  <div>
                    <span>Role ID</span>
                  </div>
                </div>
              </label>
              <select
                id="role_id"
                {...register("role_id", { required: "Role ID is required" })}
                className="mt-1 w-4/5 px-4 py-1.5 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
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
                <div style={{ display: "flex" }}>
                  <div style={{ paddingTop: "2px", color: "red" }}>
                    <span style={{ paddingTop: "2px" }}>*</span>
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
                className="mt-1 w-4/5 px-4 py-1.5 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
              />
              {errors.job_rank && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.job_rank.message}
                </p>
              )}
            </div>

            <div className={styles.update_button_container}>
              <button type="submit" className={styles.update_button}>
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
