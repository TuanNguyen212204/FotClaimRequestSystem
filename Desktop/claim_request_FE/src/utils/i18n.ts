import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Import JSON
import claimEn from "../locales/en/createClaim.json";
import claimVn from "../locales/vi/createClaim.json";
import headerEn from "../locales/en/header.json";
import headerVn from "../locales/vi/header.json";

// Khởi tạo i18n
i18n.use(initReactI18next).init({
  resources: {
    en: { header: headerEn, claim: claimEn },
    vi: { header: headerVn, claim: claimVn },
  },
  lng: "en", // Ngôn ngữ mặc định
  fallbackLng: "vi",
  ns: ["header"], // Chỉ định namespace
  defaultNS: "header",
  debug: true,
});

export default i18n;
