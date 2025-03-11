import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./ApproverdApprover.module.css";
import { ArrowLeftSquare, ArrowRightSquare, EyeIcon } from "lucide-react";
import { AppDispatch } from "../../../redux/index";
import { useNavigate } from "react-router-dom";
import { fetchApprovedClaimsApproverAsync } from "@/redux/thunk/Claim/claimThunk";
import { selectApprovedClaims } from "@/redux/selector/claimSelector";
import httpClient from "@/constant/apiInstance";
import TableComponent, { Column } from "../Table/Table";

interface claimList {
  claim_id: string;
  user_id: string;
  project_id: string;
  total_working_hours: number;
  submitted_date: Date;
  claim_status: string;
}

export const ApprovedApproverComponent: React.FC = () => {
  const [claimList, setClaimList] = useState<claimList[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchApprovedClaimAysnc();
  }, []);

  const fetchApprovedClaimAysnc = async () => {
    const res = await httpClient.get(`/approvers/approved-claim`);
    console.log("data: ", res.data.data);
    setClaimList(res.data.data);
  };

  const columns: Column[] = [
    {
      key: "claim_id",
      dataIndex: "claim_id",
      title: "Claim ID",
    },
    {
      key: "user_id",
      dataIndex: "user_id",
      title: "User ID",
    },
    {
      key: "project_id",
      dataIndex: "project_id",
      title: "Project ID",
    },
    {
      key: "total_working_hours",
      dataIndex: "total_working_hours",
      title: "Total Working Hours",
      cell: ({ value }) => `${value} hours`,
    },
    {
      key: "submitted_date",
      dataIndex: "submitted_date",
      title: "Submitted Date",
      cell: ({ value }) => new Date(value as Date).toLocaleDateString(),
    },
    {
      key: "action",
      dataIndex: "claim_id",
      title: "Action",
      cell: ({ value }) => (
        <EyeIcon
          className={styles.icon}
          onClick={() => {
            // Add your navigation logic here
            navigate(`/details/${value}`);
          }}
        />
      ),
    },
  ];

  return (
    <div>
      <TableComponent
        columns={columns}
        dataSource={claimList}
        loading={false}
        pagination={true}
        name="Claims"
        pageLength={7}
      />
    </div>
  );
};

export default ApprovedApproverComponent;
