export interface RegisterForm {
  username: string;
  email: string;
  password: string;
}

export interface SignInForm {
  username: string;
  password: string;
}

export interface UserData {
  email: RegisterForm["email"];
  username: RegisterForm["username"];
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
