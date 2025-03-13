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
}

export interface NewUser extends User {
  role: string; // (e.g., "Dev", "BA", "PM")
}
