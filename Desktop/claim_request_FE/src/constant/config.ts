import { createECDH } from "crypto";

export const PATH = {
  // home: "/",
  userInfo: "/user-info", //tuan
  draft: "/draft",
  checkToMail: "/check-to-mail",
  createNewPassword: "/create-new-password",
  login: "/", //nguyen
  resetPassword: "/reset-password", //nguyen
  createRequest: "/create-claim", //an
  pending: "/pending-claim", //tri  approver first page
  details: "/details/:id", //tri
  myClaims: "/my-claims", //nam claimer first page
  userClaimDetails: "/user-claim/:id",
  allUserInformation: "/user-information", //admin first page
  approveDetails: "/approve-details",
  claimStatus: "/paid-claim/detail",
  paidClaim: "/finance/paid",
  dashboard: "/dashboard",
  approvedFinance: "/finance/approved", //finance first page
  approvedApprover: "/approver/approved",
  approvedDetailFinance: "/finance/approved/detail/:request_id",
  projectInformation: "/project-information",
  staffInformation: "/staff-information",
  unauthorized: "/unauthorized",
  unauthenticated: "/unauthenticated",
  updateUser: "/update-user",
  createUser: "/create-user",
  createProject: "/create-project",
  updateProject: "/update-project",
  claimDetail: "/claim-detail",
  approvedClaimWithUserID: "/approved-claim-by-user-id",
  rejectedClaimWithUserID: "/rejected-claim-by-user-id",
  pendingClaimByUserID: "/pending-claim-by-user-id",
  test: "/test",
  draftClaimByUserID: "/draft-claim-by-user-id",
  rejectedClaim: "/rejected-claim",
  changePassword: "/change-password",
  draftApproval: "/draft-approval",
  landingPage: "/landing-page",
};
