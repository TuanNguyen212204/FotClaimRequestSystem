export interface Claim {
  request_id: string;
  user_id: string;
  start_date: string;
  end_date: string;
  total_hours: number;
  project_id: string;
  submitted_date: string;
  claim_status: string;
  user: {
    full_name: string;
    salary: string;
    ot_rate: string;
  };
  salary_overtime: string;
  claim_details: {
    date: string;
    working_hours: number;
  }[];
}
