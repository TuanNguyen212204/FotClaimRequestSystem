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
// import { RouteConfig, useRoute } from "@/Hooks/useRoute";
import { ROLES } from "@/enums/ROLES";
import RouteConfig from "@/types/Route";
import { PRIVATE_ROUTE } from "@/constant/routeConfig";
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

      return acc;
    }, []);
  };

  const location = useLocation();
  const currentPath = location.pathname;

  // const routeByRole: RouteConfig[] = useRoute().filter((route) =>
  //   route.role?.includes(ROLES.ADMIN)
  // );
  const route: RouteConfig[] = PRIVATE_ROUTE.filter(
    (route) => route.protected === true
  );
  const routeByRole: RouteConfig[] = filterRoutesByRole(route, role as number);
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

  const handleNavigate = (path: string) => {
    setSelectedClaim(path);
    localStorage.setItem("selectedClaim", path);
    navigate(path);
  };
  return (
    <div>
      <div className={`${styles.sidebar} `}>
        <div className={styles.claimItemCollapse}>
          <ul className={`${styles.claimList} `}>
            {routeByRole.map((route) => (
              <li
                key={route.path}
                // className={`${styles.claimItemCollapse} ${styles.tooltip} ${
                //   selectedClaim === route.path ? styles.active : ""
                // } mt-2`}
                className={`${styles.tooltip} my-4`}
                style={{ backgroundColor: "#34495e" }}
                onClick={() => handleNavigate(route.path as string)}
              >
                <button className={` ${styles.claimButton} `}>
                  <div
                    className={styles.claimButtonIngredient}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <div
                      className={`${
                        selectedClaim === route.path ? styles.active : ""
                      }`}
                    >
                      <span>{route.icon}</span>
                    </div>
                    <div className={` ${styles.tooltipText}  `}>
                      <span>{route.label}</span>
                    </div>
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
            <button
              className={`${styles.logoutCollapse}`}
              onClick={() => handleLogOut()}
            >
              <div className="mr-2">
                <LogOut size={20} />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
