import { Link, useParams } from "react-router-dom";
import LoadingComponent from "../../common/LoadingComponent.tsx";
import ErrorComponent from "../../common/ErrorComponent.tsx";
import useAuth from "../../../hooks/useAuth.ts";
import { useEffect } from "react";
import ContentPane from "../../main_pane/ContentPane.tsx";
import useFetchSurvey from "../../../hooks/fetch_survey.ts";

const SurveyDetails = () => {
  const { survey, fetchSurvey, isLoading, isError } = useFetchSurvey();
  const { user: authenticatedUser, isLoading: isUserLoading } = useAuth();
  const { surveyId } = useParams<string>();

  useEffect(() => {
    const f = async () => {
      if (surveyId == null) return;
      if (authenticatedUser == null) return;
      const token = await authenticatedUser.getIdToken();
      fetchSurvey(surveyId, token);
    };
    f();
  }, [authenticatedUser, fetchSurvey, surveyId]);

  if (isLoading || isUserLoading || authenticatedUser == null)
    return <LoadingComponent />;

  if (isError || surveyId == null) return <ErrorComponent />;

  if (survey == null) return <div>No survey found.</div>;

  return (
    <ContentPane title="Survey details">
      <p>
        <Link to="surveys/">Back to list</Link>
      </p>
      <h2>{survey.title}</h2>
      <p>Questions:</p>
      <ul>
        {survey.questions.map((question, index) => (
          <li key={index}>
            {question.message} ({question.type})
          </li>
        ))}
      </ul>
    </ContentPane>
  );
};

export default SurveyDetails;
