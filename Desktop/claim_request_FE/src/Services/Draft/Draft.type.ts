interface ClaimDetail {
  claim_id: string;
  request_id: string;
  date: string;
  working_hours: number;
  status: number;
  salaryOvertimePerDay: number;
}

interface Project {
  project_id: string;
  project_name: string;
  start_date: string;
  end_date: string;
}

export interface Claim {
  request_id: string;
  user_id: string;
  start_date: string;
  end_date: string;
  total_hours: number;
  project_id: string;
  submitted_date: string;
  approved_date: string | null;
  paid_date: string | null;
  note: string | null;
  claim_status: string;
  claimDetailsWithSalaryOvertimePerDay: ClaimDetail[];
  totalOvertimeSalary: number;
  project: Project;
}
export interface ClaimResponse {
  httpStatus: number;
  message: string;
  data: Claim[];
}
