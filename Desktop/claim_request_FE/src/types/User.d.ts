export interface User {
  user_id: string;
  username: string;
  email: string;
  hash_password: string;
  password?: string;
  full_name?: string;
  department?: string;
  job_rank?: string;
  salary?: string;
  role_id?: number;
  user_status?: number;
  role_name?: string;
  avatar?: string;
  ot_rate?: number;
  department_id?: string;
  job_rank_id?: string;
}

export interface NewUser extends User {
  role: string; // (e.g., "Dev", "BA", "PM")
}

export interface UserInformation {
  user_id: string;
  username: string;
  email: string;
  full_name: string;
  department_id: string;
  job_rank_id: string;
  salary: string;
  role_id: number;
  avatar: string | null;
  user_status: number;
  role_name: string;
  department: string;
  job_rank: string;
}
