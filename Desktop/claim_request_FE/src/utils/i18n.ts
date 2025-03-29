import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Import JSON
import headerEn from "../locales/en/header.json";
import headerVn from "../locales/vi/header.json";
import userInfoEn from "../locales/en/userInfo.json";
import userInfoVn from "../locales/vi/userInfo.json";
import createClaimEn from "../locales/en/createClaim.json";
import createClaimVn from "../locales/vi/createClaim.json";
import userClaimsEn from "../locales/en/userClaims.json";
import userClaimsVi from "../locales/vi/userClaims.json";
import approvedClaimEn from "../locales/en/approvedClaim.json";
import approvedClaimVi from "../locales/vi/approvedClaim.json";

// Khởi tạo i18n
i18n.use(initReactI18next).init({
  resources: {
    en: {
      header: headerEn,
      userInfo: userInfoEn,
      createClaim: createClaimEn,
      userClaims: userClaimsEn,
      approvedClaim: approvedClaimEn,
    },
    vi: {
      header: headerVn,
      userInfo: userInfoVn,
      createClaim: createClaimVn,
      userClaims: userClaimsVi,
      approvedClaim: approvedClaimVi,
    },
  },
  lng: "en", // Ngôn ngữ mặc định
  fallbackLng: "vi",
  ns: ["header", "userInfo", "createClaim", "userClaims", "approvedClaim"],
  defaultNS: "header",
  debug: true,
});

export default i18n;
