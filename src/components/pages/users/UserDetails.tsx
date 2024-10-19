import { Link, useParams } from "react-router-dom";
import useFetchUser from "../../../hooks/fetch_user.ts";
import LoadingComponent from "../../common/LoadingComponent.tsx";
import ErrorComponent from "../../common/ErrorComponent.tsx";
import useAuth from "../../../hooks/useAuth.ts";
import { useEffect } from "react";
import ContentPane from "../../main_pane/ContentPane.tsx";
import styles from "../../../styles/common.module.css";
import UserAssignmentList from "./UserAssignmentList.tsx";

const UserDetails = () => {
  const { user, fetchUser, isLoading, isError } = useFetchUser();
  const { user: authenticatedUser, isLoading: isUserLoading } = useAuth();
  const { userId } = useParams<string>();

  useEffect(() => {
    const f = async () => {
      if (userId == null) return;
      if (authenticatedUser == null) return;
      const token = await authenticatedUser.getIdToken();
      fetchUser(userId, token);
    };
    f();
  }, [authenticatedUser, fetchUser, userId]);

  if (isLoading || isUserLoading || authenticatedUser == null)
    return <LoadingComponent />;

  if (isError || userId == null) return <ErrorComponent />;

  if (user == null) return <div>No user found.</div>;

  return (
    <ContentPane title="User details">
      <p>
        <Link to="users">Back to list</Link>
      </p>
      <h2>{user.emailAddress}</h2>
      <p>Firebase id: {user.id}</p>
      <p>Created at: {user.createdAt.toLocaleString()}</p>
      <p>Devices:</p>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Token</th>
            <th>OS</th>
            <th>Version</th>
            <th>First connection</th>
            <th>Last connection</th>
          </tr>
        </thead>
        <tbody>
          {user.devices.map((device) => (
            <tr key={device.token}>
              <td>{device.token}</td>
              <td>{device.os}</td>
              <td>{device.version || "-"}</td>
              <td>{device.firstConnection.toLocaleString()}</td>
              <td>{device.lastConnection.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>Assignments:</p>
      <UserAssignmentList
        authenticatedUser={authenticatedUser}
        userId={userId}
      />
    </ContentPane>
  );
};

export default UserDetails;
