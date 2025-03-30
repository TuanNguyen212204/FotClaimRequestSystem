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
      className={`bg-gray-100 text-gray-800 p-4 md:p-6 font-['Roboto'] leading-relaxed box-border max-h-[1080px] overflow-auto`}
    >
      <div className="max-w-7xl mx-auto p-4 md:p-6 bg-white rounded-md shadow-md box-border">
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
