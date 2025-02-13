import styles from "./Sidebar.module.css";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PATH } from "../../../constant/config";

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
      case "draft":
        navigate(PATH.draft);
        break;
      // case "pending":
      //   navigate(PATH.pending);
      //   break;
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
    </div>
  );
};
