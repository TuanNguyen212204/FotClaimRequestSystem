import React from "react";
import styles from "@pages/CreateClaim/Forms/Create-Claim/Claim.module.css";
import CreateClaim from "@/pages/CreateClaim/Forms/Create-Claim/CreateClaim";
const CreateClaimPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className="flex flex-col box-border">
        <CreateClaim />
      </div>
    </div>
  );
};

export default CreateClaimPage;
