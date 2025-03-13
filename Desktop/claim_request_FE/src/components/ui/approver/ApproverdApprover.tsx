import React, { useEffect, useState } from "react";
import styles from "./ApproverdApprover.module.css";
import { EyeIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import httpClient from "@/constant/apiInstance";
import TableComponent, { Column, DataRecord } from "../Table/Table";
import { useDispatch, useSelector } from "react-redux";
import { fetchApprovedClaimsApproverAsync } from "@redux/thunk/Claim/claimThunk";
import { AppDispatch } from "@redux/index";
import { selectAppovedClaim } from "@redux/selector/claimSelector";
import { PATH } from "@constant/config";
interface claimList {
  claim_id?: string;
  user_id?: string;
  project_id?: string;
  total_working_hours?: number;
  submitted_date?: Date;
  claim_status?: string;
  project_name?: string;
}

export const ApprovedApproverComponent: React.FC = () => {
  const [claimList, setClaimList] = useState<claimList[]>([]);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const listClaim = useSelector(selectAppovedClaim);
  useEffect(() => {
    // fetchApprovedClaimAysnc();
    dispatch(fetchApprovedClaimsApproverAsync());
  }, []);

  const fetchApprovedClaimAysnc = async () => {
    try {
      const res = await httpClient.get<{ data: claimList[] }>(
        `/approvers/approved-claim`
      );
      console.log("data: ", res.data.data);
      setClaimList(res.data.data);
    } catch (error) {
      console.log("Error at ApprovedApprover: ", error);
    }
  };

  const handleViewDetail = (claimId: string) => {
    navigate(`/approve/detail/${claimId}`); //sửa lại url ở đây để truyền
  };

  const formatDateToDDMMYYYY = (date: string) => {
    const dateObj = new Date(date);
    const day = dateObj.getDate();
    const month = dateObj.getMonth() + 1;
    const year = dateObj.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const columns: Column[] = [
    // {
    //   key: "claim_id",
    //   dataIndex: "claim_id",
    //   title: "Claim ID",
    // },
    // {
    //   key: "user_id",
    //   dataIndex: "user_id",
    //   title: "User ID",
    // },
    {
      key: "project_name",
      dataIndex: "project_name",
      title: "Project Name",
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
      cell: ({ value }) => formatDateToDDMMYYYY(value as string),
    },
    {
      key: "action",
      dataIndex: "claim_id",
      title: "Action",
      cell: ({ value }) => (
        <EyeIcon
          className={styles.icon}
          onClick={() => handleViewDetail(value as string)}
        />
      ),
    },
  ];
  const dataSource: DataRecord[] = listClaim.map((claim, index) => ({
    ...claim,
    key: index,
    id: claim.claim_id ? claim.claim_id.toString() : "",
    status: claim.claim_id ? claim.claim_id : "",
  }));
  return (
    <div>
      <TableComponent
        columns={columns}
        dataSource={dataSource}
        loading={false}
        pagination={true}
        name="Claims"
        pageLength={7}
      />
    </div>
  );
};

export default ApprovedApproverComponent;
