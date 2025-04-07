import React from "react";
import { useNavigate } from "react-router-dom";
import { PATH } from "@constant/config";
import { useEffect, useState } from "react";
import httpClient from "@/constant/apiInstance";
import { useForm } from "react-hook-form";
import { fetchAllUserAsync, fetchTotalPage } from "@redux/thunk/User/userThunk";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "@redux/index.ts";
import { User, X, Mail, CircleDollarSign } from "lucide-react";
import { toast } from "react-toastify";
import styles from "./CreateUser.module.css";
import {
  selectAllUser,
  selectTotalPageOfAllUser,
} from "@/redux/selector/userSelector";
import { LoadingProvider } from "@/components/ui/Loading/LoadingContext";
import LoadingOverlay from "@/components/ui/Loading/LoadingOverlay";
import { ApiResponseNoGeneric } from "@/types/ApiResponse";
import { useTranslation } from "react-i18next";
import Input from "@/components/ui/Input/Input";

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

type DepartmentList = Department[];
type JobRankList = JobRank[];

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
      className={`rounded border p-2 ${className}`}
      value={value}
      {...register}
      onChange={(e) =>
        multiple
          ? onChange(
              Array.from(
                e.target.selectedOptions,
                (option) => option.value,
              ).join(","),
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

  const options: Option[] = [
    { label: t("allUserInformation.roles.admin"), value: "1" },
    { label: t("allUserInformation.roles.approver"), value: "2" },
    { label: t("allUserInformation.roles.finance"), value: "3" },
    { label: t("allUserInformation.roles.claimer"), value: "4" },
  ];

  const fetchDepartment = async () => {
    try {
      const response =
        await httpClient.get<ApiResponseNoGeneric>(`/admin/departments`);
      setDepartment(response.data.data);
    } catch (error) {
      console.error("Fetch department error:", error);
    }
  };

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
    fetchJobRank();
  }, []);

  useEffect(() => {
    console.log(jobRank);
    console.log(department);
  }, [jobRank, department]);

  const handleCreateUser = async (data: any) => {
    try {
      const response = await httpClient.post<ApiResponseNoGeneric>(
        "/admin/create-staff",
        data,
      );
      if (response.status === 200) {
        toast.success(t("allUserInformation.create_success"));
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
          toast.error(t("allUserInformation.create_failed"));
        }
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error(t("allUserInformation.create_failed"));
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
        handleCancel();
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
        <div className="mx-auto rounded-xl bg-white pr-0 pb-5 shadow-xl">
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
          <h1 className={`mb-6 text-center text-3xl font-bold ${styles.title}`}>
            {t("allUserInformation.createUser.title")}
          </h1>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                    <span>{t("allUserInformation.createUser.fullName")}</span>
                  </div>
                </div>
              </label>
              <div className="relative w-4/5">
                <User className="absolute top-1/2 left-2 -translate-y-1/2 transform text-gray-400" />
                <input
                  placeholder="Enter your full name"
                  id="full_name"
                  {...register("full_name", {
                    required: t(
                      "allUserInformation.createUser.validation.fullName",
                    ),
                    minLength: {
                      value: 3,
                      message: t(
                        "allUserInformation.createUser.validation.minLength",
                      ),
                    },
                    maxLength: {
                      value: 100,
                      message: t(
                        "allUserInformation.createUser.validation.maxLength",
                      ),
                    },
                  })}
                  className="mt-1 h-6 w-full rounded-lg border border-gray-300 p-2 pl-8 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>

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
                    <span>{t("allUserInformation.createUser.email")}</span>
                  </div>
                </div>
              </label>
              <div className="relative w-4/5">
                <Mail className="absolute top-1/2 left-2 -translate-y-1/2 transform text-gray-400" />
                <input
                  placeholder="Enter your email"
                  id="email"
                  type="email"
                  {...register("email", {
                    required: t(
                      "allUserInformation.createUser.validation.email",
                    ),
                  })}
                  className="pl- mt-1 h-6 w-full rounded-lg border border-gray-300 p-2 pl-9 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>

              {errors.email && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="ml-15">
              <label
                className="block text-sm font-medium text-gray-600"
                htmlFor="department"
              >
                <div className={styles.flex}>
                  <div className={styles.label_container}>
                    <span>*</span>
                  </div>
                  <div className={styles.input_container}>
                    <span>{t("allUserInformation.createUser.department")}</span>
                  </div>
                </div>
              </label>

              <Select
                register={{
                  ...register("department", {
                    required: t(
                      "allUserInformation.createUser.validation.department",
                    ),
                  }),
                }}
                options={department.map((a) => ({
                  label: t(`allUserInformation.departments.${a.name}`),
                  value: a.id,
                }))}
                placeholder={t(
                  "allUserInformation.placeholders.selectDepartment",
                )}
                onChange={(value) => console.log(value)}
                className="mt-1 h-11 w-90 rounded-lg border border-gray-300 p-2 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />

              {errors.department && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.department.message}
                </p>
              )}
            </div>
            <div className="ml-15">
              <label
                className="block text-sm font-medium text-gray-600"
                htmlFor="salary"
              >
                <div className={styles.flex}>
                  <div className={styles.label_container}>
                    <span>*</span>
                  </div>
                  <div className={styles.input_container}>
                    <span>{t("allUserInformation.createUser.salary")}</span>
                  </div>
                </div>
              </label>
              <div className="relative w-4/5">
                <CircleDollarSign className="absolute top-1/2 left-2 -translate-y-1/2 transform text-gray-400" />
                <input
                  placeholder="Enter your salary ($)"
                  id="salary"
                  {...register("salary", {
                    required: t(
                      "allUserInformation.createUser.validation.salary",
                    ),
                    min: {
                      value: 0,
                      message: t(
                        "allUserInformation.createUser.validation.salaryMessage",
                      ),
                    },
                  })}
                  className="mt-1 h-6 w-full rounded-lg border border-gray-300 p-2 pl-9 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>

              {errors.salary && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.salary.message}
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
                    <span>{t("allUserInformation.createUser.roleID")}</span>
                  </div>
                </div>
              </label>
              <Select
                options={options}
                register={{
                  ...register("role_id", {
                    required: t(
                      "allUserInformation.createUser.validation.roleID",
                    ),
                  }),
                }}
                placeholder={t("allUserInformation.placeholders.selectRoleID")}
                onChange={(value) => console.log(value)}
                className="mt-1 h-11 w-90 rounded-lg border border-gray-300 p-2 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
              {errors.role_id && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.role_id.message}
                </p>
              )}
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
                    <span>{t("allUserInformation.createUser.jobRank")}</span>
                  </div>
                </div>
              </label>
              <Select
                options={jobRank.map((a) => ({
                  label: t(`allUserInformation.jobRanks.${a.name}`),
                  value: a.id,
                }))}
                register={{
                  ...register("job_rank", {
                    required: t(
                      "allUserInformation.createUser.validation.jobRank",
                    ),
                  }),
                }}
                placeholder={t("allUserInformation.placeholders.selectJobRank")}
                onChange={(value) => console.log(value)}
                className="mt-1 h-11 w-90 rounded-lg border border-gray-300 p-2 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />

              {errors.job_rank && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.job_rank.message}
                </p>
              )}
            </div>

            <div className={`${styles.update_button_container}`}>
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
