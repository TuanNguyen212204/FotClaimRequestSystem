import { UserInfo } from "../../../pages/UserInfo";
import styles from "./Sidebar.module.css";
import { useState } from "react";

// Các component content tương ứng với từng tab
const DraftComponent = () => (
  <div className={styles.content}>Draft Content</div>
);
const PendingApprovalComponent = () => (
  <div className={styles.content}>Pending Approval Content</div>
);
const ApprovedComponent = () => (
  <div className={styles.content}>Approved Content</div>
);
const PaidComponent = () => <div className={styles.content}>Paid Content</div>;
const RejectedComponent = () => (
  <div className={styles.content}>Rejected Content</div>
);

const StaffInformationComponent = () => (
  <div className={styles.content}>Staff Information Content</div>
);

const ProjectInformationComponent = () => (
  <div className={styles.content}>Project Information Content</div>
);

export const Sidebar = () => {
  const [selectedClaim, setSelectedClaim] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [role, setRole] = useState("user");

  const handleSelect = (claim: string) => {
    setSelectedClaim(claim);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={styles.container}>
      {/* Sidebar */}
      <div
        className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : ""}`}
      >
        <div className={styles.header}>
          <button onClick={toggleSidebar} className={styles.toggleButton}>
            {isCollapsed ? "➤" : "✖"}
          </button>
        </div>

        <div className={styles.logo}>
          <img src="/imgs/logo.png" alt="logo" className={styles.logoImage} />
        </div>

        {/* Conditionally render Create Claims button */}
        {role !== "admin" && (
          <button className={styles.createClaim}>Create Claims</button>
        )}

        <div className={styles.menu}>
          <h3 onClick={toggleMenu} className={styles.claimHeader}>
            {role === "admin" ? "Configuration" : "My Claims"}
            <span className={isOpen ? styles.arrowUp : styles.arrowDown}></span>
          </h3>

          {isOpen && (
            <ul className={styles.claimList}>
              {role === "admin" && (
                <li
                  key="dashboard"
                  className={`${styles.claimItem} ${
                    selectedClaim === "dashboard" ? styles.active : ""
                  }`}
                  onClick={() => handleSelect("dashboard")}
                >
                  {!isCollapsed && "Dashboard"}
                </li>
              )}
              {(role === "admin"
                ? [
                    { key: "staff", label: "Staff Information" },
                    { key: "project", label: "Project Information" },
                  ]
                : [
                    { key: "info", label: "info" },
                    { key: "draft", label: "Draft" },
                    { key: "pending", label: "Pending Approval" },
                    { key: "approved", label: "Approved" },
                    { key: "paid", label: "Paid" },
                    { key: "rejected", label: "Rejected" },
                  ]
              ).map((item) => (
                <li
                  key={item.key}
                  className={`${styles.claimItem} ${
                    selectedClaim === item.key ? styles.active : ""
                  }`}
                  onClick={() => handleSelect(item.key)}
                >
                  {!isCollapsed && item.label}
                </li>
              ))}
            </ul>
          )}
        </div>

        <button className={styles.logout}>Logout</button>
      </div>

      {/* Content Area */}
      <div className={styles.contentContainer}>
        {selectedClaim === "info" && <UserInfo />}
        {selectedClaim === "draft" && <DraftComponent />}
        {selectedClaim === "pending" && <PendingApprovalComponent />}
        {selectedClaim === "approved" && <ApprovedComponent />}
        {selectedClaim === "paid" && <PaidComponent />}
        {selectedClaim === "rejected" && <RejectedComponent />}
        {selectedClaim === "staff" && <StaffInformationComponent />}
        {selectedClaim === "project" && <ProjectInformationComponent />}
      </div>
    </div>
  );
};
