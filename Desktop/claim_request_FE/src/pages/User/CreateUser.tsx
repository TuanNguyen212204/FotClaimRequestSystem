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
import { ApiResponseNoGeneric } from "@/types/ApiResponse";
import { delay } from "@/utils/delay";
import { useTranslation } from "react-i18next";
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
export const Select: React.FC<SelectProps> = ({
  options,
  value,
  onChange,
  register,
  placeholder = "Select an option",
  isDisabled = false,
  multiple = false,
  className = "",
}) => {
  return (
    <select
      className={`p-2 border rounded ${className}`}
      value={value}
      {...register}
      onChange={(e) =>
        multiple
          ? onChange(
              Array.from(
                e.target.selectedOptions,
                (option) => option.value
              ).join(",")
            )
          : onChange(e.target.value)
      }
      disabled={isDisabled}
      multiple={multiple}
    >
      {!multiple && <option value="">{placeholder}</option>}
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

type DepartmentList = Department[];
type JobRankList = JobRank[];
export const CreateUser: React.FC<CreateUserProps> = ({
  openModal,
  setOpenModal,
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation("allUserInformation");
  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector(selectAllUser);
  const totalPage = String(useSelector(selectTotalPageOfAllUser));
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<User>();
  const [department, setDepartment] = useState<DepartmentList>([]);
  const [jobRank, setJobRank] = useState<JobRankList>([]);
  // Chỗ này để fetch api lấy list department từ BE về
  const fetchDepartment = async () => {
    try {
      const response = await httpClient.get<ApiResponseNoGeneric>(
        `/admin/departments`
      );
      setDepartment(response.data.data);
    } catch (error) {
      console.error("Fetch department error:", error);
    }
  };
  // Chỗ này fetch api lấy list job rank từ BE về
  const fetchJobRank = async () => {
    try {
      const response = await httpClient.get<ApiResponseNoGeneric>(
        `/admin/job-ranks`
      );
      setJobRank(response.data.data);
    } catch (error) {
      console.error("Fetch job rank error:", error);
    }
  };

  useEffect(() => {
    fetchDepartment();
    fetchJobRank();
  }, []);
  useEffect(() => {
    console.log(jobRank);
    console.log(department);
  }, [jobRank, department]);
  const handleCreateUser = async (data: any) => {
    try {
      const response = httpClient.post<ApiResponseNoGeneric>(
        "/admin/create-staff",
        data
      );
      if ((await response).status === 200) {
        toast.success("Create user successfully!");
        reset();
        setLoading(false);
        navigate(PATH.allUserInformation);
      }
    } catch (error: any) {
      setLoading(false);
      if (error.response) {
        const { status, data } = error.response;
        if (status === 400) {
          toast.error(data.message);
        } else {
          toast.error("Create user failed!");
        }
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Create user failed!");
      }
    }
  };

  const onSubmit = async (data: User) => {
    setLoading(true);
    const requestBody = {
      full_name: data.full_name,
      department_id: data.department,
      email: data.email,
      salary: data.salary,
      role: data.role_id,
      job_rank_id: data.job_rank,
    };
    console.log(requestBody);
    handleCreateUser(requestBody);
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
          <h1 className="text-3xl font-bold text-green-700 mb-6 text-center">
            {t("allUserInformation.createUser.title")}
          </h1>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
            {/* Full Name */}
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
                    <span>{t("allUserInformation.createUser.fullName")}</span>
                  </div>
                </div>
              </label>
              <input
                id="full_name"
                {...register("full_name", {
                  required: t(
                    "allUserInformation.createUser.validation.fullName"
                  ),
                  minLength: {
                    value: 3,
                    message: t(
                      "allUserInformation.createUser.validation.minLength"
                    ),
                  },
                  maxLength: {
                    value: 100,
                    message: t(
                      "allUserInformation.createUser.validation.maxLength"
                    ),
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
                <div className={styles.flex}>
                  <div className={styles.label_container}>
                    <span>*</span>
                  </div>
                  <div>
                    <span>{t("allUserInformation.createUser.email")}</span>
                  </div>
                </div>
              </label>
              <input
                id="email"
                type="email"
                {...register("email", {
                  required: t("allUserInformation.createUser.validation.email"),
                })}
                className="mt-1 w-4/5 px-4 py-1.5 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className={styles.input_container}>
              <label
                className="block text-sm font-medium text-gray-600"
                htmlFor="department"
              >
                <div className={styles.flex}>
                  <div className={styles.label_container}>
                    <span>*</span>
                  </div>
                  <div>
                    <span>{t("allUserInformation.createUser.department")}</span>
                  </div>
                </div>
              </label>
              {/* <select
                id="department"
                {...register("department", {
                  required: "Department is required",
                })}
                className="mt-1 w-4/5 px-4 py-1.5 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
              >
                <option value="">Select Department</option>
                {department &&
                  department.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.name}
                    </option>
                  ))}
              </select> */}
              <Select
                register={{
                  ...register("department", {
                    required: t(
                      "allUserInformation.createUser.validation.department"
                    ),
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
                <div className={styles.flex}>
                  <div className={styles.label_container}>
                    <span>*</span>
                  </div>
                  <div>
                    <span>{t("allUserInformation.createUser.salary")}</span>
                  </div>
                </div>
              </label>
              <input
                id="salary"
                {...register("salary", {
                  required: t(
                    "allUserInformation.createUser.validation.salary"
                  ),
                  minLength: {
                    value: 0,
                    message: t(
                      "allUserInformation.createUser.validation.salaryMesssage"
                    ),
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
                <div className={styles.flex}>
                  <div className={styles.label_container}>
                    <span>*</span>
                  </div>
                  <div>
                    <span>{t("allUserInformation.createUser.roleID")}</span>
                  </div>
                </div>
              </label>
              {/* <select
                id="role_id"
                {...register("role_id", { required: "Role ID is required" })}
                className="mt-1 w-4/5 px-4 py-1.5 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
              >
                <option value="">Select Role</option>
                <option value="1">1 - Admin</option>
                <option value="2">2 - Approver</option>
                <option value="3">3 - Finance</option>
                <option value="4">4 - Claimer</option>
              </select> */}
              <Select
                options={options}
                register={register("role_id")}
                onChange={(value) => console.log(value)}
                placeholder="Select Role ID"
                className="mt-1 w-4/5 px-4 py-1.5 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
              />
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
                    <span>{t("allUserInformation.createUser.jobRank")}</span>
                  </div>
                </div>
              </label>
              {/* <select
                id="job_rank"
                {...register("job_rank", {
                  required: "Department is required",
                })}
                className="mt-1 w-4/5 px-4 py-1.5 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
              >
                <option value="">Select Job Rank</option>
                {jobRank &&
                  jobRank.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.name} - {a.ot_rate}
                    </option>
                  ))}
              </select> */}
              <Select
                options={jobRank.map((a) => ({ label: a.name, value: a.id }))}
                register={{
                  ...register("job_rank", {
                    required: t(
                      "allUserInformation.createUser.validation.jobRank"
                    ),
                  }),
                }}
                placeholder="Select Job Rank"
                onChange={(value) => console.log(value)}
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
                {t("allUserInformation.buttonCreate")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
