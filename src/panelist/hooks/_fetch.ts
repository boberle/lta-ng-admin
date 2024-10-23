import { useCallback, useState } from "react";

type JsonData = { [key: string]: any };

type FetchDataOptions = {
  method?: string;
  jsonData?: JsonData;
  transformer?: (data: any) => any;
  token?: string;
};

type UseFetchReturnType = {
  data: JsonData | null;
  isLoading: boolean;
  isError: boolean;
  statusCode: number | null;
  fetchData: (url: URL, options: FetchDataOptions) => void;
};

const useFetch = (defaultIsLoading: boolean = false): UseFetchReturnType => {
  const [data, setData] = useState<JsonData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(defaultIsLoading);
  const [isError, setIsError] = useState<boolean>(false);
  const [statusCode, setStatusCode] = useState<number | null>(null);

  const fetchData = useCallback(
    async (url: URL, options: FetchDataOptions = { method: "GET" }) => {
      setIsError(false);
      setIsLoading(true);
      setStatusCode(null);

      const headers: { [key: string]: string } = {};
      const fetchOptions: { [key: string]: any } = {
        method: options.method,
        headers: headers,
      };

      if (options.token != null) {
        fetchOptions.headers["Authorization"] = `Bearer ${options.token}`;
      }

      if (options.jsonData != null) {
        fetchOptions.headers["Content-Type"] = "application/json";
        fetchOptions["body"] = JSON.stringify(options.jsonData);
      }

      try {
        const response = await fetch(url.href, fetchOptions);
        setStatusCode(response.status);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const json = await response.json();
        setData(options.transformer ? options.transformer(json) : json);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  return { data, isLoading, isError, statusCode, fetchData };
};

export default useFetch;
