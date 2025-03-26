import React from "react";
import styles from "@pages/CreateClaim/Claim.module.css";
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
    <div className={styles.container}>
      <div className="flex flex-col box-border">
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
// const stuff = {
//   currentSelectedProject: {
//     projectID: "P123",
//     projectName: "Web Development for Client X",
//     RoleInTheProject: "Frontend Developer",
//     ProjectDuration: {
//       from: "2025-01-15",
//       to: "2025-06-30",
//     },
//   },
//   claims: [
//     {
//       date: "2023-02-11",
//       working_hours: 8,
//     },
//     {
//       date: "2023-02-12",
//       working_hours: 7.5,
//     },
//     {
//       date: "2023-02-13",
//       working_hours: 8.5,
//     },
//     {
//       date: "2023-03-15",
//       working_hours: 6,
//     },
//     {
//       date: "2023-03-16",
//       working_hours: 8,
//     },
//     {
//       date: "2023-04-01",
//       working_hours: 9,
//     },
//   ],
// };
