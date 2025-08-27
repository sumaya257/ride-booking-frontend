export type Role = "rider" | "driver" | "admin";
export type Status = "active" | "blocked" | "suspended";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  status?: Status;
}

export interface AuthResponse {
  user: User;
  token: string;
}
