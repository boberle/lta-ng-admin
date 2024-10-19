import ContentPane from "../../main_pane/ContentPane.tsx";
import { Link } from "react-router-dom";
import LoadingComponent from "../../common/LoadingComponent.tsx";
import ErrorComponent from "../../common/ErrorComponent.tsx";
import { useCallback, useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth.ts";
import styles from "../../../styles/common.module.css";
import useFetchGroups from "../../../hooks/fetch_groups.ts";
import { User } from "@firebase/auth";
import useFetchDeleteGroup from "../../../hooks/fetch_group_delete.ts";

const GroupList = () => {
  const { groups, fetchGroups, isLoading, isError } = useFetchGroups();
  const { user, isLoading: isUserLoading } = useAuth();
  const [key, setKey] = useState<number>(0);

  useEffect(() => {
    const f = async () => {
      if (user == null) return;
      const token = await user.getIdToken();
      fetchGroups(token);
    };
    f();
  }, [fetchGroups, user, key]);

  const handleDelete = useCallback(async () => {
    setKey((v) => v + 1);
  }, [setKey]);

  if (isLoading || isUserLoading) return <LoadingComponent />;

  if (isError || user == null) return <ErrorComponent />;

  if (groups == null) return <div>No groups found.</div>;

  const handleEdit = async (groupId: string) => {
    console.log(groupId);
  };

  return (
    <ContentPane title="Groups">
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {groups.map((group) => (
            <tr key={group.id}>
              <td>
                <Link to={`/groups/${group.id}/`}>{group.name}</Link>
              </td>
              <td>
                <button onClick={() => handleEdit(group.id)}>Edit</button>
                <DeleteGroup
                  user={user}
                  groupId={group.id}
                  onDelete={handleDelete}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="groups/new/">Create new group</Link>
    </ContentPane>
  );
};

const DeleteGroup = ({
  user,
  groupId,
  onDelete,
}: {
  user: User;
  groupId: string;
  onDelete: () => void;
}) => {
  const { fetchDeleteGroup, isError, isSuccess } = useFetchDeleteGroup();

  const handleDelete = async () => {
    if (user == null) return;
    const token = await user.getIdToken();
    await fetchDeleteGroup(groupId, token);
  };

  useEffect(() => {
    if (isError) alert("Failed to delete group");
  }, [isError]);

  useEffect(() => {
    if (isSuccess) onDelete();
  }, [isSuccess, onDelete]);

  return <button onClick={handleDelete}>Delete</button>;
};

export default GroupList;
