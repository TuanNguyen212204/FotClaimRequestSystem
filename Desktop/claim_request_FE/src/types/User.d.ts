export interface Experience {
  title: string;
  company: string;
  description: string;
}

export interface User {
<<<<<<< HEAD:Desktop/claim_request_FE/src/types/User.d.ts
  gender: string; // "male" | "female"
  name: Name;
  location: Location;
  email: string;
  login: Login;
  dob: DateOfBirth;
  registered: Registered;
  phone: string;
  cell: string;
  id: ID;
  picture: Picture;
  nat: string; // Nationality
  department: string; // e.g., "IT", "HR", "Finance", etc.
  job_rank: string; // e.g., "Junior", "Senior", "Manager", etc.
=======
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
>>>>>>> feature/common-components:Desktop/claim_request_FE/src/types/User.type.ts
}

export interface NewUser extends User {
  role: string; //(e.g., "Dev", "BA", "PM")
}