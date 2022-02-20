import { IProfileResponse } from "@/type";
import { AxiosError, AxiosResponse } from "axios";
import baseInstance from "./request";

const PROFILES_API_PATH = "/profiles";

export const getProfile = async (
  username: string
): Promise<AxiosResponse<IProfileResponse>> => {
  try {
    const response = await baseInstance.get<IProfileResponse>(
      `${PROFILES_API_PATH}/${username}`
    );

    return response;
  } catch (error) {
    throw new Error(`[Error]: ${error}`);
  }
};

export const postFollowUser = async (
  username: string
): Promise<AxiosResponse<IProfileResponse>> => {
  try {
    const response = await baseInstance.post(
      `${PROFILES_API_PATH}/${username}/follow`
    );

    return response;
  } catch (error) {
    const err = error as AxiosError;

    throw err;
  }
};

export const postUnfollowUser = async (
  username: string
): Promise<AxiosResponse<IProfileResponse>> => {
  try {
    const response = await baseInstance.delete(
      `${PROFILES_API_PATH}/${username}/follow`
    );

    return response;
  } catch (error) {
    const err = error as AxiosError;

    throw err;
  }
};
