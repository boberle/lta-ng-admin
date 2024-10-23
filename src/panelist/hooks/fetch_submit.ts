import { useCallback, useEffect, useState } from "react";
import { buildSubmitAssignmentURL } from "./_url_builders";
import useFetch from "./_fetch.ts";

const useSubmitAssignment = () => {
  const { isLoading, isError, statusCode, fetchData } = useFetch();
  const [isTooLate, setIsTooLate] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const submitAssignment = useCallback(
    async (userId: string, assignmentId: string, answers: AnswerType[]) => {
      const url = buildSubmitAssignmentURL(userId, assignmentId);
      fetchData(url, {
        method: "PUT",
        jsonData: { answers: answers },
      });
    },
    [fetchData],
  );

  useEffect(() => {
    setIsTooLate(statusCode === 410);
    setIsSubmitted(statusCode === 200);
  }, [statusCode]);

  return {
    submitAssignment,
    isLoading,
    isError,
    isTooLate,
    isSubmitted,
  };
};

export default useSubmitAssignment;
