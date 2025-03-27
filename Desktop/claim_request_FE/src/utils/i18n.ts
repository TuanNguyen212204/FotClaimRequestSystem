import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Import JSON
import headerEn from "../locales/en/header.json";
import headerVn from "../locales/vi/header.json";

// Khởi tạo i18n
i18n.use(initReactI18next).init({
  resources: {
    en: { header: headerEn },
    vi: { header: headerVn },
  },
  lng: "en", // Ngôn ngữ mặc định
  fallbackLng: "vi",
  ns: ["header"], // Chỉ định namespace
  defaultNS: "header",
  debug: true,
});

export default i18n;
