import { BACKEND_URL } from "../constants/constants.ts";

export const buildGetUserListURL = (): URL => {
  return new URL(`users/`, BACKEND_URL);
};

export const buildGetUserURL = (userId: string): URL => {
  return new URL(`users/${userId}/`, BACKEND_URL);
};
