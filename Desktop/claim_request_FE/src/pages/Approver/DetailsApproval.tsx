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
     
    </div>
  );
};
