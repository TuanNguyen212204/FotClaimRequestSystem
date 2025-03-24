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
import { set } from "date-fns";
import { RouteConfig, useRoute } from "@/Hooks/useRoute";
import { ROLES } from "@/enums/ROLES";
import ROLE from "@/constant/role";
export const Sidebar = ({
  setIsCollapsed,
}: {
  setIsCollapsed: (value: boolean) => void;
}) => {
  const [selectedClaim, setSelectedClaim] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed1, setIsCollapsed1] = useState<boolean>(true);
  const [hover, setHover] = useState<boolean>(false);
  const [role, setRole] = useState<typeof ROLE | number>();

  const filterRoutesByRole = (
    routes: RouteConfig[],
    role: number
  ): RouteConfig[] => {
    return routes.reduce((acc: RouteConfig[], route: RouteConfig) => {
      if (route.role?.includes(role)) {
        acc.push(route);
      }
      if (route.children) {
        const filteredChildren = filterRoutesByRole(route.children, role);
        acc.push(...filteredChildren);
      }
      return acc;
    }, []);
  };

  const location = useLocation();
  const currentPath = location.pathname;
  const routes: RouteConfig[] = useRoute();
  // const routeByRole: RouteConfig[] = useRoute().filter((route) =>
  //   route.role?.includes(ROLES.ADMIN)
  // );
  const routeByRole: RouteConfig[] = filterRoutesByRole(
    useRoute(),
    role as number
  );
  console.log(routeByRole);
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
      setRole(ROLE.ADMIN);
    } else if (record === 2) {
      setRole(ROLE.APPROVER);
    } else if (record === 3) {
      setRole(ROLE.FINANCE);
    } else if (record === 4) {
      setRole(ROLE.CLAIMER);
    }
  }, []);

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
    setHover(true);
    console.log(isCollapsed1);
  };

  const closeToggleSideBar = () => {
    setIsCollapsed1(isCollapsed1);
    setIsCollapsed(isCollapsed1);
  };

  const handleHover = () => {
    setHover(true);
    setIsCollapsed1(false);
    setIsCollapsed(false);
  };

  const handleOutHover = () => {
    setHover(false);
    setIsCollapsed1(true);
    setIsCollapsed(true);
  };
  const handleNavigate = (path: string) => {
    navigate(path);
  };
  return (
    <div className={styles.container}>
      <div
        className={`${styles.sidebar} ${isCollapsed1 ? styles.collapsed : ""}`}
      >
        <div className={styles.menu}>
          <ul className={`${styles.claimList} `}>
            {routeByRole.map((route) => (
              <li
                key={route.path}
                className={`${styles.claimItemCollapse} ${
                  selectedClaim === route.path ? styles.active : ""
                } `}
                onClick={() => handleNavigate(route.path as string)}
              >
                <button className={styles.claimButton}>
                  <div className={styles.claimButtonIngredient}>
                    <div
                      className={`${styles.tooltip}`}
                      style={{ cursor: "pointer" }}
                    >
                      {route.icon}
                      <div className={` ${styles.tooltipText} `}>
                        <span>{route.label}</span>
                      </div>
                    </div>{" "}
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div
          style={{
            width: "100%",
            backgroundColor: "red",
            position: "absolute",
            bottom: "0",
          }}
        >
          <div style={{ width: "100%", backgroundColor: "red", bottom: "0" }}>
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
                  <div>
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
