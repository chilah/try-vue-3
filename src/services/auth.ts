import baseInstance from "./request";

const AUTH_API_PATH = "/users";

export interface RegisterForm {
  username: string;
  email: string;
  password: string;
}

export interface RequestRegisterForm {
  user: RegisterForm;
}

export const submitRegister = async (form: RequestRegisterForm) => {
  try {
    const response = await baseInstance.post(`${AUTH_API_PATH}`, form);

    return response;
  } catch (error) {
    throw new Error(`[Error]: ${error}`);
  }
};

export const submitLogin = async () => {
  try {
    const response = await baseInstance.post(`${AUTH_API_PATH}/login`);

    return response;
  } catch (error) {
    throw new Error(`[Error]: ${error}`);
  }
};
