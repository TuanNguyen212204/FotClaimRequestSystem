import { Outlet } from "react-router-dom";
import Header from "./header/Header";
import { Sidebar } from "../ui/sidebar/Sidebar";
import styles from "./MainLayout.module.css"; // Dùng CSS Module để quản lý styles

export const MainLayout = () => {
  return (
    <div className={styles.layout}>
      <Header />
      <div className={styles.mainContent}>
        <Sidebar />
        <div className={styles.outletContainer}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};
