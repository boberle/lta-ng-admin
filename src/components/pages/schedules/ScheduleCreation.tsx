import LoadingComponent from "../../common/LoadingComponent.tsx";
import useAuth from "../../../hooks/useAuth.ts";
import { useEffect } from "react";
import ContentPane from "../../main_pane/ContentPane.tsx";
import { Link, useNavigate } from "react-router-dom";
import ScheduleCreationForm from "./ScheduleCreationForm.tsx";
import useFetchCreateSchedule, {
  ScheduleCreationType,
} from "../../../hooks/fetch_schedule_create.ts";

const ScheduleCreation = () => {
  const { user: authenticatedUser, isLoading: isUserLoading } = useAuth();
  const {
    isError: isCreationError,
    isSuccess: isCreationSuccess,
    fetchCreateSchedule,
  } = useFetchCreateSchedule();
  const navigate = useNavigate();

  useEffect(() => {
    if (isCreationError) {
      alert("Failed to create schedule. Please try again.");
    }
  }, [isCreationError]);

  useEffect(() => {
    if (isCreationSuccess) {
      navigate("schedules/");
    }
  }, [navigate, isCreationSuccess]);

  if (isUserLoading || authenticatedUser == null) return <LoadingComponent />;

  const handleSubmit = async (schedule: ScheduleCreationType) => {
    if (authenticatedUser == null) return;
    const token = await authenticatedUser.getIdToken();
    //if (!isValid) return;
    await fetchCreateSchedule(schedule, token);
  };

  return (
    <ContentPane title="New schedule">
      <p>
        <Link to="schedules/">Back to list</Link>
      </p>
      <ScheduleCreationForm onSubmit={handleSubmit} />
    </ContentPane>
  );
};

export default ScheduleCreation;
