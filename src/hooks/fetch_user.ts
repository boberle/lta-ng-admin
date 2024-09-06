import useFetchItem from "./_fetch_item.ts";
import { useCallback } from "react";
import { buildGetUserURL } from "./_url_builders.ts";

type UserDetailsResponse = {
  id: string;
  email_address: string;
  created_at: string;
  devices: {
    token: string;
    last_connection: string;
  }[];
};

const convertDAOToUserDetails = (dao: UserDetailsResponse): UserDetailsType => {
  try {
    return {
      id: dao.id,
      emailAddress: dao.email_address,
      createdAt: new Date(dao.created_at),
      devices: dao.devices.map((device) => ({
        token: device.token,
        lastConnection: new Date(device.last_connection),
      })),
    };
  } catch {
    throw new Error("Failed to convert DAO to user details");
  }
};

const useFetchUser = () => {
  const { item, fetchItem, isLoading, isError } = useFetchItem<UserDetailsType>(
    convertDAOToUserDetails,
  );

  const fetchUser = useCallback(
    (userId: string, token: string) => {
      const url = buildGetUserURL(userId);
      fetchItem(url, { token });
    },
    [fetchItem],
  );

  return {
    user: item,
    fetchUser,
    isLoading,
    isError,
  };
};

export default useFetchUser;
