import { useState, useEffect, useMemo } from "react";
import Calendar from "react-calendar";
import { Clock } from "lucide-react";
import "react-calendar/dist/Calendar.css";
import styles from "./DashboardHeader.module.css";
import { useTranslation } from "react-i18next";

const DashboardHeader: React.FC = () => {
  const [dateTime, setDateTime] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [closing, setClosing] = useState<boolean>(false);
  const { t, i18n } = useTranslation("dashboard");

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (showCalendar) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showCalendar]);

  useEffect(() => {
    console.log("Language changed to:", i18n.language);
  }, [i18n.language]);

  const formatDate = (date: Date): string => {
    const language = i18n.language; 
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    const weekday = date.toLocaleDateString(
      language === "en" ? "en-US" : "vi-VN",
      { weekday: "long" },
    );


    const dateFormat =
      language === "en" ? `${month}/${day}/${year}` : `${day}/${month}/${year}`;
    return `${weekday}, ${dateFormat}`;
  };

  const formattedDate: string = useMemo(
    () => formatDate(dateTime),
    [dateTime, i18n.language],
  );

  const closeModal = () => {
    setClosing(true);
    setTimeout(() => {
      setShowCalendar(false);
      setClosing(false);
    }, 300);
  };

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLDivElement).classList.contains(styles.calendarModal)) {
      closeModal();
    }
  };

  return (
    <div className={styles.container}>
      <div>
        <h3 className={styles.username}>{t("dashboard.title")}, User!</h3>
        <h4 className={styles.subtitle}>{t("dashboard.subTitle")}</h4>
      </div>

      <div className={styles.box} onClick={() => setShowCalendar(true)}>
        <h4 className={styles.time}>
          <Clock size={16} className={styles.clockIcon} />{" "}
          {dateTime.toLocaleTimeString()}
        </h4>
        <p className={styles.date}>{formattedDate}</p>
      </div>

      {showCalendar && (
        <div
          className={`${styles.calendarModal} ${closing ? styles.closing : ""}`}
          onClick={handleOutsideClick}
        >
          <div className={styles.calendarContent}>
            <Calendar
              value={selectedDate}
              onChange={(value) => setSelectedDate(value as Date)}
            />
            <h3>Today list: </h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardHeader;
