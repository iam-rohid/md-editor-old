import { Profile } from "./profile";

export type USER_ROLE = "USER" | "ADMIN";
export interface User {
  id: string;
  createdAt: string;
  updatedAt: string;
  email: string;
  role: USER_ROLE;
  profile?: Profile;
}
