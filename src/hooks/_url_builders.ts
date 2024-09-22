import appConfig from "../constants/constants.ts";

export const buildGetUserListURL = (): URL => {
  return new URL(`users/`, appConfig.backendURL);
};

export const buildGetUserURL = (userId: string): URL => {
  return new URL(`users/${userId}/`, appConfig.backendURL);
};

export const buildGetUserAssignmentListURL = (userId: string): URL => {
  return new URL(`users/${userId}/assignments/`, appConfig.backendURL);
};

export const buildGetSurveyListURL = (): URL => {
  return new URL(`surveys/`, appConfig.backendURL);
};

export const buildCreateSurveyURL = (): URL => {
  return new URL(`surveys/`, appConfig.backendURL);
};

export const buildGetSurveyURL = (surveyId: string): URL => {
  return new URL(`surveys/${surveyId}/`, appConfig.backendURL);
};
