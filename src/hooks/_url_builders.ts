import appConfig from "../constants/constants.ts";

export const buildGetUserListURL = (): URL => {
  return new URL(`users/`, appConfig.backendURL);
};

export const buildGetUserURL = (userId: string): URL => {
  return new URL(`users/${userId}/`, appConfig.backendURL);
};
