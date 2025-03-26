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
type DepartmentList = Department[];
type JobRankList = JobRank[];
export const CreateUser: React.FC<CreateUserProps> = ({
  openModal,
  setOpenModal,
}) => {
  const navigate = useNavigate();
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
      delay(1000);
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
      delay(1000);
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
            Create User
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
                <div className={styles.flex}>
                  <div className={styles.label_container}>
                    <span>*</span>
                  </div>
                  <div>
                    <span>Department</span>
                  </div>
                </div>
              </label>
              <select
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
              </select>
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
                <div className={styles.flex}>
                  <div className={styles.label_container}>
                    <span>*</span>
                  </div>
                  <div>
                    <span>Job Rank</span>
                  </div>
                </div>
              </label>
              <select
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
              </select>

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
