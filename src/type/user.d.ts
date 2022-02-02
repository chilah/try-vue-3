export interface SignUpForm {
  username: string;
  email: string;
  password: string;
}

export interface SignInForm {
  email: string;
  password: string;
}

export interface UserData {
  email: SignUpForm["email"];
  username: SignUpForm["username"];
  bio: string;
  token: string;
  image: string;
}

export interface AuthResponse<T> {
  user: T;
}

export interface AuthRequest<T> {
  user: T;
}

export type SettingsForm = Partial<
  Pick<SignInForm, "password"> & Omit<UserData, "token">
>;
