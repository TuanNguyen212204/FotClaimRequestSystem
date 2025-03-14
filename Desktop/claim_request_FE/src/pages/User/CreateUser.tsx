import React from "react";
import { useNavigate } from "react-router-dom";
import { PATH } from "@constant/config";

import httpClient from "@/constant/apiInstance";
import { User } from "@/types/User";
import { useForm } from "react-hook-form";
import styles from "./UpdateUser.module.css";
import { X } from "lucide-react";
import { toast } from "react-toastify";
export const CreateUser: React.FC = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<User>();

  const onSubmit = async (data: User) => {
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
      await httpClient.post("/admin/create-staff", requestBody);
      toast("Create user successfully!");
      navigate(PATH.allUserInformation);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Update user error: " + error.message);
      } else {
        console.error("Unexpected error", error);
      }
      alert("Failed to create user. Please try again.");
    }
  };
  const handleCancel = () => {
    navigate(PATH.allUserInformation);
  };
  return (
    <div>
      <div style={{ marginTop: "50px" }}>
        <div className="max-w-lg mx-auto p-9 bg-white shadow-xl rounded-xl">
          <button
            onClick={() => handleCancel()}
            className={styles.cancel_button}
          >
            <X />
          </button>
          <h1 className="text-3xl font-bold text-gray-700 mb-6 text-center">
            Create User
          </h1>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Full Name */}
            <div>
              <label
                className="block text-sm font-medium text-gray-600"
                htmlFor="full_name"
              >
                Full Name
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
                className="mt-1 w-4/5 px-4 py-1.5 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
              />
              {errors.full_name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.full_name.message}
                </p>
              )}
            </div>
            <div>
              <label
                className="block text-sm font-medium text-gray-600"
                htmlFor="email"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                {...register("email", {
                  required: "Email is required",
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
              <label
                className="block text-sm font-medium text-gray-600"
                htmlFor="department"
              >
                Department
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
                className="mt-1 w-4/5 px-4 py-1.5 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
              />
              {errors.department && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.department.message}
                </p>
              )}
            </div>
            <div>
              <label
                className="block text-sm font-medium text-gray-600"
                htmlFor="salary"
              >
                Salary
              </label>
              <input
                {...register("salary", {
                  required: "Salary is required",
                  minLength: {
                    value: 0,
                    message: "Salary must greater than 0",
                  },
                })}
                className="mt-1 w-4/5 px-4 py-1.5 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
              />
              {errors.salary && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.salary.message}
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
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
