import ContentPane from "../../main_pane/ContentPane.tsx";
import { Link } from "react-router-dom";
import LoadingComponent from "../../common/LoadingComponent.tsx";
import ErrorComponent from "../../common/ErrorComponent.tsx";
import { useEffect } from "react";
import useAuth from "../../../hooks/useAuth.ts";
import styles from "../../../styles/common.module.css";
import useFetchSurveys from "../../../hooks/fetch_surveys.ts";

const SurveyList = () => {
  const { surveys, fetchSurveys, isLoading, isError } = useFetchSurveys();
  const { user, isLoading: isUserLoading } = useAuth();

  useEffect(() => {
    const f = async () => {
      if (user == null) return;
      const token = await user.getIdToken();
      fetchSurveys(token);
    };
    f();
  }, [fetchSurveys, user]);

  if (isLoading || isUserLoading) return <LoadingComponent />;

  if (isError) return <ErrorComponent />;

  if (surveys == null) return <div>No surveys found.</div>;

  return (
    <ContentPane title="Surveys">
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {surveys.map((survey) => (
            <tr key={survey.id}>
              <td>
                <Link to={`surveys/${survey.id}/`}>{survey.title}</Link>
              </td>
              <td></td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="surveys/new/">Create new survey</Link>
    </ContentPane>
  );
};

export default SurveyList;
