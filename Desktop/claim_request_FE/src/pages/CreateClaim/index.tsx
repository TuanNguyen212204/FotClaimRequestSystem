import React from "react";
import CreateClaim from "@/pages/CreateClaim/Components/Create-Claim/CreateClaim";
import { FormData } from "@/types/claimForm.type";
import { ArrowLeft } from "lucide-react";
import { useTranslation } from "react-i18next";
export interface CreateClaimPageProps {
  mode: "create" | "view" | "update";
  initialValues?: FormData;
  formStatus: "Draft" | "Pending" | "Approved" | "Rejected" | "Paid";
  requestID?: string;
  onReturn?: () => void;
}

const CreateClaimPage: React.FC<CreateClaimPageProps> = ({
  mode = "create",
  initialValues,
  formStatus = "Draft",
  requestID,
  onReturn,
}) => {
  const { t } = useTranslation("claim");
  return (
    <div
      className={`box-border overflow-auto bg-gray-100 p-4 font-['Roboto'] leading-relaxed text-gray-800 md:p-6`}
    >
      <div className="mx-auto box-border max-w-7xl rounded-md bg-white p-4 shadow-md md:p-6">
        {onReturn && (
          <button
            onClick={onReturn}
            className="mb-4 flex items-center rounded-md border border-gray-300 bg-white px-3 py-1 text-sm text-gray-700 shadow-sm hover:bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none"
            aria-label="Return to table"
          >
            <ArrowLeft size={16} className="mr-1" />
            {t("buttons.GoBack")}
          </button>
        )}

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
