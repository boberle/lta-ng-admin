import useFetchItem from "./_fetch_item.ts";
import { useCallback } from "react";
import { buildGetSurveyURL } from "./_url_builders.ts";

type SurveyDetailsResponse = {
  id: string;
  title: string;
  questions: {
    message: string;
    type: "single-choice" | "multiple-choice" | "open-ended";
  }[];
};

const convertDAOToSurveyDetails = (
  dao: SurveyDetailsResponse,
): SurveyDetailsType => {
  try {
    return {
      id: dao.id,
      title: dao.title,
      questions: dao.questions,
    };
  } catch {
    throw new Error("Failed to convert DAO to survey list");
  }
};

const useFetchSurvey = () => {
  const { item, fetchItem, isLoading, isError } =
    useFetchItem<SurveyDetailsType>(convertDAOToSurveyDetails);

  const fetchSurvey = useCallback(
    (userId: string, token: string) => {
      const url = buildGetSurveyURL(userId);
      fetchItem(url, { token });
    },
    [fetchItem],
  );

  return {
    survey: item,
    fetchSurvey,
    isLoading,
    isError,
  };
};

export default useFetchSurvey;
