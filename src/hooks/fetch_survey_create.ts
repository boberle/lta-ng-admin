import useFetchItem from "./_fetch_item.ts";
import { useCallback, useEffect, useState } from "react";
import { buildCreateSurveyURL } from "./_url_builders.ts";

export type SurveyCreation = {};

const useFetchCreateSurvey = () => {
  const { fetchItem, isError, statusCode } = useFetchItem<never>();
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const fetchCreateSurvey = useCallback(
    async (data: SurveyCreation, token: string) => {
      const url = buildCreateSurveyURL();
      await fetchItem(url, { method: "POST", jsonData: data, token });
    },
    [fetchItem],
  );

  useEffect(() => {
    setIsSuccess(statusCode === 200);
  }, [statusCode]);

  return {
    fetchCreateSurvey,
    isError,
    isSuccess,
  };
};

export default useFetchCreateSurvey;
