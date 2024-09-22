import ContentPane from "../../main_pane/ContentPane.tsx";
import { Link } from "react-router-dom";
import useFetchUsers from "../../../hooks/fetch_users.ts";
import LoadingComponent from "../../common/LoadingComponent.tsx";
import ErrorComponent from "../../common/ErrorComponent.tsx";
import { useEffect } from "react";
import useAuth from "../../../hooks/useAuth.ts";
import styles from "../../../styles/common.module.css";

const UserList = () => {
  const { users, fetchUsers, isLoading, isError } = useFetchUsers();
  const { user, isLoading: isUserLoading } = useAuth();

  useEffect(() => {
    const f = async () => {
      if (user == null) return;
      const token = await user.getIdToken();
      fetchUsers(token);
    };
    f();
  }, [fetchUsers, user]);

  if (isLoading || isUserLoading) return <LoadingComponent />;

  if (isError) return <ErrorComponent />;

  if (users == null) return <div>No users found.</div>;

  return (
    <ContentPane title="Users">
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Email address</th>
            <th>Devices</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}/`}>{user.emailAddress}</Link>
              </td>
              <td>{user.deviceOSes.join(", ")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </ContentPane>
  );
};

export default UserList;
