import styles from "@ui/finance/ApprovedDetailFinance.module.css";
import TableComponent, { Column, DataRecord } from "../Table/Table";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux";
import { fetchApprovedDetailFinanceAsync } from "@/redux/thunk/Claim/claimThunk";
import { selectApprovedDetailFinance } from "@/redux/selector/claimSelector";
import { Button } from "../button/Button";
import StatusTag from "../StatusTag/StatusTag";

const formatDateToDDMMYYYY = (date: string) => {
  const dateObj = new Date(date);
  const day = dateObj.getDate();
  const month = dateObj.getMonth() + 1;
  const year = dateObj.getFullYear();
  return `${day}/${month}/${year}`;
};

function ApprovedDetailFinance() {
  const { request_id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const claimDetail = useSelector(selectApprovedDetailFinance);

  useEffect(() => {
    fetchDetailClaimFinance();
  }, [request_id, dispatch]);

  const fetchDetailClaimFinance = () => {
    if (request_id) {
      dispatch(fetchApprovedDetailFinanceAsync({ request_id }));
    }
  };

  const columns: Column[] = [
    {
      key: "date",
      dataIndex: "date",
      title: "Date Overtime",
      cell: ({ value }: { value: string }) => {
        return formatDateToDDMMYYYY(`${value}`);
      },
    },
    {
      key: "working_hours",
      dataIndex: "working_hours",
      title: "Working hours",
    },
  ];

  const dataSource: DataRecord[] =
    claimDetail?.claim_details?.map((detail, index) => ({
      ...detail,
      key: index,
    })) || [];

  return (
    <div>
      <h1>Claim Status</h1>
      <div className={styles.container}>
        <div className={styles.infoUserProject}>
          <h3>User ID: {claimDetail?.user_id}</h3>
          <h3>Full Name: {claimDetail?.full_name}</h3>
          <h3>Salary Overtime: {claimDetail?.salary_overtime}</h3>
          <hr />
          <h3>Project ID: {claimDetail?.project_id}</h3>
          <h3>Project Name: {claimDetail?.project_name}</h3>
        </div>
        <div className={styles.infoClaim}>
          <h3>Request ID: {request_id}</h3>
          <h3>
            Time Duration: {formatDateToDDMMYYYY(`${claimDetail?.start_date}`)}{" "}
            - {formatDateToDDMMYYYY(`${claimDetail?.end_date}`)}
          </h3>
          <h3>
            Submitted Date:{" "}
            {formatDateToDDMMYYYY(`${claimDetail?.submitted_date}`)}
          </h3>
          <h3>
            Approved Date:{" "}
            {formatDateToDDMMYYYY(`${claimDetail?.approved_date}`)}
          </h3>
          <h3>Total Working Hours: {claimDetail?.total_hours}</h3>
          <h3>
            Status:{" "}
            {claimDetail?.claim_status ? (
              <StatusTag
                status={
                  claimDetail.claim_status as
                    | "PENDING"
                    | "APPROVED"
                    | "REJECTED"
                    | "PAID"
                }
              />
            ) : (
              "-"
            )}
          </h3>
        </div>
      </div>
      <TableComponent columns={columns} dataSource={dataSource} />
    </div>
  );
}

export default ApprovedDetailFinance;
