import React, { ChangeEvent } from "react";
import { useTranslation } from "react-i18next";

export const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (event: ChangeEvent<HTMLSelectElement>): void => {
    const selectedLanguage = event.target.value;
    i18n
      .changeLanguage(selectedLanguage)
      .then(() => console.log(`Language switched to ${selectedLanguage}`))
      .catch((error) => console.error("Language change error:", error));
  };
  return (
    <div style={{ width: "70px" }}>
      <select
        value={i18n.language}
        onChange={changeLanguage}
        aria-label="Language Selector"
        style={{
          width: "100%",
          padding: "5px",
          borderRadius: "5px",
          border: "1px solid #ccc",
          backgroundColor: "#fff",
          cursor: "pointer",
        }}
      >
        <option value="en">🇺🇸 En</option>
        <option value="vn">🇻🇳 Vi</option>
      </select>
    </div>
  );
};
