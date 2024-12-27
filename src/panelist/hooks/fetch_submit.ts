import { useCallback, useEffect, useState } from "react";
import { buildSubmitAssignmentURL } from "./_url_builders";
import useFetch from "./_fetch.ts";

const convertAnswerToDTO = (
  answer: SingleChoiceAnswer | MultipleChoiceAnswer | OpenEndedAnswer,
): any => {
  switch (answer.type) {
    case "singleChoice":
      return {
        selected_index: answer.selectedIndex,
        specify_answer: answer.specify,
      };
    case "multipleChoice":
      return {
        selected_indices: answer.selectedIndices,
        specify_answer: answer.specify,
      };
    case "openEnded":
      return {
        value: answer.value,
      };
  }
};

const useSubmitAssignment = () => {
  const { isLoading, isError, statusCode, fetchData } = useFetch();
  const [isTooLate, setIsTooLate] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const submitAssignment = useCallback(
    async (
      userId: string,
      assignmentId: string,
      answers: (SingleChoiceAnswer | MultipleChoiceAnswer | OpenEndedAnswer)[],
    ) => {
      const url = buildSubmitAssignmentURL(userId, assignmentId);
      fetchData(url, {
        method: "PUT",
        jsonData: {
          answers: answers.map((answer) => convertAnswerToDTO(answer)),
        },
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
