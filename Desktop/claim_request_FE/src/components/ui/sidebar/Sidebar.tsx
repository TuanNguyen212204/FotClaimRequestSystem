import styles from "./Sidebar.module.css";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PATH } from "../../../constant/config";
import { ROLES } from "@/enums/ROLES";
import RouteConfig from "@/types/Route";
import { PRIVATE_ROUTE } from "@/constant/routeConfig";
import ROLE from "@/constant/role";
import { useTranslation } from "react-i18next";
import { record } from "zod";

export const Sidebar = ({
  setIsCollapsed,
}: {
  setIsCollapsed: (value: boolean) => void;
}) => {
  const [selectedClaim, setSelectedClaim] = useState<string | null>();
  useEffect(() => {
    console.log(selectedClaim);
  }, [selectedClaim]);
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed1, setIsCollapsed1] = useState<boolean>(true);
  const [hover, setHover] = useState<boolean>(false);
  const [role, setRole] = useState<typeof ROLE | number>();
  const { t } = useTranslation();

  const filterRoutesByRole = (
    routes: RouteConfig[],
    role: number,
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

  const route: RouteConfig[] = PRIVATE_ROUTE.filter(
    (route) => route.protected === true,
  );
  const routeByRole: RouteConfig[] = filterRoutesByRole(route, role as number);
  const navigate = useNavigate();
  useEffect(() => {
    const record = localStorage.getItem("selectedClaim");
    if (record) {
      setSelectedClaim(record);
    }
  }, []);

  useEffect(() => {
    const role = Number(localStorage.getItem("role_id"));
    setRole(role);
    const savedClaim = localStorage.getItem("selectedClaim");
    if (savedClaim) {
      setSelectedClaim(savedClaim);
      return;
    }
    switch (role) {
      case ROLE.ADMIN:
        setSelectedClaim(PATH.allUserInformation as string);

        break;
      case ROLE.APPROVER:
        setSelectedClaim(PATH.pending as string);
        break;
      case ROLE.FINANCE:
        setSelectedClaim(PATH.approvedFinance as string);
        break;
      case ROLE.CLAIMER:
        setSelectedClaim(PATH.myClaims as string);
        break;
      default:
        break;
    }
  }, []);

  const handleNavigate = (path: string) => {
    setSelectedClaim(path);
    localStorage.setItem("selectedClaim", path);
    navigate(path);
  };

  return (
    <div>
      <div className={`${styles.sidebar}`}>
        <div className={`${styles.claimItemCollapse}`}>
          <ul className={`${styles.claimList}`}>
            {routeByRole.map((route, index) => (
              <li
                key={index}
                className={`${styles.tooltip} ${styles.claimItem} ${
                  selectedClaim === route.path ? styles.active : ""
                }`}
                onClick={() => handleNavigate(route.path as string)}
              >
                <div className={` ${styles.claimButton}`}>
                  <div
                    className={`${styles.claimButtonIngredient} ${styles.icon} `}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <div>
                      <span>{route.icon}</span>
                    </div>
                    <div className={` ${styles.tooltipText}`}>
                      <span>{route.label}</span>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
