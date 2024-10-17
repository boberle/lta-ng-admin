import useFetchItem from "./_fetch_item.ts";
import { useCallback } from "react";
import { buildGetGroupListURL } from "./_url_builders.ts";

type GroupListResponse = {
  groups: GroupListItemResponse[];
};

type GroupListItemResponse = {
  id: string;
  name: string;
};

const convertDAOToGroupList = (dao: GroupListResponse): GroupListItemType[] => {
  try {
    return dao.groups.map((item: GroupListItemResponse) => ({
      id: item.id,
      name: item.name,
    }));
  } catch {
    throw new Error("Failed to convert DAO to group list");
  }
};

const useFetchGroups = () => {
  const { item, fetchItem, isLoading, isError } = useFetchItem<
    GroupListItemType[]
  >(convertDAOToGroupList);

  const fetchGroups = useCallback(
    (token: string) => {
      const url = buildGetGroupListURL();
      fetchItem(url, { token });
    },
    [fetchItem],
  );

  return {
    groups: item,
    fetchGroups,
    isLoading,
    isError,
  };
};

export default useFetchGroups;
