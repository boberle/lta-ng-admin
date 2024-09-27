import { useCallback, useEffect, useState } from "react";
import { buildDeleteScheduleURL } from "./_url_builders.ts";
import useFetch from "./_fetch.ts";

const useFetchDeleteSchedule = () => {
  const { isLoading, isError, statusCode, fetchData } = useFetch(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const fetchDeleteSchedule = useCallback(
    async (scheduleId: string, token: string) => {
      const url = buildDeleteScheduleURL(scheduleId);
      fetchData(url, { method: "DELETE", token });
    },
    [fetchData],
  );

  useEffect(() => {
    setIsSuccess(statusCode === 200);
  }, [statusCode]);

  return {
    fetchDeleteSchedule,
    isError,
    isLoading,
    isSuccess,
  };
};

export default useFetchDeleteSchedule;
