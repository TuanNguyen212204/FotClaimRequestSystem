export interface Experience {
  title: string;
  company: string;
  description: string;
}

export interface User {
  user_id: string;
  full_name: string;
  email: string;
  department: string;
  job_rank: string;
}

export interface NewUser extends User {
  role: string; //(e.g., "Dev", "BA", "PM")
}
