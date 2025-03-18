import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import httpClient from "@constant/apiInstance";
import { ApiResponse } from "@/types/ApiResponse";
import { PendingClaim } from "@/types/Claim";
import { X } from "lucide-react";
import styles from "./DetailsApproval.module.css";
import { ToastContainer, toast } from "react-toastify";

export const DetailsApproval: React.FC = ({
  request_id,
  setOpenModal,
}: {
  request_id: string;
  setOpenModal: () => string;
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PendingClaim>();
  const [claimData, setClaimData] = useState<PendingClaim | null>(null);

  const fetchRequestById = async (request_id: string) => {
    try {
      const response = await httpClient.get<ApiResponse<PendingClaim[]>>(
        `/approvers/pending-claim/${request_id}`
      );
      const claimData = response.data.data[0];
      console.log(claimData);
      setClaimData(claimData);
      reset(claimData);
    } catch (error) {
      console.error("Error fetching claim data:", error);
    }
  };

  useEffect(() => {
    if (request_id) {
      fetchRequestById(request_id);
    }
  }, [request_id]);

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
          Update Claim
        </h1>
        {/* <form onSubmit={handleSubmit(onSubmit)} className="space-y-5"> */}
          <div className={styles.input_container}>
            <label
              className="block text-sm font-medium text-gray-600"
              htmlFor="claim_id"
            >
              <div className={styles.flex}>
                <div className={styles.label_container}>
                  <span>*</span>
                </div>
                <div>
                  <span>Claim ID</span>
                </div>
              </div>
            </label>
            {/* <input
              disabled
              id="claim_id"
              {...register("claim_id")}
              className="mt-1 w-4/5 px-4 py-1.5 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
            />
            {errors.claim_id && (
              <p className="text-red-500 text-sm mt-1">
                {errors.claim_id.message}
              </p>
            )} */}
          </div>
          {/* Add more form fields for each property in PendingClaim */}
          <div className={styles.input_container}>
            <label className="block text-sm font-medium text-gray-600" htmlFor="user_id">
              User ID
            </label>
            <input
              disabled
              id="user_id"
              {...register("user_id")}
              className="mt-1 w-4/5 px-4 py-1.5 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
            />
            {errors.user_id && (
              <p className="text-red-500 text-sm mt-1">
                {errors.user_id.message}
              </p>
            )}
          </div>
          <div className={styles.input_container}>
            <label className="block text-sm font-medium text-gray-600" htmlFor="start_date">
              Start Date
            </label>
            <input
              disabled
              id="start_date"
              {...register("start_date")}
              className="mt-1 w-4/5 px-4 py-1.5 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
            />
            {errors.start_date && (
              <p className="text-red-500 text-sm mt-1">
                {errors.start_date.message}
              </p>
            )}
          </div>
          <div className={styles.input_container}>
            <label className="block text-sm font-medium text-gray-600" htmlFor="end_date">
              End Date
            </label>
            <input
              disabled
              id="end_date"
              {...register("end_date")}
              className="mt-1 w-4/5 px-4 py-1.5 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
            />
            {errors.end_date && (
              <p className="text-red-500 text-sm mt-1">
                {errors.end_date.message}
              </p>
            )}
          </div>
          <div className={styles.input_container}>
            <label className="block text-sm font-medium text-gray-600" htmlFor="total_hours">
              Total Hours
            </label>
            <input
              disabled
              id="total_hours"
              {...register("total_hours")}
              className="mt-1 w-4/5 px-4 py-1.5 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
            />
            {errors.total_hours && (
              <p className="text-red-500 text-sm mt-1">
                {errors.total_hours.message}
              </p>
            )}
          </div>
          <div className={styles.input_container}>
            <label className="block text-sm font-medium text-gray-600" htmlFor="project_id">
              Project ID
            </label>
            <input
              disabled
              id="project_id"
              {...register("project_id")}
              className="mt-1 w-4/5 px-4 py-1.5 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
            />
            {errors.project_id && (
              <p className="text-red-500 text-sm mt-1">
                {errors.project_id.message}
              </p>
            )}
          </div>
          <div className={styles.input_container}>
            <label className="block text-sm font-medium text-gray-600" htmlFor="submitted_date">
              Submitted Date
            </label>
            <input
              disabled
              id="submitted_date"
              {...register("submitted_date")}
              className="mt-1 w-4/5 px-4 py-1.5 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
            />
            {errors.submitted_date && (
              <p className="text-red-500 text-sm mt-1">
                {errors.submitted_date.message}
              </p>
            )}
          </div>
          <div className={styles.input_container}>
            <label className="block text-sm font-medium text-gray-600" htmlFor="claim_status">
              Claim Status
            </label>
            <input
              disabled
              id="claim_status"
              {...register("claim_status")}
              className="mt-1 w-4/5 px-4 py-1.5 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
            />
            {errors.claim_status && (
              <p className="text-red-500 text-sm mt-1">
                {errors.claim_status.message}
              </p>
            )}
          </div>
          <div className={styles.input_container}>
            <label className="block text-sm font-medium text-gray-600" htmlFor="user_full_name">
              User Full Name
            </label>
            <input
              disabled
              id="user_full_name"
              {...register("user.full_name")}
              className="mt-1 w-4/5 px-4 py-1.5 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
            />
            {errors.user?.full_name && (
              <p className="text-red-500 text-sm mt-1">
                {errors.user.full_name.message}
              </p>
            )}
          </div>
          <div className={styles.input_container}>
            <label className="block text-sm font-medium text-gray-600" htmlFor="user_salary">
              User Salary
            </label>
            <input
              disabled
              id="user_salary"
              {...register("user.salary")}
              className="mt-1 w-4/5 px-4 py-1.5 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
            />
            {errors.user?.salary && (
              <p className="text-red-500 text-sm mt-1">
                {errors.user.salary.message}
              </p>
            )}
          </div>
          <div className={styles.input_container}>
            <label className="block text-sm font-medium text-gray-600" htmlFor="user_ot_rate">
              User OT Rate
            </label>
            <input
              disabled
              id="user_ot_rate"
              {...register("user.ot_rate")}
              className="mt-1 w-4/5 px-4 py-1.5 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
            />
            {errors.user?.ot_rate && (
              <p className="text-red-500 text-sm mt-1">
                {errors.user.ot_rate.message}
              </p>
            )}
          </div>
          <div className={styles.input_container}>
            <label className="block text-sm font-medium text-gray-600" htmlFor="salary_overtime">
              Salary Overtime
            </label>
            <input
              disabled
              id="salary_overtime"
              {...register("salary_overtime")}
              className="mt-1 w-4/5 px-4 py-1.5 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
            />
            {errors.salary_overtime && (
              <p className="text-red-500 text-sm mt-1">
                {errors.salary_overtime.message}
              </p>
            )}
          </div>
          <div className={styles.input_container}>
            <label className="block text-sm font-medium text-gray-600" htmlFor="claim_details">
              Claim Details
            </label>
            <textarea
              disabled
              id="claim_details"
              {...register("claim_details")}
              className="mt-1 w-4/5 px-4 py-1.5 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
            />
            {errors.claim_details && (
              <p className="text-red-500 text-sm mt-1">
                {errors.claim_details.message}
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
