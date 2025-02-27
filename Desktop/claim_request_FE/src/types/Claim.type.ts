export interface Claim {
  claimID: string;
  userID: string;
  projectID: string;
  submittedDate: Date;
  approvedDate: Date;
  totalWorkingHours: number;
  claimStatus: string;
}
