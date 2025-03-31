import { useState, useEffect } from "react";
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
  const { t } = useTranslation("dashboard");

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

  const formattedDate: string = dateTime.toLocaleDateString("en-US", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

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
