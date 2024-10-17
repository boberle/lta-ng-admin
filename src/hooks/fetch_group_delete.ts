import { useCallback, useEffect, useState } from "react";
import { buildDeleteGroupURL } from "./_url_builders.ts";
import useFetch from "./_fetch.ts";

const useFetchDeleteGroup = () => {
  const { isLoading, isError, statusCode, fetchData } = useFetch(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const fetchDeleteGroup = useCallback(
    async (groupId: string, token: string) => {
      const url = buildDeleteGroupURL(groupId);
      fetchData(url, { method: "DELETE", token });
    },
    [fetchData],
  );

  useEffect(() => {
    setIsSuccess(statusCode === 200);
  }, [statusCode]);

  return {
    fetchDeleteGroup,
    isError,
    isLoading,
    isSuccess,
  };
};

export default useFetchDeleteGroup;
