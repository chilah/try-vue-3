import { IProfileResponse } from "@/type";
import { AxiosResponse } from "axios";
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
