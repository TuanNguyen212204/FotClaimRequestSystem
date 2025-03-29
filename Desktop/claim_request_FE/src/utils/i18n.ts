import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Import JSON
import headerEn from "../locales/en/header.json";
import headerVn from "../locales/vi/header.json";
import userInfoEn from "../locales/en/userInfo.json";
import userInfoVn from "../locales/vi/userInfo.json";
// Khởi tạo i18n
i18n.use(initReactI18next).init({
  resources: {
    en: { header: headerEn, userInfo: userInfoEn },
    vi: { header: headerVn, userInfo: userInfoVn },
import financeEn from "../locales/en/finance.json";
import financeVn from "../locales/vi/finance.json";
import approvedetailEn from "../locales/en/approvedetail.json";
import approvedetailVi from "../locales/vi/approvedetail.json";
import paidclaimsEn from "../locales/en/paidclaims.json";
import paidclaimsVi from "../locales/vi/paidclaims.json";
import claimstatusEn from "../locales/en/claimstatus.json";
import claimstatusVi from "../locales/vi/claimstatus.json";

// Khởi tạo i18n
i18n.use(initReactI18next).init({
  resources: {
    en: { 
      header: headerEn,
      finance: financeEn,
      approvedetail: approvedetailEn,
      paidclaims: paidclaimsEn,
      claimstatus: claimstatusEn
    },
    vi: { 
      header: headerVn,
      finance: financeVn,
      approvedetail: approvedetailVi,
      paidclaims: paidclaimsVi,
      claimstatus: claimstatusVi
    },
  },
  lng: "en", // Ngôn ngữ mặc định
  fallbackLng: "vi",
  ns: ["header", "finance", "approvedetail", "paidclaims", "claimstatus"],
  defaultNS: "header",
  debug: true,
  interpolation: {
    escapeValue: false
  },
  react: {
    useSuspense: false
  }
});

export default i18n;
