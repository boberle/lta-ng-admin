import LoadingComponent from "../../common/LoadingComponent.tsx";
import ErrorComponent from "../../common/ErrorComponent.tsx";
import { ReactElement, useEffect } from "react";
import styles from "../../../styles/common.module.css";
import useFetchUserAssignmentList from "../../../hooks/fetch_user_assignments.ts";
import { User } from "@firebase/auth";

const UserAssignmentList = ({
  authenticatedUser,
  userId,
}: {
  authenticatedUser: User;
  userId: string;
}): ReactElement => {
  const { assignments, fetchUserAssignmentList, isLoading, isError } =
    useFetchUserAssignmentList();

  useEffect(() => {
    const f = async () => {
      if (authenticatedUser == null) return;
      const token = await authenticatedUser.getIdToken();
      fetchUserAssignmentList(userId, token);
    };
    f();
  }, [authenticatedUser, fetchUserAssignmentList]);

  if (isLoading) return <LoadingComponent />;

  if (isError || assignments == null) return <ErrorComponent />;

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>id</th>
          <th>title</th>
          <th>created at</th>
          <th>last opened at</th>
          <th>submitted at</th>
        </tr>
      </thead>
      <tbody>
        {assignments.map((assignment) => (
          <tr key={assignment.id}>
            <td>{assignment.id}</td>
            <td>{assignment.title}</td>
            <td>{assignment.createdAt.toLocaleString()}</td>
            <td>
              {assignment.openedAt ? assignment.openedAt.toLocaleString() : "-"}
            </td>
            <td>
              {assignment.submittedAd
                ? assignment.submittedAd.toLocaleString()
                : "-"}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserAssignmentList;
