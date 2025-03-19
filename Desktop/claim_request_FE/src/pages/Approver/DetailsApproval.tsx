import React, { useEffect, useState } from "react";
import httpClient from "@constant/apiInstance";
import { ApiResponse } from "@/types/ApiResponse";
import { PendingClaim } from "@/types/Claim";
import { MoveRight } from "lucide-react";
import styles from "./DetailsApproval.module.css";
import { ToastContainer, toast } from "react-toastify";
import Modal from "@ui/modal/Modal";
import StatusTag from "@ui/StatusTag/StatusTag";


const formatDateToMonthDay = (date: string) => {
  const dateObj = new Date(date);
  const day = dateObj.getDate();
  const month = dateObj.toLocaleString("en-US", { month: "long" });

  const getDayWithSuffix = (day: number) => {
    if (day > 3 && day < 21) return `${day}th`;
    switch (day % 10) {
      case 1:
        return `${day}st`;
      case 2:
        return `${day}nd`;
      case 3:
        return `${day}rd`;
      default:
        return `${day}th`;
    }
  };

  return `${month} ${getDayWithSuffix(day)}`;
};

export const DetailsApproval: React.FC = ({
  request_id,
  setOpenModal,
}: {
  request_id: string;
  setOpenModal: (open: boolean) => void;
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
    <Modal
      open={true}
      onCancel={handleCancel}
      onOk={handleCancel}
      buttonCancel="Close"
      buttonOk="Approve"
      title="Claim Detail"
      width={600}
      centered={false}
      position={{ right: 20, top: 23 }}
      height="95%"
      className={styles.modal}
    >
      <hr />
      <div className={styles.container}>
        <div className={styles.containerUser}>
          <div className={styles.infoUser1}>
            <img
              src="https://i1.wp.com/upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
              title="avatar"
              className={styles.avatar}
            />
            <p>{claimData?.full_name}</p>
          </div>
          <div className={styles.infoUser2}>
            <p>User ID: {claimData?.user_id}</p>
            <p>Salary Overtime: {claimData?.salary_overtime}</p>
          </div>
        </div>
        <hr />
        <div className={styles.containerProject}>
          <p>
            Project ID:{" "}
            <span className={styles.boldText}> {claimData?.project_id}</span>{" "}
          </p>
          <p>
            Project Name:{" "}
            <span className={styles.boldText}>{claimData?.project_name}</span>
          </p>
        </div>
        <div className={styles.containerRequest}>
          <div className={styles.timeDuration}>
            <p>Time Duration:</p>
            <h4>
              <span className={styles.boldText}>
                {formatDateToMonthDay(`${claimData?.start_date}`)}
              </span>{" "}
              <MoveRight size={20} className={styles.iconMoveRight} />{" "}
              <span className={styles.boldText}>
                {formatDateToMonthDay(`${claimData?.end_date}`)}
              </span>
            </h4>
          </div>
          <p>
            Submitted Date:{"   "}
            <span className={styles.boldText}>
              {formatDateToMonthDay(`${claimData?.submitted_date}`)}
            </span>
          </p>
          <p>
            Approved Date:{"   "}
            <span className={styles.boldText}>
              {formatDateToMonthDay(`${claimData?.approved_date}`)}
            </span>
          </p>
          <p>
            Total Working Hours:{" "}
            <span className={styles.boldText}>
              {claimData?.total_hours} hours
            </span>
          </p>
          <p>
            Status:{" "}
            {claimData?.claim_status ? (
              <StatusTag
                status={
                  claimData.claim_status as
                    | "PENDING"
                    | "APPROVED"
                    | "REJECTED"
                    | "PAID"
                }
              />
            ) : (
              "-"
            )}
          </p>
        </div>
        <div>
          {claimData?.claim_details && claimData.claim_details.length > 0 ? (
            <div className={styles.history}>
              <h4>Claim History</h4>
              {claimData.claim_details.map((detail, index) => (
                <div key={index} className={styles.historyItem}>
                  <span className={styles.boldText}>
                    {formatDateToMonthDay(detail.date)}
                  </span>
                  <p>
                    Working Hours:{" "}
                    <span className={styles.boldText}>
                      {detail.working_hours} hours
                    </span>
                  </p>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </Modal>
  );
};
