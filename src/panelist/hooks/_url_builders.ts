//const baseURL = "https://api.langtrackapp.com/api/mobile/v1/";
const baseURL = "http://localhost:8123/api/mobile/v1/";

export const buildGetAssignmentURL = (
  userId: string,
  assignmentId: string,
): URL => {
  return new URL(`assignments/${userId}/${assignmentId}/`, baseURL);
};

export const buildSubmitAssignmentURL = (
  userId: string,
  assignmentId: string,
): URL => {
  return new URL(`assignments/${userId}/${assignmentId}/`, baseURL);
};
