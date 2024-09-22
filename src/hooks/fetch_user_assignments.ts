import useFetchItem from "./_fetch_item.ts";
import { useCallback } from "react";
import { buildGetUserAssignmentListURL } from "./_url_builders.ts";

type UserAssignmentListResponse = {
  assignments: UserAssignmentListItemResponse[];
};

type UserAssignmentListItemResponse = {
  id: string;
  title: string;
  created_at: Date;
  opened_at?: Date;
  submitted_at?: Date;
};

const convertDAOToUserAssignmentList = (
  dao: UserAssignmentListResponse,
): UserAssignmentListItemType[] => {
  try {
    return dao.assignments.map((item: UserAssignmentListItemResponse) => ({
      id: item.id,
      title: item.title,
      createdAt: new Date(item.created_at),
      openedAt: item.opened_at ? new Date(item.opened_at) : undefined,
      submittedAd: item.submitted_at ? new Date(item.submitted_at) : undefined,
    }));
  } catch {
    throw new Error("Failed to convert DAO to user list");
  }
};

const useFetchUserAssignmentList = () => {
  const { item, fetchItem, isLoading, isError } = useFetchItem<
    UserAssignmentListItemType[]
  >(convertDAOToUserAssignmentList);

  const fetchUserAssignmentList = useCallback(
    (userId: string, token: string) => {
      const url = buildGetUserAssignmentListURL(userId);
      fetchItem(url, { token });
    },
    [fetchItem],
  );

  return {
    assignments: item,
    fetchUserAssignmentList,
    isLoading,
    isError,
  };
};

export default useFetchUserAssignmentList;
