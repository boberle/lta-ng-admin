import useFetchItem from "./_fetch_item.ts";
import { useCallback } from "react";
import { buildGetSurveyListURL } from "./_url_builders.ts";

type SurveyListResponse = {
  surveys: SurveyListItemResponse[];
};

type SurveyListItemResponse = {
  id: string;
  title: string;
  questions: {
    message: string;
    type: "single-choice" | "multiple-choice" | "open-ended";
  }[];
};

const convertDAOToSurveyList = (
  dao: SurveyListResponse,
): SurveyListItemType[] => {
  try {
    return dao.surveys.map((item: SurveyListItemResponse) => ({
      id: item.id,
      title: item.title,
      questions: item.questions,
    }));
  } catch {
    throw new Error("Failed to convert DAO to survey list");
  }
};

const useFetchSurveys = () => {
  const { item, fetchItem, isLoading, isError } = useFetchItem<
    SurveyListItemType[]
  >(convertDAOToSurveyList);

  const fetchSurveys = useCallback(
    (token: string) => {
      const url = buildGetSurveyListURL();
      fetchItem(url, { token });
    },
    [fetchItem],
  );

  return {
    surveys: item,
    fetchSurveys,
    isLoading,
    isError,
  };
};

export default useFetchSurveys;
