export interface RegisterForm {
  username: string;
  email: string;
  password: string;
}

export interface RegisterFormRequest {
  user: RegisterForm;
}

export interface BaseLogin {
  email: RegisterForm["email"];
  username: RegisterForm["username"];
  bio: string;
  token: string;
  image: string;
}

export interface UserResponse {
  user: BaseLogin;
}
