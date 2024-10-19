import ContentPane from "../../main_pane/ContentPane.tsx";
import { Link } from "react-router-dom";
import LoadingComponent from "../../common/LoadingComponent.tsx";
import ErrorComponent from "../../common/ErrorComponent.tsx";
import { useCallback, useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth.ts";
import styles from "../../../styles/common.module.css";
import useFetchSchedules from "../../../hooks/fetch_schedules.ts";
import { secondsToTime } from "../../../hooks/utils.ts";
import useFetchDeleteSchedule from "../../../hooks/fetch_schedule_delete.ts";
import { User } from "@firebase/auth";

const ScheduleList = () => {
  const { schedules, fetchSchedules, isLoading, isError } = useFetchSchedules();
  const { user, isLoading: isUserLoading } = useAuth();
  const [key, setKey] = useState<number>(0);

  useEffect(() => {
    const f = async () => {
      if (user == null) return;
      const token = await user.getIdToken();
      fetchSchedules(token);
    };
    f();
  }, [fetchSchedules, user, key]);

  const handleDelete = useCallback(async () => {
    setKey((v) => v + 1);
  }, [setKey]);

  if (isLoading || isUserLoading) return <LoadingComponent />;

  if (isError || user == null) return <ErrorComponent />;

  if (schedules == null) return <div>No schedules found.</div>;

  return (
    <ContentPane title="Surveys">
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Survey Id</th>
            <th>Start date</th>
            <th>End date</th>
            <th>Time Ranges</th>
            <th>User ids</th>
            <th>Group ids</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {schedules.map((schedule) => (
            <tr key={schedule.id}>
              <td>{schedule.surveyId}</td>
              <td>{schedule.startDate.toLocaleDateString()}</td>
              <td>{schedule.endDate.toLocaleDateString()}</td>
              <td>
                {schedule.timeRanges.map((range) => (
                  <p>
                    {secondsToTime(range.startTime)} -{" "}
                    {secondsToTime(range.endTime)}
                  </p>
                ))}
              </td>
              <td>
                {schedule.userIds.map((userId) => (
                  <p>{userId}</p>
                ))}
              </td>
              <td>
                {schedule.groupIds.map((groupId) => (
                  <p>{groupId}</p>
                ))}
              </td>
              <td>
                <DeleteSchedule
                  user={user}
                  scheduleId={schedule.id}
                  onDelete={handleDelete}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="schedules/new/">Create new schedule</Link>
    </ContentPane>
  );
};

const DeleteSchedule = ({
  user,
  scheduleId,
  onDelete,
}: {
  user: User;
  scheduleId: string;
  onDelete: () => void;
}) => {
  const { fetchDeleteSchedule, isError, isSuccess } = useFetchDeleteSchedule();

  const handleDelete = async () => {
    if (user == null) return;
    const token = await user.getIdToken();
    await fetchDeleteSchedule(scheduleId, token);
  };

  useEffect(() => {
    if (isError) alert("Failed to delete schedule");
  }, [isError]);

  useEffect(() => {
    if (isSuccess) onDelete();
  }, [isSuccess, onDelete]);

  return <button onClick={handleDelete}>Delete</button>;
};

export default ScheduleList;
