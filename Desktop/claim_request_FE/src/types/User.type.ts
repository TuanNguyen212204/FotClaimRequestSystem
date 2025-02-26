export interface Experience {
  title: string;
  company: string;
  description: string;
}

export interface User {
  userID: string;
  userName: string;
  hashPassword: string;
  fullName?: string;
  department?: string;
  jobRank?: string;
  salary?: number;
  roleID?: number;
  userStatus?: number;
  avatar?: string;
  bio?: string;
  projects?: string[];
  experiences?: Experience[];
}

export interface NewUser extends User {
  role: string; //(e.g., "Dev", "BA", "PM")
}