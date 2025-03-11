export interface Claim {
  claim_id: string;
  user_id: string;
  project_id: string;
  total_working_hours: number;
  submitted_date: string;
  claim_status: string;
  approved_date: string;
}
