import React from "react";
import CreateClaim from "@/pages/CreateClaim/Components/Create-Claim/CreateClaim";
import { FormData } from "@/types/claimForm.type";
export interface CreateClaimPageProps {
  mode: "create" | "view" | "update";
  initialValues?: FormData;
  formStatus: "Draft" | "Pending" | "Approved" | "Rejected" | "Paid";
  requestID?: string;
}

const CreateClaimPage: React.FC<CreateClaimPageProps> = ({
  mode = "create",
  initialValues,
  formStatus = "Draft",
  requestID,
}) => {
  return (
    <div
      className={`box-border overflow-auto bg-gray-100 p-4 font-['Roboto'] leading-relaxed text-gray-800 md:p-6`}
    >
      <div className="mx-auto box-border max-w-7xl rounded-md bg-white p-4 shadow-md md:p-6">
        <CreateClaim
          mode={mode}
          initialValues={initialValues}
          formStatus={formStatus}
          requestID={requestID}
        />
      </div>
    </div>
  );
};

export default CreateClaimPage;
