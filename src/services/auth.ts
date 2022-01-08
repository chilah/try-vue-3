import { RegisterForm, RegisterFormRequest, UserResponse } from "@/type";
import { AxiosResponse } from "axios";
import baseInstance from "./request";

const AUTH_API_PATH = "/users";

export const submitRegister = async (
  form: RegisterFormRequest
): Promise<AxiosResponse<UserResponse>> => {
  try {
    const response = await baseInstance.post<UserResponse>(
      `${AUTH_API_PATH}`,
      form
    );

    return response;
  } catch (error) {
    throw new Error(`[Error]: ${error}`);
  }
};

export const submitLogin = async (): Promise<AxiosResponse<UserResponse>> => {
  try {
    const response = await baseInstance.post(`${AUTH_API_PATH}/login`);

    return response;
  } catch (error) {
    throw new Error(`[Error]: ${error}`);
  }
};
