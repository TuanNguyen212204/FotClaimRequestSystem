import { PATH } from "./config";

export const FIRST_PAGE_BY_ROLE = {
  APPROVER: PATH.pending,
  FINANCE: PATH.approvedFinance,
  CLAIMER: PATH.myClaims,
  ADMIN: PATH.allUserInformation,
};
