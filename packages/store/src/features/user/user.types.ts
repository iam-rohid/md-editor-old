export type USER_ROLE = "USER" | "ADMIN";

export interface User {
  id: string;
  createdAt: string;
  updatedAt: string;
  email: string;
  role: USER_ROLE;
  fullname: string;
  bio?: string;
  photoURL?: string;
}

export type SignInDto = {
  email: string;
  password: string;
};

export type SignUpDto = {
  fullname: string;
  email: string;
  password: string;
  confimrPassword: string;
};

export type UserStatus =
  | "idle"
  | "loading"
  | "signingIn"
  | "signingUp"
  | "signingOut"
  | "error"
  | "success";

export interface UserState {
  status: UserStatus;
  data: User | null;
  error: any;
}
