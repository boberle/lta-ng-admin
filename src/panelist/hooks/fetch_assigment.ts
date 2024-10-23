import { useCallback, useEffect, useState } from "react";
import { buildGetAssignmentURL } from "./_url_builders";
import useFetch from "./_fetch.ts";

type SingleChoiceQuestionResponse = {
  type: "single-choice";
  message: string;
  choices: string[];
};

const isSingleChoiceQuestionResponse = (
  o: any,
): o is SingleChoiceQuestionResponse => {
  if (typeof o !== "object") return false;
  if (
    !(
      "type" in o &&
      "message" in o &&
      "choices" in o &&
      o.type === "single-choice"
    )
  )
    return false;

  if (!Array.isArray(o.choices)) return false;

  if (o.choices.length === 0) return false;

  return true;
};

const convertSingleChoiceQuestionResponseToQuestion = (
  o: SingleChoiceQuestionResponse,
): SingleChoiceQuestion => {
  return {
    type: "singleChoice",
    message: o.message,
    choices: o.choices,
  };
};

type MultipleChoiceQuestionResponse = {
  type: "multiple-choice";
  message: string;
  choices: string[];
};

const isMultipleChoiceQuestionResponse = (
  o: any,
): o is MultipleChoiceQuestionResponse => {
  if (typeof o !== "object") return false;
  if (
    !(
      "type" in o &&
      "message" in o &&
      "choices" in o &&
      o.type === "multiple-choice"
    )
  )
    return false;

  if (!Array.isArray(o.choices)) return false;

  if (o.choices.length === 0) return false;

  return true;
};

const convertMultipleChoiceQuestionResponseToQuestion = (
  o: MultipleChoiceQuestionResponse,
): MultipleChoiceQuestion => {
  return {
    type: "multipleChoice",
    message: o.message,
    choices: o.choices,
  };
};

type OpenEndedQuestionResponse = {
  type: "open-ended";
  message: string;
  max_length: number;
};

const isOpenEndedQuestionResponse = (
  o: any,
): o is OpenEndedQuestionResponse => {
  if (typeof o !== "object") return false;
  if (!("type" in o && "message" in o && o.type === "open-ended")) return false;

  return true;
};

const convertOpenEndedQuestionResponseToQuestion = (
  o: OpenEndedQuestionResponse,
): OpenEndedQuestion => {
  return {
    type: "openEnded",
    message: o.message,
    maxLength: o.max_length,
  };
};

type AssignmentResponse = {
  id: string;
  welcome_message: string;
  submit_message: string;
  questions: (
    | SingleChoiceQuestionResponse
    | MultipleChoiceQuestionResponse
    | OpenEndedQuestionResponse
  )[];
};

const isAssignmentResponse = (o: any): o is AssignmentResponse => {
  if (typeof o !== "object") return false;
  if (
    !(
      "id" in o &&
      "welcome_message" in o &&
      "submit_message" in o &&
      "questions" in o
    )
  )
    return false;

  if (
    typeof o.id !== "string" ||
    typeof o.welcome_message !== "string" ||
    typeof o.submit_message !== "string"
  )
    return false;

  if (!Array.isArray(o.questions)) return false;

  return o.questions.every(
    (item: any) =>
      isSingleChoiceQuestionResponse(item) ||
      isMultipleChoiceQuestionResponse(item) ||
      isOpenEndedQuestionResponse(item),
  );
};

const convertQuestionResponseToQuestion = (
  o: any,
): SingleChoiceQuestion | MultipleChoiceQuestion | OpenEndedQuestion => {
  if (isSingleChoiceQuestionResponse(o)) {
    return convertSingleChoiceQuestionResponseToQuestion(o);
  } else if (isMultipleChoiceQuestionResponse(o)) {
    return convertMultipleChoiceQuestionResponseToQuestion(o);
  } else if (isOpenEndedQuestionResponse(o)) {
    return convertOpenEndedQuestionResponseToQuestion(o);
  } else {
    throw new Error("Invalid question type");
  }
};

const convertDTOToAssignment = (dto: any): AssignmentType => {
  if (!isAssignmentResponse(dto)) {
    throw new Error("Invalid assignment data");
  }
  try {
    const questions: (
      | SingleChoiceQuestion
      | MultipleChoiceQuestion
      | OpenEndedQuestion
    )[] = dto.questions.map((question) =>
      convertQuestionResponseToQuestion(question),
    );

    return {
      id: dto.id,
      welcomeMessage: dto.welcome_message,
      submitMessage: dto.submit_message,
      questions,
    };
  } catch {
    throw new Error("Failed to convert DTO to assignment");
  }
};

const useFetchAssignment = () => {
  const { data, isLoading, isError: isFetchError, fetchData } = useFetch(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [assignment, setAssignment] = useState<AssignmentType | null>(null);

  const fetchAssignment = useCallback(
    async (userId: string, assignmentId: string) => {
      setIsError(false);
      const url = buildGetAssignmentURL(userId, assignmentId);
      fetchData(url, {});
    },
    [fetchData],
  );

  useEffect(() => {
    if (data === null) {
      setAssignment(null);
      return;
    }
    try {
      const convertedData = convertDTOToAssignment(data);
      setAssignment(convertedData);
    } catch {
      setIsError(true);
    }
  }, [data]);

  useEffect(() => {
    setIsError((prev) => prev || isFetchError);
  }, [isFetchError]);

  return {
    assignment,
    fetchAssignment,
    isLoading,
    isError,
  };
};

export default useFetchAssignment;
