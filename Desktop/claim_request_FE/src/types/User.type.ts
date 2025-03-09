// Main User Type
export interface User {
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
}
export interface NewUser extends User {
  role: string; // e.g., "Dev", "BA", "PM", etc.
}
// Sub-types
export interface Name {
  title: string; // e.g., "Mr", "Ms"
  first: string; // e.g., "John"
  last: string; // e.g., "Doe"
}

export interface Location {
  street: Street;
  city: string;
  state: string;
  country: string;
  postcode: number | string; // Can be number or string depending on the region
  coordinates: Coordinates;
  timezone: Timezone;
}

export interface Street {
  number: number;
  name: string;
}

export interface Coordinates {
  latitude: string; // e.g., "34.0039"
  longitude: string; // e.g., "-118.4324"
}

export interface Timezone {
  offset: string; // e.g., "-8:00"
  description: string; // e.g., "Pacific Time (US & Canada)"
}

export interface Login {
  uuid: string;
  username: string;
  password: string;
  salt: string;
  md5: string;
  sha1: string;
  sha256: string;
}

export interface DateOfBirth {
  date: string; // e.g., "1990-01-01T00:00:00.000Z"
  age: number; // e.g., 33
}

export interface Registered {
  date: string; // e.g., "2015-05-15T00:00:00.000Z"
  age: number; // e.g., 8
}

export interface ID {
  name: string; // e.g., "SSN"
  value: string | null; // e.g., "123-45-6789" or null
}

export interface Picture {
  large: string; // URL to large picture
  medium: string; // URL to medium picture
  thumbnail: string; // URL to thumbnail
}
