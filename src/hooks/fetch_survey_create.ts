import useFetchItem from "./_fetch_item.ts";
import { useCallback, useEffect, useState } from "react";
import { buildCreateSurveyURL } from "./_url_builders.ts";

export type SurveyCreationType = {
  title: string;
  welcome_message: string;
  submit_message: string;
  publish_notification: { title: string; message: string };
  soon_to_expire_notification: { title: string; message: string };
  questions: (
    | {
        message: string;
        type: "single-choice";
        choices: string[];
      }
    | {
        message: string;
        type: "multiple-choice";
        choices: string[];
      }
    | {
        message: string;
        type: "open-ended";
        max_length: number;
      }
  )[];
};

const useFetchCreateSurvey = () => {
  const { fetchItem, isError, statusCode } = useFetchItem<never>();
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const fetchCreateSurvey = useCallback(
    async (data: SurveyCreationType, token: string) => {
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
