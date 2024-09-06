import useFetchItem from "./_fetch_item.ts";
import { useCallback } from "react";
import { buildGetUserListURL } from "./_url_builders.ts";

type UserListResponse = {
  users: UserListItemResponse[];
};

type UserListItemResponse = {
  id: string;
  email_address: string;
  created_at: string;
};

const convertDAOToUserList = (dao: UserListResponse): UserListItemType[] => {
  try {
    return dao.users.map((item: UserListItemResponse) => ({
      id: item.id,
      emailAddress: item.email_address,
      createdAt: new Date(item.created_at),
    }));
  } catch {
    throw new Error("Failed to convert DAO to user list");
  }
};

const useFetchUsers = () => {
  const { item, fetchItem, isLoading, isError } =
    useFetchItem<UserListItemType[]>(convertDAOToUserList);

  const fetchUsers = useCallback(
    (token: string) => {
      const url = buildGetUserListURL();
      fetchItem(url, { token });
    },
    [fetchItem],
  );

  return {
    users: item,
    fetchUsers,
    isLoading,
    isError,
  };
};

export default useFetchUsers;
