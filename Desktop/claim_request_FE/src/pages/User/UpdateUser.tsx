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
import { Select } from "./CreateUser";
import { useTranslation } from "react-i18next";
interface UpdateUserProps {
  id: string;
  setOpenModal: (value: boolean) => void;
}
type Department = {
  id: string;
  name: string;
};
type JobRank = {
  id: number;
  name: string;
  ot_rate: string;
};

type DepartmentList = Department[];
type JobRankList = JobRank[];
export const UpdateUser: React.FC<UpdateUserProps> = ({ id, setOpenModal }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<User>();
  const [user, setUser] = useState<User | null>(null);
  const [department, setDepartment] = useState<DepartmentList>([]);
  const [jobRank, setJobRank] = useState<JobRankList>([]);
  const { t } = useTranslation("allUserInformation");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fetchDepartment = async () => {
    try {
      const response =
        await httpClient.get<ApiResponseNoGeneric>(`/admin/departments`);
      setDepartment(response.data.data);
    } catch (error) {
      console.error("Fetch department error:", error);
    }
  };
  // Chỗ này fetch api lấy list job rank từ BE về
  const fetchJobRank = async () => {
    try {
      const response =
        await httpClient.get<ApiResponseNoGeneric>(`/admin/job-ranks`);
      setJobRank(response.data.data);
    } catch (error) {
      console.error("Fetch job rank error:", error);
    }
  };

  useEffect(() => {
    fetchDepartment();
    console.log(department);
    fetchJobRank();
  }, []);
  const fetchUserById = async (id: string) => {
    try {
      const response = await httpClient.get<ApiResponse<User[]>>(
        `/admin/staff/${id}`,
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

    setIsSubmitting(true);

    const requestBody = {
      department_id: data.department_id || user.department_id,
      role_id: data.role_id || user.role_id,
      job_rank_id: data.job_rank_id || user.job_rank,
    };

    console.log(requestBody);
    try {
      await httpClient.put<ApiResponseNoGeneric>(
        `/admin/staff/${id}`,
        requestBody,
      );
      toast.success("User updated successfully!");
      setOpenModal(false);
    } catch (error) {
      console.error("Update user error: " + error);
    } finally {
      setIsSubmitting(false); // ✅ kết thúc submit
    }
  };

  const handleCancel = () => {
    setOpenModal(false);
  };
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleCancel(); // Gọi hàm cancel khi nhấn Escape
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  interface CreateUserProps {
    openModal: boolean;
    setOpenModal: (value: boolean) => void;
  }
  type Department = {
    id: string;
    name: string;
  };
  type JobRank = {
    id: number;
    name: string;
    ot_rate: string;
  };
  interface Option {
    label: string;
    value: string | number;
  }

  interface SelectProps {
    options: Option[];
    value?: string | number;
    onChange: (value: string | number) => void;
    placeholder?: string;
    isDisabled?: boolean;
    multiple?: boolean;
    register?: any;
    className?: string;
  }
  const options: Option[] = [
    { label: "Admin", value: "1" },
    { label: "Approver", value: "2" },
    { label: "Finance", value: "3" },
    { label: "Claimer", value: "4" },
  ];

  return (
    <div style={{ marginTop: "50px" }}>
      <div className="8 mx-auto rounded-xl bg-white pr-0 pb-5 shadow-xl">
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
        <h1 className="mb-6 text-center text-3xl font-bold text-blue-700">
          {t("allUserInformation.updateUser.title")}
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
          <div className="ml-15">
            <label
              className="block text-sm font-medium text-gray-600"
              htmlFor="full_name"
            >
              <div className={styles.flex}>
                <div className={styles.label_container}>
                  <span>*</span>
                </div>
                <div className={styles.input_container}>
                  <span>{t("allUserInformation.updateUser.fullName")}</span>
                </div>
              </div>
            </label>
            <input
              disabled
              id="full_name"
              {...register("full_name")}
              className="mt-1 h-6 w-4/5 rounded-lg border border-gray-300 p-2 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
            {errors.full_name && (
              <p className="mt-1 text-sm text-red-500">
                {errors.full_name.message}
              </p>
            )}
          </div>
          <div className="ml-15">
            <label
              className="block text-sm font-medium text-gray-600"
              htmlFor="email"
            >
              <div className={styles.flex}>
                <div className={styles.label_container}>
                  <span>*</span>
                </div>
                <div className={styles.input_container}>
                  <span>{t("allUserInformation.updateUser.email")}</span>
                </div>
              </div>
            </label>
            <input
              {...register("email")}
              disabled
              id="email"
              className="mt-1 h-6 w-4/5 rounded-lg border border-gray-300 p-2 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div className="ml-15">
            <label
              className="block text-sm font-medium text-gray-600"
              id="department"
            >
              <div className={styles.flex}>
                <div className={styles.label_container}>
                  <span>*</span>
                </div>
                <div className={styles.input_container}>
                  <span>{t("allUserInformation.updateUser.department")}</span>
                </div>
              </div>
            </label>
            {/* <input
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
            /> */}
            <Select
              // register={{
              //   ...register("department_id", {
              //     required: t(
              //       "allUserInformation.updateUser.validation.department",
              //     ),
              //   }),
              // }}
              options={department.map((a) => ({
                label: a.name,
                value: a.id,
              }))}
              register={{
                ...register("department_id", {
                  required: t(
                    "allUserInformation.updateUser.validation.department",
                  ),
                }),
              }}
              placeholder="Select Department"
              onChange={(value) => console.log(value)}
              className="mt-1 h-10 w-83.5 rounded-lg border border-gray-300 p-2 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
            {errors.department_id && (
              <p className="mt-1 text-sm text-red-500">
                {errors.department_id.message}
              </p>
            )}
          </div>

          <div className="ml-15">
            <label
              className="block text-sm font-medium text-gray-600"
              htmlFor="role_id"
            >
              <div className={styles.flex}>
                <div className={styles.label_container}>
                  <span>*</span>
                </div>
                <div className={styles.input_container}>
                  <span>{t("allUserInformation.updateUser.roleID")}</span>
                </div>
              </div>
            </label>
            {/* <select
              {...register("role_id", { required: "Role ID is required" })}
              className="mt-1 w-4/5 px-4 py-1.5 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
            >
              <option value="">Select Role</option>
              <option value="1">1 - Admin</option>
              <option value="2">2 - Approver</option>
              <option value="3">3 - Finance</option>
              <option value="4">4 - Claimer</option>
            </select> */}
            <Select
              options={options}
              // register={register("role_id")}
              register={{
                ...register("role_id", {
                  required: t(
                    "allUserInformation.updateUser.validation.roleID",
                  ),
                }),
              }}
              onChange={(value) => console.log(value)}
              placeholder="Select Role ID"
              className="mt-1 h-10 w-83.5 rounded-lg border border-gray-300 p-2 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
            {errors.role_id && (
              <p className="mt-1 text-sm text-red-500">
                {errors.role_id.message}
              </p>
            )}
            {/* <Select
              register={{
                ...register("department", {
                  required: "Department is required",
                }),
              }}
              options={department.map((a) => ({
                label: a.name,
                value: a.id,
              }))}
              // register={{
              //   ...register("department", {
              //     required: "Department is required",
              //   }),
              // }}
              placeholder="Select Department"
              onChange={(value) => console.log(value)}
              className="mt-1 w-4/5 px-4 py-1.5 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
            /> */}
          </div>

          <div className="ml-15">
            <label
              className="block text-sm font-medium text-gray-600"
              htmlFor="job_rank"
            >
              <div className={styles.flex}>
                <div className={styles.label_container}>
                  <span>*</span>
                </div>
                <div className={styles.input_container}>
                  <span>{t("allUserInformation.updateUser.jobRank")}</span>
                </div>
              </div>
            </label>
            {/* <input
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
            /> */}
            <Select
              options={jobRank.map((a) => ({ label: a.name, value: a.id }))}
              register={{
                ...register("job_rank_id", {
                  required: t(
                    "allUserInformation.updateUser.validation.jobRank",
                  ),
                }),
              }}
              placeholder="Select Job Rank"
              onChange={(value) => console.log(value)}
              className="mt-1 h-10 w-83.5 rounded-lg border border-gray-300 p-2 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
            {errors.job_rank_id && (
              <p className="mt-1 text-sm text-red-500">
                {errors.job_rank_id.message}
              </p>
            )}
          </div>

          {/* <div className={styles.update_button_container}>
            <button type="submit" className={styles.update_button}>
              {t("allUserInformation.buttonUpdate")}
            </button>
          </div> */}

          <div className={styles.update_button_container}>
            <button
              type="submit"
              className={styles.update_button}
              disabled={isSubmitting}
            >
              {t("allUserInformation.buttonUpdate")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
