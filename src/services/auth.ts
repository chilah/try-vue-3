import {
  AuthRequest,
  SignUpForm,
  SignInForm,
  AuthResponse,
  UserData,
  SettingsForm,
} from "@/type";
import { AxiosResponse } from "axios";
import baseInstance from "./request";

const AUTH_API_PATH = "/users";
const USER_API_PATH = "/user";

export const postSignUp = async (
  form: AuthRequest<SignUpForm>
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

export const postSignIn = async (
  form: AuthRequest<SignInForm>
): Promise<AxiosResponse<AuthResponse<UserData>>> => {
  try {
    const response = await baseInstance.post(`${AUTH_API_PATH}/login`, form);

    return response;
  } catch (error) {
    throw new Error(`[Error]: ${error}`);
  }
};

export const updateSetting = async (
  form: AuthRequest<SettingsForm>
): Promise<AxiosResponse<AuthResponse<UserData>>> => {
  try {
    const response = await baseInstance.put<AuthResponse<UserData>>(
      `${USER_API_PATH}`,
      form
    );

    return response;
  } catch (error) {
    throw new Error(`[Error]: ${error}`);
  }
};
