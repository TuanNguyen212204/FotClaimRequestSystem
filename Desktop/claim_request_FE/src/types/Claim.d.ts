import { S } from "node_modules/framer-motion/dist/types.d-B50aGbjN";

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

export interface ClaimFinance {
  request_id: string;
  user_id: string;
  project_id: string;
  start_date: string;
  end_date: string;
  total_hours: number;
  submitted_date: string;
  approved_date: string;
  claim_status: "APPROVED" | "PENDING" | "REJECTED";
  full_name: string;
  project_name: string;
  salary_overtime: string;
  claim_details: {
    date: string;
    working_hours: number;
  }[];
}
export interface DetailClaimFinance {
  claim_id: string;
  user_id: string;
  full_name: string;
  submitted_date: string;
  approved_date: string;
  total_working_hours: string;
  claim_status: string;
  project: {
    project_id: string;
    project_name: string;
    time_durations: string;
  };
}
