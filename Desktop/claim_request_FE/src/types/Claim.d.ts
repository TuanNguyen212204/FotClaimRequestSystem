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

export interface PendingClaim {
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

export interface ApprovedClaim {
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

export interface RejectedClaim {
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
