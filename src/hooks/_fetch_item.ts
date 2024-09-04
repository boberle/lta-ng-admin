import { useCallback, useEffect, useState } from "react";
import useFetch from "./_fetch";
import { buildGetUserListURL } from "./_url_builders";

const useFetchItem = <T>(converter: (o: any) => T) => {
  const { data, isLoading, isError: isFetchError, fetchData } = useFetch(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [item, setItem] = useState<T | null>(null);

  const fetchItem = useCallback(
    async (token: string) => {
      setIsError(false);
      const url = buildGetUserListURL();
      fetchData(url, { token });
    },
    [fetchData],
  );

  useEffect(() => {
    if (data === null) {
      setItem(null);
      return;
    }
    try {
      const convertedData = converter(data);
      setItem(convertedData);
    } catch (error) {
      console.log(error);
      setIsError(true);
    }
  }, [data]);

  useEffect(() => {
    setIsError((prev) => prev || isFetchError);
  }, [isFetchError]);

  return {
    item,
    fetchItem,
    isLoading,
    isError,
  };
};

export default useFetchItem;
