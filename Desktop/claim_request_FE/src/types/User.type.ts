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
}

export interface NewUser extends User {
  role: string; // e.g., "Dev", "BA", "PM"
}

