import { useCallback, useEffect, useState } from "react";
import useFetch from "./_fetch";
import { buildGetUserListURL } from "./_url_builders";

type UserListItemResponse = {
  id: string;
  email_address: string;
  created_at: string;
};

const convertDAOToUserList = (dao: any): UserListItemType[] => {
  try {
    return dao.users.map((item: UserListItemResponse) => ({
      id: item.id,
      emailAddress: item.email_address,
      createdAt: new Date(item.created_at),
    }));
  } catch (error) {
    console.error("Failed to convert DAO to user list", error);
    throw new Error("Failed to convert DAO to user list");
  }
};

const useFetchUsers = () => {
  const { data, isLoading, isError: isFetchError, fetchData } = useFetch(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [users, setUsers] = useState<UserListItemType[] | null>(null);

  const fetchUsers = useCallback(
    async (token: string) => {
      setIsError(false);
      const url = buildGetUserListURL();
      fetchData(url, { token });
    },
    [fetchData],
  );

  useEffect(() => {
    if (data === null) {
      setUsers(null);
      return;
    }
    try {
      const convertedData = convertDAOToUserList(data);
      setUsers(convertedData);
    } catch (error) {
      console.log(error);
      setIsError(true);
    }
  }, [data]);

  useEffect(() => {
    setIsError((prev) => prev || isFetchError);
  }, [isFetchError]);

  return {
    users,
    fetchUsers,
    isLoading,
    isError,
  };
};

export default useFetchUsers;
