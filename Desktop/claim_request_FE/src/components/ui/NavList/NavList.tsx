import styles from "./NavList.module.css";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PATH } from "../../../constant/config";

interface NavItem {
  to: string;
  roles: string[];
  title: string;
  key: string;
}

const listNav: NavItem[] = [
  {
    to: PATH.createRequest,
    roles: ['user'],
    title: 'Create Claims',
    key: 'createClaim'
  },
  {
    to: PATH.draft,
    roles: ['user'],
    title: 'Draft',
    key: 'draft'
  },
  {
    to: PATH.pending,
    roles: ['user'],
    title: 'Pending Approval',
    key: 'pending'
  },
  {
    to: PATH.approvedFinance,
    roles: ['user', 'finance'],
    title: 'Approved',
    key: 'approved'
  },
  {
    to: PATH.paidClaim,
    roles: ['user', 'finance'],
    title: 'Paid',
    key: 'paid'
  },
  {
    to: PATH.projectInformation,
    roles: ['admin'],
    title: 'Project Information',
    key: 'project'
  },
  {
    to: PATH.staffInformation,
    roles: ['admin'],
    title: 'Staff Information',
    key: 'staff'
  }
];

export const NavList = () => {
  const [selectedClaim, setSelectedClaim] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [role, setRole] = useState("user");

  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();

  useEffect(() => {
    if (currentPath === PATH.userInfo) {
      setSelectedClaim("userinfo");
    }
  }, [currentPath]);

  const handleSelect = (claim: string) => {
    setSelectedClaim(claim);
    const navItem = listNav.find(item => item.key === claim);
    if (navItem) {
      navigate(navItem.to);
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
      <div className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : ""}`}>
        <div className={styles.header}>
          <button onClick={toggleSidebar} className={styles.toggleButton}>
            {isCollapsed ? "➤" : "✖"}
          </button>
        </div>

        <div className={styles.logo}>
          <img src="/imgs/logo.png" alt="logo" className={styles.logoImage} />
        </div>

        {/* Create Claims button */}
        {listNav
          .filter(item => item.key === 'createClaim' && item.roles.includes(role))
          .map(item => (
            <button
              key={item.key}
              onClick={() => handleSelect(item.key)}
              className={styles.createClaim}
            >
              {item.title}
            </button>
          ))}

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
              {listNav
                .filter(item => item.key !== 'createClaim' && item.roles.includes(role))
                .map(item => (
                  <li
                    key={item.key}
                    className={`${styles.claimItem} ${
                      selectedClaim === item.key ? styles.active : ""
                    }`}
                    onClick={() => handleSelect(item.key)}
                  >
                    {!isCollapsed && item.title}
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
