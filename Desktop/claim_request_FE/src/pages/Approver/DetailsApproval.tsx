import React, { useEffect, useState } from "react";
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
  const [claimData, setClaimData] = useState<PendingClaim | null>(null);

  const fetchRequestById = async (request_id: string) => {
    try {
      const response = await httpClient.get<ApiResponse<PendingClaim[]>>(
        `/approvers/pending-claim/${request_id}`
      );
      const claimData = response.data.data[0];
      console.log(claimData);
      setClaimData(claimData);
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
          Claim Details
        </h1>
        <div className={styles.input_container}>
          <label className="block text-sm font-medium text-gray-600">
            Claim ID
          </label>
          <p>{claimData?.claim_id}</p>
        </div>
        <div className={styles.input_container}>
          <label className="block text-sm font-medium text-gray-600">
            User ID
          </label>
          <p>{claimData?.user_id}</p>
        </div>
        <div className={styles.input_container}>
          <label className="block text-sm font-medium text-gray-600">
            Start Date
          </label>
          <p>{claimData?.start_date}</p>
        </div>
        <div className={styles.input_container}>
          <label className="block text-sm font-medium text-gray-600">
            End Date
          </label>
          <p>{claimData?.end_date}</p>
        </div>
        <div className={styles.input_container}>
          <label className="block text-sm font-medium text-gray-600">
            Total Hours
          </label>
          <p>{claimData?.total_hours}</p>
        </div>
        <div className={styles.input_container}>
          <label className="block text-sm font-medium text-gray-600">
            Project ID
          </label>
          <p>{claimData?.project_id}</p>
        </div>
        <div className={styles.input_container}>
          <label className="block text-sm font-medium text-gray-600">
            Submitted Date
          </label>
          <p>{claimData?.submitted_date}</p>
        </div>
        <div className={styles.input_container}>
          <label className="block text-sm font-medium text-gray-600">
            Claim Status
          </label>
          <p>{claimData?.claim_status}</p>
        </div>
        <div className={styles.input_container}>
          <label className="block text-sm font-medium text-gray-600">
            User Full Name
          </label>
          <p>{claimData?.user.full_name}</p>
        </div>
        <div className={styles.input_container}>
          <label className="block text-sm font-medium text-gray-600">
            User Salary
          </label>
          <p>{claimData?.user.salary}</p>
        </div>
        <div className={styles.input_container}>
          <label className="block text-sm font-medium text-gray-600">
            User OT Rate
          </label>
          <p>{claimData?.user.ot_rate}</p>
        </div>
        <div className={styles.input_container}>
          <label className="block text-sm font-medium text-gray-600">
            Salary Overtime
          </label>
          <p>{claimData?.salary_overtime}</p>
        </div>
        <div className={styles.input_container}>
          <label className="block text-sm font-medium text-gray-600">
            Claim Details
          </label>
          <p>{claimData?.claim_details}</p>
        </div>
      </div>
    </div>
  );
};
