import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Import JSON
import headerEn from "../locales/en/header.json";
import headerVn from "../locales/vi/header.json";
import userInfoEn from "../locales/en/userInfo.json";
import userInfoVn from "../locales/vi/userInfo.json";
import financeEn from "../locales/en/finance.json";
import financeVn from "../locales/vi/finance.json";
import approvedetailEn from "../locales/en/approvedetail.json";
import approvedetailVi from "../locales/vi/approvedetail.json";
import paidclaimsEn from "../locales/en/paidclaims.json";
import paidclaimsVi from "../locales/vi/paidclaims.json";
import claimstatusEn from "../locales/en/claimstatus.json";
import claimstatusVi from "../locales/vi/claimstatus.json";
import ProjectInformationEn from "@/locales/en/admin/projectInformation.json";
import ProjectInformationVi from "@/locales/vi/admin/projectInformation.json";
import AllUserInformationEn from "@/locales/en/admin/allUserInformation.json";
import AllUserInformationVi from "@/locales/vi/admin/allUserInformation.json";
import DashboardEn from "@/locales/en/admin/dashboard.json";
import DashboardVi from "@/locales/vi/admin/dashboard.json";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      header: headerEn,
      userInfo: userInfoEn,
      finance: financeEn,
      approvedetail: approvedetailEn,
      paidclaims: paidclaimsEn,
      claimstatus: claimstatusEn,
      projectInformation: ProjectInformationEn,
      allUserInformation: AllUserInformationEn,
      dashboard: DashboardEn,
    },
    vi: {
      header: headerVn,
      userInfo: userInfoVn,
      finance: financeVn,
      approvedetail: approvedetailVi,
      paidclaims: paidclaimsVi,
      claimstatus: claimstatusVi,
      projectInformation: ProjectInformationVi,
      allUserInformation: AllUserInformationVi,
      dashboard: DashboardVi,
    },
  },
  lng: "en",
  fallbackLng: "vi",
  ns: [
    "header",
    "userInfo",
    "finance",
    "approvedetail",
    "paidclaims",
    "claimstatus",
    "projectInformation",
    "allUserInformation",
    "dashboard",
  ],
  defaultNS: "header",
  debug: true,
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
});

export default i18n;
