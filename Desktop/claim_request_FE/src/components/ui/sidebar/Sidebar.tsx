import styles from "./Sidebar.module.css";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PATH } from "../../../constant/config";
import fptlogo from "@assets/fot.png";
import { ArrowDown, ChevronRight, House } from "lucide-react";
import { BriefcaseBusiness } from "lucide-react";
import { Smile } from "lucide-react";
import { StepBack } from "lucide-react";
import { MdOutlinePendingActions } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { UserPen } from "lucide-react";
import { ChevronLeft } from "lucide-react";
import { ArrowUp } from "lucide-react";
import { LogOut } from "lucide-react";
import { Menu } from "lucide-react";
import { MdPaid } from "react-icons/md";
import { Compass } from "lucide-react";
import { CircleX } from "lucide-react";
import { Pencil } from "lucide-react";
import { Plus } from "lucide-react";
export const Sidebar = ({
  setIsCollapsed,
}: {
  setIsCollapsed: (value: boolean) => void;
}) => {
  const [selectedClaim, setSelectedClaim] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed1, setIsCollapsed1] = useState<boolean>(true);
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
      case "rejected":
        navigate(PATH.rejectedClaim);
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
    setIsCollapsed1(!isCollapsed1);
    setIsCollapsed(!isCollapsed1);
    console.log(isCollapsed1);
  };

  return (
    <div className={styles.container}>
      <div
        className={`${styles.sidebar} ${isCollapsed1 ? styles.collapsed : ""}`}
      >
        <div
          className={`${isCollapsed1 ? styles.headerCollapse : styles.header}`}
        >
          <div>
            <button onClick={toggleSidebar} className={styles.toggleButton}>
              <span>
                <Menu />
              </span>
            </button>
          </div>
        </div>

        {role !== "approve" && role !== "finance" && role !== "admin" && (
          <button
            onClick={() => {
              handleSelect("createClaim");
            }}
            className={`${
              isCollapsed1 ? styles.createClaimCollapse : styles.createClaim
            }`}
          >
            {!isCollapsed1 && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  padding: "2px",
                  marginTop: "2px",
                }}
              >
                <div>
                  <span className={styles.iconInClaimButton_1}>
                    <Plus />
                  </span>
                </div>
                <div className={styles.iconInClaimButton_2}>
                  <span> Create Claims</span>
                </div>
              </div>
            )}
            {isCollapsed1 && (
              <div>
                <Plus size={20} />
              </div>
            )}
          </button>
        )}

        <div className={styles.menu}>
          {/* {!isCollapsed1 && (
            <button onClick={toggleMenu} className={styles.claimHeader}>
              <span className={styles.menuText}>
                {role === "admin"
                  ? "Menu"
                  : role === "approve"
                  ? "Claims for Approval"
                  : role === "finance"
                  ? "Finance Claims"
                  : "My Claims"}
              </span>
            </button>
          )}
          {isCollapsed1 && (
            <button onClick={toggleMenu} className={styles.claimHeader}>
              <span className={styles.menuTextCollapse}>
                <Menu />
              </span>
            </button>
          )} */}
          {
            <ul
              className={`${styles.claimList} ${
                isCollapsed1 ? styles.claimListCollapse : ""
              }`}
            >
              {role === "admin" && (
                <div>
                  <li
                    key="dashboard"
                    className={`${
                      isCollapsed1 ? styles.claimItemCollapse : styles.claimItem
                    } ${selectedClaim === "dashboard" ? styles.active : ""} `}
                    onClick={() => handleSelect("dashboard")}
                  >
                    <button
                      className={`${styles.claimButton} ${
                        isCollapsed1 ? styles.claimButtonCollapse : ""
                      }`}
                    >
                      {!isCollapsed1 && (
                        <div className={styles.claimButtonIngredient}>
                          <div className={styles.iconInClaimButton_1}>
                            <House size={20} />
                          </div>{" "}
                          <div className={styles.iconInClaimButton_2}>
                            <span>Dashboard</span>
                          </div>
                        </div>
                      )}
                      {isCollapsed1 && (
                        <div>
                          <House size={20} />
                        </div>
                      )}
                    </button>
                  </li>
                  <li
                    key="projectInformation"
                    className={`${
                      isCollapsed1 ? styles.claimItemCollapse : styles.claimItem
                    } ${
                      selectedClaim === "projectInformation"
                        ? styles.active
                        : ""
                    }`}
                    onClick={() => handleSelect("projectInformation")}
                  >
                    <button className={styles.claimButton}>
                      {!isCollapsed1 && (
                        <div className={styles.claimButtonIngredient}>
                          <div className={styles.iconInClaimButton_1}>
                            <BriefcaseBusiness size={20} />
                          </div>{" "}
                          <div className={styles.iconInClaimButton_2}>
                            <span>Project</span>
                          </div>
                        </div>
                      )}
                      {isCollapsed1 && <BriefcaseBusiness size={20} />}
                    </button>
                  </li>
                  <li
                    key="usersetting"
                    className={`${
                      isCollapsed1 ? styles.claimItemCollapse : styles.claimItem
                    } ${selectedClaim === "usersetting" ? styles.active : ""} `}
                    onClick={() => handleSelect("usersetting")}
                  >
                    <button className={styles.claimButton}>
                      {!isCollapsed1 && (
                        <div className={styles.claimButtonIngredient}>
                          <div className={styles.iconInClaimButton_1}>
                            <Smile size={20} />
                          </div>{" "}
                          <div className={styles.iconInClaimButton_2}>
                            <span>Staff </span>
                          </div>
                        </div>
                      )}
                      {isCollapsed1 && <Smile size={20} />}
                    </button>
                  </li>
                </div>
              )}
              {role === "approve" && (
                <>
                  <li
                    key="pendingClaim"
                    className={`${
                      isCollapsed1 ? styles.claimItemCollapse : styles.claimItem
                    } ${
                      selectedClaim === "pendingClaim" ? styles.active : ""
                    } `}
                    onClick={() => handleSelect("pendingClaim")}
                  >
                    <button className={styles.claimButton}>
                      {!isCollapsed1 && (
                        <div className={styles.claimButtonIngredient}>
                          <div className={styles.iconInClaimButton_1}>
                            <MdOutlinePendingActions />z
                          </div>{" "}
                          <div className={styles.iconInClaimButton_2}>
                            <span>Pending Claim</span>
                          </div>
                        </div>
                      )}
                      {isCollapsed1 && <MdOutlinePendingActions size={20} />}
                    </button>
                  </li>
                  <li
                    key="approvedApprover"
                    className={`${
                      isCollapsed1 ? styles.claimItemCollapse : styles.claimItem
                    } ${
                      selectedClaim === "approvedApprover" ? styles.active : ""
                    } `}
                    onClick={() => handleSelect("approvedApprover")}
                  >
                    <button className={styles.claimButton}>
                      {!isCollapsed1 && (
                        <div className={styles.claimButtonIngredient}>
                          <div className={styles.iconInClaimButton_1}>
                            <FaCheck />
                          </div>
                          <div className={styles.iconInClaimButton_2}>
                            <span>Approved Claim</span>
                          </div>
                        </div>
                      )}
                      {isCollapsed1 && <FaCheck size={20} />}
                    </button>
                  </li>
                  <li
                    key="rejected"
                    className={`${
                      isCollapsed1 ? styles.claimItemCollapse : styles.claimItem
                    } ${selectedClaim === "rejected" ? styles.active : ""} `}
                    onClick={() => handleSelect("rejected")}
                  >
                    <button className={styles.claimButton}>
                      {!isCollapsed1 && (
                        <div className={styles.claimButtonIngredient}>
                          <div className={styles.iconInClaimButton_1}>
                            <CircleX />
                          </div>
                          <div className={styles.iconInClaimButton_2}>
                            <span>Rejected Claim</span>
                          </div>
                        </div>
                      )}
                      {isCollapsed1 && <CircleX size={20} />}
                    </button>
                  </li>
                  <li
                    key="profile"
                    className={`${
                      isCollapsed1 ? styles.claimItemCollapse : styles.claimItem
                    } ${selectedClaim === "profile" ? styles.active : ""} `}
                    onClick={() => handleSelect("profile")}
                  >
                    <button className={styles.claimButton}>
                      {!isCollapsed1 && (
                        <div className={styles.claimButtonIngredient}>
                          <div className={styles.iconInClaimButton_1}>
                            <UserPen size={20} />
                          </div>
                          <div className={styles.iconInClaimButton_2}>
                            <span>Profile</span>
                          </div>
                        </div>
                      )}
                      {isCollapsed1 && <UserPen />}
                    </button>
                  </li>
                </>
              )}
              {role === "finance" && (
                <>
                  <li
                    key="approvedFinance"
                    className={`${
                      isCollapsed1 ? styles.claimItemCollapse : styles.claimItem
                    } ${
                      selectedClaim === "approvedFinance" ? styles.active : ""
                    } `}
                    onClick={() => handleSelect("approvedFinance")}
                  >
                    <button className={styles.claimButton}>
                      {!isCollapsed1 && (
                        <div className={styles.claimButtonIngredient}>
                          <div className={styles.iconInClaimButton_1}>
                            <FaCheck size={20} />
                          </div>
                          <div className={styles.iconInClaimButton_2}>
                            <span>Approved Claim</span>
                          </div>
                        </div>
                      )}
                      {isCollapsed1 && <FaCheck size={20} />}
                    </button>
                  </li>
                  <li
                    key="paid"
                    className={`${
                      isCollapsed1 ? styles.claimItemCollapse : styles.claimItem
                    } ${selectedClaim === "paid" ? styles.active : ""} `}
                    onClick={() => handleSelect("paid")}
                  >
                    <button className={styles.claimButton}>
                      {!isCollapsed1 && (
                        <div className={styles.claimButtonIngredient}>
                          <div className={styles.iconInClaimButton_1}>
                            <MdPaid size={20} />
                          </div>
                          <div className={styles.iconInClaimButton_2}>
                            <span>Paid Claim</span>
                          </div>
                        </div>
                      )}
                      {isCollapsed1 && <MdPaid size={20} />}
                    </button>
                  </li>
                </>
              )}
              {role === "user" && (
                <>
                  <li
                    key="draft"
                    className={`${
                      isCollapsed1 ? styles.claimItemCollapse : styles.claimItem
                    } ${selectedClaim === "draft" ? styles.active : ""} `}
                    onClick={() => handleSelect("draft")}
                  >
                    <button className={styles.claimButton}>
                      {!isCollapsed1 && (
                        <div className={styles.claimButtonIngredient}>
                          <div className={styles.iconInClaimButton_1}>
                            <Pencil />
                          </div>{" "}
                          <div className={styles.iconInClaimButton_2}>
                            <span>Draft Claim</span>
                          </div>
                        </div>
                      )}
                      {isCollapsed1 && <Pencil size={20} />}
                    </button>
                  </li>
                  <li
                    key="all"
                    className={`${
                      isCollapsed1 ? styles.claimItemCollapse : styles.claimItem
                    } ${selectedClaim === "all" ? styles.active : ""} `}
                    onClick={() => handleSelect("all")}
                  >
                    <button className={styles.claimButton}>
                      {!isCollapsed1 && (
                        <div className={styles.claimButtonIngredient}>
                          <div className={styles.iconInClaimButton_1}>
                            <Compass />
                          </div>{" "}
                          <div className={styles.iconInClaimButton_2}>
                            <span>All Claim</span>
                          </div>
                        </div>
                      )}
                      {isCollapsed1 && <Compass size={20} />}
                    </button>
                  </li>
                  <li
                    key="pendingPage"
                    className={`${
                      isCollapsed1 ? styles.claimItemCollapse : styles.claimItem
                    } ${selectedClaim === "pendingPage" ? styles.active : ""} `}
                    onClick={() => handleSelect("pendingPage")}
                  >
                    <button className={styles.claimButton}>
                      {!isCollapsed1 && (
                        <div className={styles.claimButtonIngredient}>
                          <div className={styles.iconInClaimButton_1}>
                            <MdOutlinePendingActions />
                          </div>{" "}
                          <div className={styles.iconInClaimButton_2}>
                            <span>Pending Claim</span>
                          </div>
                        </div>
                      )}
                      {isCollapsed1 && <MdOutlinePendingActions size={20} />}
                    </button>
                  </li>
                  <li
                    key="approvedPage"
                    className={`${
                      isCollapsed1 ? styles.claimItemCollapse : styles.claimItem
                    } ${
                      selectedClaim === "approvedPage" ? styles.active : ""
                    } `}
                    onClick={() => handleSelect("approvedPage")}
                  >
                    <button className={styles.claimButton}>
                      {!isCollapsed1 && (
                        <div className={styles.claimButtonIngredient}>
                          <div className={styles.iconInClaimButton_1}>
                            <FaCheck />
                          </div>
                          <div className={styles.iconInClaimButton_2}>
                            <span>Approved Claim</span>
                          </div>
                        </div>
                      )}
                      {isCollapsed1 && <FaCheck size={20} />}
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
                    className={`${
                      isCollapsed1 ? styles.claimItemCollapse : styles.claimItem
                    } ${
                      selectedClaim === "rejectedPage" ? styles.active : ""
                    } `}
                    onClick={() => handleSelect("rejectedPage")}
                  >
                    <button className={styles.claimButton}>
                      {!isCollapsed1 && (
                        <div className={styles.claimButtonIngredient}>
                          <div className={styles.iconInClaimButton_1}>
                            <CircleX />
                          </div>
                          <div className={styles.iconInClaimButton_2}>
                            <span>Rejected Claim</span>
                          </div>
                        </div>
                      )}
                      {isCollapsed1 && <CircleX size={20} />}
                    </button>
                  </li>
                  <li
                    key="profile"
                    className={`${
                      isCollapsed1 ? styles.claimItemCollapse : styles.claimItem
                    } ${selectedClaim === "profile" ? styles.active : ""} `}
                    onClick={() => handleSelect("profile")}
                  >
                    <button className={styles.claimButton}>
                      {!isCollapsed1 && (
                        <div className={styles.claimButtonIngredient}>
                          <div className={styles.iconInClaimButton_1}>
                            <UserPen size={20} />
                          </div>
                          <div className={styles.iconInClaimButton_2}>
                            <span>Profile</span>
                          </div>
                        </div>
                      )}
                      {isCollapsed1 && <UserPen />}
                    </button>
                  </li>
                </>
              )}
            </ul>
          }
        </div>
        <div>
          <div>
            {isCollapsed1 && (
              <button
                className={`${
                  isCollapsed1 ? styles.logoutCollapse : styles.logout
                }`}
                onClick={() => handleLogOut()}
              >
                <LogOut size={20} />
              </button>
            )}
            {!isCollapsed1 && (
              <button
                className={`${
                  isCollapsed1 ? styles.logoutCollapse : styles.logout
                }`}
                onClick={() => handleLogOut()}
              >
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <div>
                    <span>Log Out</span>
                  </div>
                  <div style={{ marginLeft: "10px", marginTop: "2px" }}>
                    <span>
                      <LogOut size={20} />
                    </span>
                  </div>
                </div>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
