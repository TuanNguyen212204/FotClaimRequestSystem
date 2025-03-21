import { Outlet } from "react-router-dom";
import Header from "../ui/header/Header";
import { Sidebar } from "../ui/sidebar/Sidebar";
import styles from "./MainLayout.module.css"; // Dùng CSS Module để quản lý styles
import { useState } from "react";
export const MainLayout = () => {
  const [isCollapse, setIsCollapsed] = useState<boolean>(true);
  return (
    <div className={styles.layout}>
      <Header />
      <div className={styles.mainContent}>
        <Sidebar setIsCollapsed={setIsCollapsed} />
        <div
          className={styles.outletContainer}
          style={{
            marginLeft: isCollapse ? "80px" : "320px",
            transition: "margin-left 0.5s linear",
          }}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};
