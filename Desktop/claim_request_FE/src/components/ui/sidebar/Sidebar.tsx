import styles from "./Sidebar.module.css";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PATH } from "@constant/config";

export const Sidebar = () => {
  const [selectedClaim, setSelectedClaim] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [role, setRole] = useState("user");

  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();

  useEffect(() => {
    if (currentPath === PATH.userinfo) {
      setSelectedClaim("userinfo");
    }
  }, [currentPath]);

  const handleSelect = (claim: string) => {
    setSelectedClaim(claim);
    switch (claim) {
      case "createClaim":
        navigate(PATH.createRequest);
        break;
      case "draft":
        navigate(PATH.draft);
        break;
      // case "pending":
      //   navigate(PATH.pending);
      //   break;
      case "approved":
        navigate(PATH.approved);
        break;
      case "pending":
        navigate(PATH.pending);
        break;
      // case "approved":
      //   navigate(PATH.approved);
      //   break;
      // case "paid":
      //   navigate(PATH.paid);
      //   break;
      // case "rejected":
      //   navigate(PATH.rejected);
      //   break;
      // case "staff":
      //   navigate(PATH.staff);
      //   break;
      // case "project":
      //   navigate(PATH.project);
      //   break;
      case "userinfo":
        navigate(PATH.userinfo);
        break;
      default:
        break;
    }
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
          <img src="/imgs/FOT.jpg" alt="logo" className={styles.logoImage} />
        </div>

        {/* Bỏ nút Create Claims nếu vai trò là approve hoặc finance */}
        {role !== "approve" && role !== "finance" && role !== "admin" && (
          <button
            onClick={() => {
              handleSelect("createClaim");
            }}
            className={styles.createClaim}
          >
            Create Claims
          </button>
        )}

        <div className={styles.menu}>
          <h3 onClick={toggleMenu} className={styles.claimHeader}>
            {role === "admin"
              ? "Configuration"
              : role === "approve"
              ? "Claims for Approval"
              : role === "finance"
              ? "Finance Claims"
              : "My Claims"}
            <span className={isOpen ? styles.arrowUp : styles.arrowDown}></span>
          </h3>

          {isOpen && (
            <ul className={styles.claimList}>
              {role === "admin" && (
                <>
                  <li
                    key="dashboard"
                    className={`${styles.claimItem} ${
                      selectedClaim === "dashboard" ? styles.active : ""
                    }`}
                    onClick={() => handleSelect("dashboard")}
                  >
                    {!isCollapsed && "Dashboard"}
                  </li>
                  <li
                    key="configuration"
                    className={`${styles.claimItem} ${
                      selectedClaim === "configuration" ? styles.active : ""
                    }`}
                    onClick={() => handleSelect("configuration")}
                  >
                    {!isCollapsed && "Configuration"}
                  </li>
                </>
              )}
              {role === "approve" && (
                <>
                  <li
                    key="vetting"
                    className={`${styles.claimItem} ${
                      selectedClaim === "vetting" ? styles.active : ""
                    }`}
                    onClick={() => handleSelect("vetting")}
                  >
                    {!isCollapsed && "For My Vetting"}
                  </li>
                  <li
                    key="approved_paid"
                    className={`${styles.claimItem} ${
                      selectedClaim === "approved_paid" ? styles.active : ""
                    }`}
                    onClick={() => handleSelect("approved_paid")}
                  >
                    {!isCollapsed && "Approved or Paid"}
                  </li>
                  <li
                    key="employee_profile"
                    className={`${styles.claimItem} ${
                      selectedClaim === "employee_profile" ? styles.active : ""
                    }`}
                    onClick={() => handleSelect("employee_profile")}
                  >
                    {!isCollapsed && "Employee Profile"}
                  </li>
                </>
              )}
              {role === "finance" && (
                <>
                  <li
                    key="approved"
                    className={`${styles.claimItem} ${
                      selectedClaim === "approved" ? styles.active : ""
                    }`}
                    onClick={() => handleSelect("approved")}
                  >
                    {!isCollapsed && "Approved"}
                  </li>
                  <li
                    key="paid"
                    className={`${styles.claimItem} ${
                      selectedClaim === "paid" ? styles.active : ""
                    }`}
                    onClick={() => handleSelect("paid")}
                  >
                    {!isCollapsed && "Paid"}
                  </li>
                </>
              )}
              {role === "user" && (
                <>
                  <li
                    key="draft"
                    className={`${styles.claimItem} ${
                      selectedClaim === "draft" ? styles.active : ""
                    }`}
                    onClick={() => handleSelect("draft")}
                  >
                    {!isCollapsed && "Draft"}
                  </li>
                  <li
                    key="pending"
                    className={`${styles.claimItem} ${
                      selectedClaim === "pending" ? styles.active : ""
                    }`}
                    onClick={() => handleSelect("pending")}
                  >
                    {!isCollapsed && "Pending Approval"}
                  </li>
                  <li
                    key="approved"
                    className={`${styles.claimItem} ${
                      selectedClaim === "approved" ? styles.active : ""
                    }`}
                    onClick={() => handleSelect("approved")}
                  >
                    {!isCollapsed && "Approved"}
                  </li>
                  <li
                    key="paid"
                    className={`${styles.claimItem} ${
                      selectedClaim === "paid" ? styles.active : ""
                    }`}
                    onClick={() => handleSelect("paid")}
                  >
                    {!isCollapsed && "Paid"}
                  </li>
                  <li
                    key="rejected"
                    className={`${styles.claimItem} ${
                      selectedClaim === "rejected" ? styles.active : ""
                    }`}
                    onClick={() => handleSelect("rejected")}
                  >
                    {!isCollapsed && "Rejected"}
                  </li>
                </>
              )}
            </ul>
          )}
        </div>

        <button className={styles.logout}>Logout</button>
      </div>
    </div>
  );
};
