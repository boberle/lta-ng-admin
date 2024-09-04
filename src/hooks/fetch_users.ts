import useFetchItem from "./_fetch_item.ts";

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
  } catch {
    throw new Error("Failed to convert DAO to user list");
  }
};

const useFetchUsers = () => {
  const { item, fetchItem, isLoading, isError } =
    useFetchItem<UserListItemType[]>(convertDAOToUserList);

  return {
    users: item,
    fetchUsers: fetchItem,
    isLoading,
    isError,
  };
};

export default useFetchUsers;
