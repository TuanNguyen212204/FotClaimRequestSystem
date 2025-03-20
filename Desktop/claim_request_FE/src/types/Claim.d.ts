export interface Claim {
  claim_id: string;
  user_id: string;
  project_id: string;
  total_working_hours: string;
  submitted_date: string;
  claim_status: string;
  approved_date: string;
  start_date: string;
  end_date: string;
}
export interface MyClaimDetail {
  claim_id: string;
  user_id: string;
  start_date: string;
  end_date: string;
  submitted_date: string;
  total_hours: number;
  claim_status: "PENDING" | "APPROVED" | "REJECTED"; // Giới hạn giá trị hợp lệ
  salary_overtime: string;
  approved_date: string;
  paid_date: string;
  user: {
    full_name: string;
    salary: number;
    ot_rate: number;
  };
  claim_details: {
    date: string;
    working_hours: number;
  }[];
  project: {
    project_id: string;
    project_name: string;
  };
}
