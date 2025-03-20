import React from "react";
import { AppDispatch } from "@/redux";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectApprovedClaimByUserID } from "@/redux/selector/claimSelector";
import { fetchClaimByUserWithApprovedStatusAsync } from "@/redux/thunk/Claim/claimThunk";
import TableComponent, {
  DataRecord,
  Column,
} from "@/components/ui/Table/Table";
import { EyeIcon } from "lucide-react";

export const ApprovedClaimByUserID: React.FC = () => {
  const listApprovedClaim = useSelector(selectApprovedClaimByUserID);
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await dispatch(fetchClaimByUserWithApprovedStatusAsync());
      setLoading(false);
    };
    fetchData();
  }, [dispatch]);
  const formatDateToDDMMYYYY = (date: string) => {
    const dateObj = new Date(date);
    const day = dateObj.getDate();
    const month = dateObj.getMonth() + 1;
    const year = dateObj.getFullYear();
    return `${day}/${month}/${year}`;
  };
  const handleViewDetail = (id: string) => {
    console.log("View detail", id);
  };
  const columns: Column[] = [
    {
      key: "project_id",
      dataIndex: "project_id",
      title: "Project ID",
    },
    {
      key: "total_hours",
      dataIndex: "total_hours",
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
      key: "claim_status",
      dataIndex: "claim_status",
      title: "Claim Status",
      cell: ({ value }: { value: unknown }) => {
        const stringValue = value as string;
        return stringValue === "APPROVED" ? (
          <span style={{ color: "green" }}>{stringValue}</span>
        ) : (
          <span>{stringValue}</span>
        );
      },
    },
    {
      key: "action",
      dataIndex: "claim_id",
      title: "Action",
      cell: ({ value }) => (
        <EyeIcon onClick={() => handleViewDetail(value as string)} />
      ),
    },
  ];
  const dataSource: DataRecord[] = listApprovedClaim.map((claim, index) => ({
    ...claim,
    key: index,
    id: claim.claim_id ? claim.claim_id.toString() : "",
    status: claim.claim_status ? claim.claim_status : "",
  }));
  return (
    <div>
      <TableComponent
        columns={columns}
        dataSource={dataSource}
        loading={true}
        pagination={true}
        name="My Claims"
        totalPage={1}
      />
    </div>
  );
};
