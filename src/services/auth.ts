import {
  AuthRequest,
  RegisterForm,
  SignInForm,
  AuthResponse,
  UserData,
} from "@/type";
import { AxiosResponse } from "axios";
import baseInstance from "./request";

const AUTH_API_PATH = "/users";

export const submitRegister = async (
  form: AuthRequest<RegisterForm>
): Promise<AxiosResponse<AuthResponse<UserData>>> => {
  try {
    const response = await baseInstance.post<AuthResponse<UserData>>(
      `${AUTH_API_PATH}`,
      form
    );

    return response;
  } catch (error) {
    throw new Error(`[Error]: ${error}`);
  }
};

export const submitLogin = async (
  form: AuthRequest<SignInForm>
): Promise<AxiosResponse<AuthResponse<UserData>>> => {
  try {
    const response = await baseInstance.post(`${AUTH_API_PATH}/login`, form);

    return response;
  } catch (error) {
    throw new Error(`[Error]: ${error}`);
  }
};
