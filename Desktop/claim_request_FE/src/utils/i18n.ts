import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Import JSON
import claimEn from "../locales/en/createClaim.json";
import claimVn from "../locales/vi/createClaim.json";
import headerEn from "../locales/en/header.json";
import headerVn from "../locales/vi/header.json";
import userInfoEn from "@/locales/en/userInfo.json";
import userInfoVn from "@/locales/vi/userInfo.json";
import createClaimEn from "@/locales/en/createClaim.json";
import createClaimVn from "@/locales/vi/createClaim.json";
import userClaimsEn from "@/locales/en/userClaims.json";
import userClaimsVi from "@/locales/vi/userClaims.json";
import approvedClaimEn from "@/locales/en/approvedClaim.json";
import approvedClaimVi from "@/locales/vi/approvedClaim.json";
import pendingClaimEn from "@/locales/en/pendingClaim.json";
import pendingClaimVi from "@/locales/vi/pendingClaim.json";
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
import pendingEn from "@/locales/en/approval/pending.json";
import pendingVn from "@/locales/vi/approval/pending.json";
import approveEn from "@/locales/en/approval/approve.json";
import approveVn from "@/locales/vi/approval/approve.json";
import rejectEn from "@/locales/en/approval/reject.json";
import rejectVn from "@/locales/vi/approval/reject.json";
import detailsEn from "@/locales/en/approval/details.json";
import detailsVn from "@/locales/vi/approval/details.json";
import draftClaimEn from "../locales/en/draftClaim.json";
import draftClaimVn from "../locales/vi/draftClaim.json";
import rejectedClaimEn from "../locales/en/rejectedClaim.json";
import rejectedClaimVn from "../locales/vi/rejectedClaim.json";
import draftEn from "@/locales/en/approval/draft.json";
import draftVn from "@/locales/vi/approval/draft.json";
i18n.use(initReactI18next).init({
  resources: {
    en: {
      header: headerEn,
      userInfo: userInfoEn,
      claim: createClaimEn,
      userClaims: userClaimsEn,
      approvedClaim: approvedClaimEn,
      pendingClaim: pendingClaimEn,
      finance: financeEn,
      approvedetail: approvedetailEn,
      paidclaims: paidclaimsEn,
      claimstatus: claimstatusEn,
      projectInformation: ProjectInformationEn,
      allUserInformation: AllUserInformationEn,
      dashboard: DashboardEn,
      pending: pendingEn,
      approve: approveEn,
      reject: rejectEn,
      details: detailsEn,
      rejectedClaim: rejectedClaimEn,
      draft: draftEn,
    },
    vi: {
      header: headerVn,
      userInfo: userInfoVn,
      claim: createClaimVn,
      userClaims: userClaimsVi,
      approvedClaim: approvedClaimVi,
      pendingClaim: pendingClaimVi,
      finance: financeVn,
      approvedetail: approvedetailVi,
      paidclaims: paidclaimsVi,
      claimstatus: claimstatusVi,
      projectInformation: ProjectInformationVi,
      allUserInformation: AllUserInformationVi,
      dashboard: DashboardVi,
      pending: pendingVn,
      approve: approveVn,
      reject: rejectVn,
      details: detailsVn,
      rejectedClaim: rejectedClaimVn,
      draft: draftVn,
    },
  },
  lng: "en",
  fallbackLng: "vi",
  ns: [
    "header",
    "userInfo",
    "createClaim",
    "userClaims",
    "approvedClaim",
    "pendingClaim",
    "finance",
    "approvedetail",
    "paidclaims",
    "claimstatus",
    "projectInformation",
    "allUserInformation",
    "dashboard",
    "pending",
    "approve",
    "reject",
    "details",
    "draft"
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
