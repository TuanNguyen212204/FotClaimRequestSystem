import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styles from "./PaidClaims.module.css";
import { PATH } from "../../constant/config";
import TableComponent, { Column, DataRecord } from "../../components/ui/Table/Table";
import { fetchPaidClaimsAsync } from "../../redux/slices/Claim/paidClaimsSlice";
import { AppDispatch } from "@/redux";
import { EyeIcon } from "lucide-react";

interface PaidClaimData {
  claim_id: string;
  user_id: string;
  full_name: string;
  submitted_date: string;
  total_working_hours: number;
  project_name: string;
  project_duration: string;
}

const PaidClaims: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const paidClaims = useSelector((state: any) => state.paidClaims.data);

  useEffect(() => {
    dispatch(fetchPaidClaimsAsync("1"));
  }, [dispatch]);

  const handleViewDetail = (claimId: string) => {
    navigate(`${PATH.claimStatus}/${claimId}`);
  };

  const formatDateToDDMMYYYY = (date: string) => {
    const dateObj = new Date(date);
    const day = dateObj.getDate();
    const month = dateObj.getMonth() + 1;
    const year = dateObj.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const columns: Column[] = [
    { 
      key: 'claim_id', 
      dataIndex: 'claim_id', 
      title: 'Claim ID',
    },
    { 
      key: 'full_name', 
      dataIndex: 'full_name', 
      title: 'Employee Name',
    },
    { 
      key: 'project_name', 
      dataIndex: 'project_name', 
      title: 'Project Name' 
    },
    { 
      key: 'submitted_date', 
      dataIndex: 'submitted_date', 
      title: 'Submitted Date',
      cell: ({ value }) => formatDateToDDMMYYYY(value as string),
    },
    { 
      key: 'total_working_hours', 
      dataIndex: 'total_working_hours', 
      title: 'Total Hours',
      cell: ({ value }) => `${value} hours`,
    },
    {
      key: 'action',
      dataIndex: 'claim_id',
      title: 'Action',
      cell: ({ value }) => (
        <EyeIcon 
          className={styles.icon}
          onClick={() => handleViewDetail(value as string)}
        />
      )
    }
  ];

  const dataSource: DataRecord[] = paidClaims.map((claim: PaidClaimData, index: number) => ({
    ...claim,
    key: index,
    id: claim.claim_id,
    project_name: claim.project?.project_name || '',
  }));

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.claimStatus_h1}>Paid Claims</h1>
        <hr />
      </div>

      <TableComponent
        columns={columns}
        dataSource={dataSource}
        loading={false}
        pagination={true}
        pageLength={7}
        name="Paid Claims"
      />
    </div>
  );
};

export default PaidClaims;
