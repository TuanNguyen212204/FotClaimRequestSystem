// import { S } from "node_modules/framer-motion/dist/types.d-B50aGbjN";

export interface Claim {
  claim_id: string;
  user_id: string;
  project_id: string;
  project_name: string;
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
  claimDetailsWithSalaryOvertimePerDay: {
    date: string;
    working_hours: number;
  }[];
  project: {
    project_id: string;
    project_name: string;
  };
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
  project_name: string;
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

// export interface ClaimApprover {
//   request_id: string;
//   user_id: string;
//   start_date: string;
//   end_date: string;
//   total_hours: number;
//   project_id: string;
//   submitted_date: string;
//   claim_status: string;
//   project_name: string;
//   user: {
//     full_name: string;
//     salary: string;
//     ot_rate: string;
//   };
//   salary_overtime: string;
//   claim_details: {
//     date: string;
//     working_hours: number;
//   }[];
// }

export interface ClaimApprovedApprover {
  request_id: string;
  user_id: string;
  start_date: string;
  end_date: string;
  total_hours: number;
  project_id: string;
  submitted_date: string;
  claim_status: string;
  project_name: string;
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

export interface ClaimApprovedFinance {
  request_id: string;
  user_id: string;
  project_id: string;
  start_date: string;
  end_date: string;
  total_hours: number;
  submitted_date: string;
  approved_date: string;
  claim_status: string;
  full_name: string;
  project_name: string;
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
  project_name: string;
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
export interface DetailClaimFinance {
  request_id: string;
  user_id: string;
  project_id: string;
  start_date: string;
  end_date: string;
  total_hours: number;
  submitted_date: string;
  approved_date: string;
  claim_status: string;
  full_name: string;
  project_name: string;
  salary_overtime: string;
  claim_details: {
    date: string;
    working_hours: number;
    salaryOvertimePerDay: number;
  }[];
  job_rank_name: string;
  department_name: string;
}

// export interface ClaimApprovedApprover {
//   request_id: string;
//   user_id: string;
//   start_date: string;
//   end_date: string;
//   total_hours: number;
//   project_id: string;
//   submitted_date: string;
//   claim_status: string;
//   salary_overtime: string;
//   user: {
//     full_name: string;
//     salary: string;
//     ot_rate: string;
//   };
//   claim_details: {
//     date: string;
//     working_hours: number;
//   }[];
// }

export interface DetailClaimApprover {
  request_id: string;
  user_id: string;
  start_date: string;
  end_date: string;
  total_hours: number;
  project_id: string;
  submitted_date: string;
  approved_date: string;
  paid_date: string;
  claim_status: string;
  claimDetailsWithSalaryOvertimePerDay: {
    claim_id: string;
    request_id: string;
    date: string;
    working_hours: number;
    status: number;
    salaryOvertimePerDay: number;
  }[];
  totalOvertimeSalary: number;
  project: {
    project_id: string;
    project_name: string;
  };
}

export interface DetailPendingClaim {
  request_id: string;
  user_id: string;
  start_date: string;
  end_date: string;
  total_hours: number;
  project_id: string;
  submitted_date: string;
  claim_status: string;
  project_name: string;
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
