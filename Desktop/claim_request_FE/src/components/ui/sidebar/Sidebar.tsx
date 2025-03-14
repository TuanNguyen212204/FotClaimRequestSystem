import styles from "./Sidebar.module.css";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PATH } from "../../../constant/config";
import fptlogo from "@assets/fot.png";
export const Sidebar = () => {
  const [selectedClaim, setSelectedClaim] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [role, setRole] = useState("user");
  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();
  useEffect(() => {
    const record = String(localStorage.getItem("selectedClaim"));
    if (record) {
      setSelectedClaim(record);
    }
  }, []);
  useEffect(() => {
    const record = Number(localStorage.getItem("role_id"));
    if (record === 1) {
      setRole("admin");
    } else if (record === 2) {
      setRole("approve");
    } else if (record === 3) {
      setRole("finance");
    } else if (record === 4) {
      setRole("user");
    }
  }, []);
  useEffect(() => {
    if (currentPath === PATH.userinfo) {
      setSelectedClaim("userinfo");
    }
  }, [currentPath]);

  const handleSelect = (claim: string) => {
    setSelectedClaim(claim);
    localStorage.setItem("selectedClaim", claim);
    switch (claim) {
      case "createClaim":
        navigate(PATH.createRequest);
        break;
      case "draft":
        navigate(PATH.draft);
        break;
      case "approved":
        navigate(PATH.approvedFinance);
        break;
      case "pending":
        navigate(PATH.pending);
        break;
      case "usersetting":
        navigate(PATH.allUserInformation);
        break;
      case "projectInformation":
        navigate(PATH.projectInformation);
        break;
      case "dashboard": 
        navigate(PATH.dashboard);
        break;
      case "userinfo":
        navigate(PATH.userInfo);
        break;
      case "approvedApprover":
        navigate(PATH.approvedApprover);
        break;
      case "profile":
        navigate(PATH.userInfo);
        break;
      case "pendingClaim":
        navigate(PATH.pending);
        break;
      case "approvedFinance":
        navigate(PATH.approvedFinance);
        break;
      case "paid":
        navigate(PATH.paidClaim);
        break;
      case "all":
        navigate(PATH.myClaims);
        break;
      case "approvedPage":
        navigate(PATH.approvedClaimWithUserID);
        break;
      case "pendingPage":
        navigate(PATH.pendingClaimByUserID);
        break;
      case "rejectedPage":
        navigate(PATH.rejectedClaimWithUserID);
        break;
      default:
        break;
    }
  };
  const handleLogOut = () => {
    localStorage.clear();
    navigate(PATH.login);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleSidebar = () => {
    setIsCollapsed((prev) => !prev);
    console.log("Toggled Sidebar:", !isCollapsed);
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
          <img src={fptlogo} alt="logo" className={styles.logoImage} />
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
          {/* <h3 onClick={toggleMenu} className={styles.claimHeader}>
            {role === "admin"
              ? "Configuration"
              : role === "approve"
              ? "Claims for Approval"
              : role === "finance"
              ? "Finance Claims"
              : "My Claims"}
            <span className={isOpen ? styles.arrowUp : styles.arrowDown}></span>
          </h3> */}

          {
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
                    <button className={styles.claimButton}>
                      {!isCollapsed && "Dashboard"}
                    </button>
                  </li>
                  <li
                    key="projectInformation"
                    className={`${styles.claimItem} ${
                      selectedClaim === "projectInformation" ? styles.active : ""
                    }`}
                    onClick={() => handleSelect("projectInformation")}
                  >
                    <button className={styles.claimButton}>
                      {!isCollapsed && "Project Management"}
                    </button>
                  </li>
                  <li
                    key="usersetting"
                    className={`${styles.claimItem} ${
                      selectedClaim === "usersetting" ? styles.active : ""
                    }`}
                    onClick={() => handleSelect("usersetting")}
                  >
                    <button className={styles.claimButton}>
                      {!isCollapsed && "Staff Information"}
                    </button>
                  </li>
                </>
              )}
              {role === "approve" && (
                <>
                  <li
                    key="pendingClaim"
                    className={`${styles.claimItem} ${
                      selectedClaim === "pendingClaim" ? styles.active : ""
                    }`}
                    onClick={() => handleSelect("pendingClaim")}
                  >
                    <button className={styles.claimButton}>
                      {!isCollapsed && "Pending Claim"}
                    </button>
                  </li>
                  <li
                    key="approvedApprover"
                    className={`${styles.claimItem} ${
                      selectedClaim === "approvedApprover" ? styles.active : ""
                    }`}
                    onClick={() => handleSelect("approvedApprover")}
                  >
                    <button className={styles.claimButton}>
                      {!isCollapsed && "Approved or Paid"}
                    </button>
                  </li>
                  <li
                    key="profile"
                    className={`${styles.claimItem} ${
                      selectedClaim === "profile" ? styles.active : ""
                    }`}
                    onClick={() => handleSelect("profile")}
                  >
                    <button className={styles.claimButton}>
                      {!isCollapsed && "Profile"}
                    </button>
                  </li>
                </>
              )}
              {role === "finance" && (
                <>
                  <li
                    key="approvedFinance"
                    className={`${styles.claimItem} ${
                      selectedClaim === "approvedFinance" ? styles.active : ""
                    }`}
                    onClick={() => handleSelect("approvedFinance")}
                  >
                    <button className={styles.claimButton}>
                      {!isCollapsed && "Approved Claim"}
                    </button>
                  </li>
                  <li
                    key="paid"
                    className={`${styles.claimItem} ${
                      selectedClaim === "paid" ? styles.active : ""
                    }`}
                    onClick={() => handleSelect("paid")}
                  >
                    <button className={styles.claimButton}>
                      {!isCollapsed && "Paid"}
                    </button>
                  </li>
                </>
              )}
              {role === "user" && (
                <>
                  {/* <li
                    key="draft"
                    className={`${styles.claimItem} ${
                      selectedClaim === "draft" ? styles.active : ""
                    }`}
                    onClick={() => handleSelect("draft")}
                  >
                    <button className={styles.claimButton}>
                      {!isCollapsed && "Draft"}
                    </button>
                  </li> */}
                  <li
                    key="all"
                    className={`${styles.claimItem} ${
                      selectedClaim === "all" ? styles.active : ""
                    }`}
                    onClick={() => handleSelect("all")}
                  >
                    <button className={styles.claimButton}>
                      {!isCollapsed && "All Claim"}
                    </button>
                  </li>
                  <li
                    key="pendingPage"
                    className={`${styles.claimItem} ${
                      selectedClaim === "pendingPage" ? styles.active : ""
                    }`}
                    onClick={() => handleSelect("pendingPage")}
                  >
                    <button className={styles.claimButton}>
                      {!isCollapsed && "Pending Claim"}
                    </button>
                  </li>
                  <li
                    key="approvedPage"
                    className={`${styles.claimItem} ${
                      selectedClaim === "approvedPage" ? styles.active : ""
                    }`}
                    onClick={() => handleSelect("approvedPage")}
                  >
                    <button className={styles.claimButton}>
                      {!isCollapsed && "Approved Claim"}
                    </button>
                  </li>
                  {/* <li
                    key="paid"
                    className={`${styles.claimItem} ${
                      selectedClaim === "paid" ? styles.active : ""
                    }`}
                    onClick={() => handleSelect("paid")}
                  >
                    <button className={styles.claimButton}>
                      {!isCollapsed && "Paid Claim"}
                    </button>
                  </li> */}
                  <li
                    key="rejectedPage"
                    className={`${styles.claimItem} ${
                      selectedClaim === "rejectedPage" ? styles.active : ""
                    }`}
                    onClick={() => handleSelect("rejectedPage")}
                  >
                    <button className={styles.claimButton}>
                      {!isCollapsed && "Rejected Claim"}
                    </button>
                  </li>
                  <li
                    key="profile"
                    className={`${styles.claimItem} ${
                      selectedClaim === "profile" ? styles.active : ""
                    }`}
                    onClick={() => handleSelect("profile")}
                  >
                    <button className={styles.claimButton}>
                      {!isCollapsed && "Your Profile"}
                    </button>
                  </li>
                </>
              )}
            </ul>
          }
        </div>
        <button className={styles.logout} onClick={() => handleLogOut()}>
          Logout
        </button>
      </div>
    </div>
  );
};
