import React from "react";
import httpClient from "@constant/apiInstance";
import { Claim } from "@/types/Claim";
import { useState, useEffect } from "react";
import { Column, DataRecord } from "@components/ui/Table/Table";
import { useParams } from "react-router-dom";
import { ApiResponse } from "@/types/ApiResponse";
import { useLocation } from "react-router-dom";
import { AxiosResponse } from "axios";
import { error } from "console";
export const ApproveDetail: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");
  const [claim, setClaim] = useState<Claim | null>(null);
  const fetchClaimById = async (id: string) => {
    try {
      const response = await httpClient.get<ApiResponse<Claim[]>>(
        "/claims/" + id
      );
      setClaim(response.data.data[0]);
      console.log(claim);
    } catch (error) {
      console.error("Fetch claim error: " + error);
    }
  };
  useEffect(() => {
    fetchClaimById("C002");
  }, [id]);
  const formatDateToDDMMYYYY = (date: string) => {
    const dateObj = new Date(date);
    const day = dateObj.getDate();
    const month = dateObj.getMonth() + 1;
    const year = dateObj.getFullYear();
    return `${day}/${month}/${year}`;
  };
  return (
    <div className="flex justify-center items-center min-h-full">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Approve Detail
        </h1>
        <div className="space-y-2 text-gray-700">
          <p>
            <span className="font-semibold text-lg">Claim ID:</span>{" "}
            {claim?.claim_id}
          </p>
          <p>
            <span className="font-semibold text-lg">User ID:</span>{" "}
            {claim?.user_id}
          </p>
          <p>
            <span className="font-semibold text-lg">Project ID:</span>{" "}
            {claim?.project_id}
          </p>
          <p>
            <span className="font-semibold text-lg">Total Working Hours:</span>{" "}
            {claim?.total_working_hours}
          </p>
          <p>
            <span className="font-semibold text-lg">Submitted Date:</span>{" "}
            {formatDateToDDMMYYYY(claim?.submitted_date ?? "")}
          </p>
          <p>
            <span className="font-semibold text-lg">From:</span>{" "}
            {formatDateToDDMMYYYY(claim?.start_date ?? "")}
          </p>
          <p>
            <span className="font-semibold text-lg">To:</span>{" "}
            {formatDateToDDMMYYYY(claim?.end_date ?? "")}
          </p>
          <p>
            <span className="font-semibold text-lg">Claim Status:</span>{" "}
            {claim?.claim_status}
          </p>
        </div>
      </div>
    </div>
  );
};
export default ApproveDetail;
