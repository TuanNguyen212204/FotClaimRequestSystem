import { useState, useEffect } from "react";
import styles from "./DashboardHeader.module.css";

const DashboardHeader = () => {
  const [dateTime, setDateTime] = useState(new Date());
  const username = localStorage.getItem("username");

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formattedDate = dateTime.toLocaleDateString("en-US", {
    weekday: "long", 
    day: "2-digit",  
    month: "long",   
    year: "numeric"  
  });

  return (
    <div className="flex justify-between items-center mb-12">

      <div>
        <h3 className="text-2xl font-semibold">Welcome Back, {username}! </h3>
        <h4 className="text-gray-600">Track, manage, and forecast your staff and projects.</h4>
      </div>

      <div className="text-right">
        <h4 className="text-lg font-bold text-gray-800">{dateTime.toLocaleTimeString()}</h4>
        <p className="text-sm text-gray-600">{formattedDate}</p>
      </div>
    </div>
  );
};

export default DashboardHeader;
