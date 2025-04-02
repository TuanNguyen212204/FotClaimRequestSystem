import React, { useState } from "react";
import Select from "react-select";
import { useTranslation } from "react-i18next";

const languageOptions = [
  {
    value: "en",
    label: (
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          src="https://flagcdn.com/w40/us.png"
          alt="English"
          style={{ width: 20, height: 15, marginRight: 10 }}
        />
        <span style={{color: "#000" }}>EN</span>
      </div>
    ),
  },
  {
    value: "vn",
    label: (
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          src="https://flagcdn.com/w40/vn.png"
          alt="Vietnamese"
          style={{ width: 20, height: 15, marginRight: 10 }}
        />
        <span style={{color: "#000" }}>VI</span>
      </div>
    ),
  },
];

export const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation("header");
  const [isOpen, setIsOpen] = useState(false);

  const changeLanguage = (selectedOption: any) => {
    i18n
      .changeLanguage(selectedOption.value)
      .then(() => console.log(`Language switched to ${selectedOption.value}`))
      .catch((error) => console.error("Language change error:", error));
  };

  return (
    <div style={{ width: "80px", display: "flex", alignItems: "center" }}>
      <Select
        options={languageOptions}
        onChange={changeLanguage}
        defaultValue={languageOptions.find((opt) => opt.value === i18n.language)}
        styles={{
          control: (base) => ({
            ...base,
            borderRadius: "5px",
            border: "1px solid #ccc",
            cursor: "pointer",
            backgroundColor: "#fff",
          }),
          option: (base, state) => ({
            ...base,
            backgroundColor: state.isSelected ? "#4A90E2" : "#fff",
            color: state.isSelected ? "#fff" : "#000",
            display: "flex",
            alignItems: "center",
            padding: "10px",
          }),
          singleValue: (base) => ({
            ...base,
            color: "#000",
          }),
          menu: (base) => ({
            ...base,
            borderRadius: "5px",
            overflow: "hidden",
            boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
          }),
        }}
      />
    </div>
  );
};
