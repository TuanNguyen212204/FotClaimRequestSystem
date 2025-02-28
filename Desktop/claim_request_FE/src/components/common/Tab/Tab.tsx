import React from "react";
import { TabProps } from "@/types/Tab.types";
import styles from "./Tab.module.css";

const Tab: React.FC<TabProps> = ({ tabs, activeTab, onTabClick }) => {
  return (
    <div className={styles.tab}>
      {tabs.map((tab, index) => (
        <div
          key={index}
          className={`${styles.tabItem} ${index === activeTab ? styles.activeTab : ""}`}
          onClick={() => onTabClick(index)}
        >
          {tab}
        </div>
      ))}
    </div>
  );
};

export default Tab;