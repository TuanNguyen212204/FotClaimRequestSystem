import React from "react";
import { AppDispatch } from "@/redux";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import fetchClaims from "@/redux/thunk/Draft";
import { selectInitialValues } from "@/redux/slices/UpdateDraft";
import {
  selectDraftClaimByUserID,
  selectRejectedClaimByUserID,
} from "@/redux/selector/claimSelector";
import {
  fetchAllRejectedClaimAsync,
  fetchClaimByUserWithDraftStatusAsync,
} from "@/redux/thunk/Claim/claimThunk";
import TableComponent, {
  DataRecord,
  Column,
} from "@/components/ui/Table/Table";
import { EyeIcon } from "lucide-react";
import { SquarePen } from "lucide-react";
import styles from "./DraftClaimByUserID.module.css";
import CreateClaimPage from "../CreateClaim";
export const DraftClaimByUserID: React.FC = () => {
  const listApprovedClaim = useSelector(selectDraftClaimByUserID);
  const initValue = useSelector(selectInitialValues);
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [record, setRecord] = useState<any>(null);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await dispatch(fetchClaimByUserWithDraftStatusAsync());
      setLoading(false);
    };
    console.log("listApprovedClaim", listApprovedClaim);
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
  const handleUpdate = async (record: any) => {
    console.log("Update", record);
    setOpenModal(true);
    setRecord(record);
    console.log(record.request_id);
    console.table(record);
    dispatch(fetchClaims(record.request_id));
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
      title: "Total Hours",
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
        return stringValue === "DRAFT" ? (
          <span style={{ color: "#EF9651" }}>{stringValue}</span>
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
    {
      key: "update",
      dataIndex: "update",
      title: "Update",
      cell: ({ record }: { record: any }) => (
        <SquarePen onClick={() => handleUpdate(record)} />
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
      {openModal && (
        <div className={`${styles.editModal} p-0 m-0`}>
          <div>
            <div className="w-[640px] relative">
              {initValue && (
                <span
                  className="absolute top-3 right-5 flex items-center justify-center w-6 h-6 cursor-pointer text-gray-600 hover:text-gray-800 hover:bg-gray-300 rounded-full"
                  onClick={() => setOpenModal(false)}
                >
                  X
                </span>
              )}
              {initValue && (
                <CreateClaimPage
                  initialValues={initValue}
                  mode="update"
                  formStatus="Draft"
                  requestID={record.request_id}
                />
              )}
            </div>
          </div>
        </div>
      )}
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
