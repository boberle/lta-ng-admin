import { Link, useParams } from "react-router-dom";
import useFetchUser from "../../../hooks/fetch_user.ts";
import LoadingComponent from "../../common/LoadingComponent.tsx";
import ErrorComponent from "../../common/ErrorComponent.tsx";
import useAuth from "../../../hooks/useAuth.ts";
import { useEffect } from "react";
import ContentPane from "../../main_pane/ContentPane.tsx";

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

  if (isLoading || isUserLoading) return <LoadingComponent />;

  if (isError || userId == null) return <ErrorComponent />;

  if (user == null) return <div>No user found.</div>;

  return (
    <ContentPane title="User details">
      <p>
        <Link to="/users">Back to list</Link>
      </p>
      <h2>{user.emailAddress}</h2>
      <p>Id: {user.id}</p>
      <p>Created at: {user.createdAt.toLocaleString()}</p>
      <p>Devices:</p>
      <ul>
        {user.devices.map((device) => (
          <li key={device.token}>
            {device.token}, last connection:{" "}
            {device.lastConnection.toDateString()}
          </li>
        ))}
      </ul>
    </ContentPane>
  );
};

export default UserDetails;
