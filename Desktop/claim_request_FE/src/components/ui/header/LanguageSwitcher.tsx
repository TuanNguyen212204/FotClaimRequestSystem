import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import styles from "./LanguageSwitcher.module.css";
import { Button } from "@components/ui/button/Button";

export const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation("header");
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { value: "en", label: "English", display: "ENG" },
    { value: "vi", label: "Vietnamese", display: "VIE" },
  ];

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language");
    if (
      savedLanguage &&
      languages.some((lang) => lang.value === savedLanguage)
    ) {
      i18n.changeLanguage(savedLanguage);
    }
  }, [i18n]);

  const currentLanguage =
    languages.find((lang) => lang.value === i18n.language) || languages[0];

  const changeLanguage = (value: string) => {
    i18n
      .changeLanguage(value)
      .then(() => {
        localStorage.setItem("language", value);
        console.log(`Đã chuyển sang ngôn ngữ ${value}`);
      })
      .catch((error) => console.error("Lỗi khi chuyển ngôn ngữ:", error));
    setIsOpen(false);
  };

  return (
    <div className={styles.languageSwitcher}>
      <Button
        type="default"
        size="middle"
        icon={<span className={styles.globeIcon}>🌐</span>}
        backgroundColor="#ffffff"
        color="#000000"
        onClick={() => setIsOpen(!isOpen)}
        className={styles.languageTrigger}
      >
        <span className={styles.languageLabel}>{currentLanguage.label}</span>
        <span className={styles.arrow}>▼</span>
      </Button>
      {isOpen && (
        <div className={styles.languageMenu}>
          {languages.map((lang) => (
            <div
              key={lang.value}
              onClick={() => changeLanguage(lang.value)}
              className={`${styles.languageItem} ${
                lang.value === i18n.language ? styles.active : ""
              }`}
            >
              {lang.label}
              {lang.value === i18n.language && (
                <span className={styles.checkIcon}>✔</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
