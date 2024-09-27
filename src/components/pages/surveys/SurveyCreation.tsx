import LoadingComponent from "../../common/LoadingComponent.tsx";
import useAuth from "../../../hooks/useAuth.ts";
import { useEffect, useState } from "react";
import ContentPane from "../../main_pane/ContentPane.tsx";
import useFetchCreateSurvey, {
  SurveyCreationType,
} from "../../../hooks/fetch_survey_create.ts";
import { Link, useNavigate } from "react-router-dom";

const sampleJSONSurvey: string = `{
  "title": "Sample first survey!",
  "welcome_message": "Welcome to our survey!",
  "submit_message": "Thank you for your participation!",
  "publish_notification": {
    "title": "Hey",
    "message": "Survey published!"
  },
  "soon_to_expire_notification": {
    "title": "Hey",
    "message": "Survey soon to expire!"
  },
  "questions": [
    {
      "message": "What is your favorite color?",
      "type": "single-choice",
      "choices": [
        "Red",
        "Blue",
        "Green",
        "Yellow"
      ]
    },
    {
      "message": "What is your favorite music genre?",
      "type": "single-choice",
      "choices": [
        "Rock",
        "Pop",
        "Hip-hop",
        "Jazz"
      ]
    },
    {
      "message": "What are your favorite fruits?",
      "type": "multiple-choice",
      "choices": [
        "Apple",
        "Banana",
        "Orange",
        "Pineapple"
      ]
    },
    {
      "message": "Tell us about your travel experiences.",
      "type": "open-ended",
      "max_length": 200
    }
  ]
}`;

const convert = (dao: string): SurveyCreationType => {
  try {
    const data = JSON.parse(dao);
    const survey = {
      title: data.title,
      welcome_message: data.welcome_message,
      submit_message: data.submit_message,
      publish_notification: {
        title: data.publish_notification.title,
        message: data.publish_notification.message,
      },
      soon_to_expire_notification: {
        title: data.soon_to_expire_notification.title,
        message: data.soon_to_expire_notification.message,
      },
      questions: data.questions.map((question: any) => {
        if (question.type === "single-choice") {
          if (question.choices.length === 0) {
            throw new Error("Single-choice question has no choices");
          }
          return {
            type: "single-choice",
            message: question.message,
            choices: question.choices,
          };
        } else if (question.type === "multiple-choice") {
          if (question.choices.length === 0) {
            throw new Error("Multiple-choice question has no choices");
          }
          return {
            type: "multiple-choice",
            message: question.message,
            choices: question.choices,
          };
        } else if (question.type === "open-ended") {
          if (question.max_length === 0) {
            throw new Error("Open-ended question has no max length");
          }
          return {
            type: "open-ended",
            message: question.message,
            max_length: question.max_length,
          };
        } else {
          throw new Error("Invalid question type");
        }
      }),
    };
    if (
      survey.welcome_message.length === 0 ||
      survey.submit_message.length === 0 ||
      survey.publish_notification.title.length === 0 ||
      survey.publish_notification.message.length === 0 ||
      survey.soon_to_expire_notification.title.length === 0 ||
      survey.soon_to_expire_notification.message.length === 0
    ) {
      throw new Error("Survey data is invalid");
    }
    for (const question of survey.questions) {
      if (question.message.length === 0) {
        throw new Error("Question message is empty");
      }
    }
    return survey;
  } catch {
    throw new Error("Failed to convert DAO to survey list");
  }
};

const checkValidity = (data: string): boolean => {
  try {
    convert(data);
    return true;
  } catch {
    return false;
  }
};

const SurveyCreation = () => {
  const { user: authenticatedUser, isLoading: isUserLoading } = useAuth();
  const [userInput, setUserInput] = useState<string>(sampleJSONSurvey);
  const [isValid, setIsValid] = useState<boolean>(false);
  const {
    isError: isCreationError,
    isSuccess: isCreationSuccess,
    fetchCreateSurvey,
  } = useFetchCreateSurvey();
  const navigate = useNavigate();

  useEffect(() => {
    setIsValid(checkValidity(userInput));
  }, [userInput]);

  useEffect(() => {
    if (isCreationError) {
      alert("Failed to create survey. Please try again.");
    }
  }, [isCreationError]);

  useEffect(() => {
    if (isCreationSuccess) {
      navigate("/surveys/");
    }
  }, [navigate, isCreationSuccess]);

  if (isUserLoading || authenticatedUser == null) return <LoadingComponent />;

  const handleSubmit = async () => {
    if (authenticatedUser == null) return;
    const token = await authenticatedUser.getIdToken();
    if (!isValid) return;
    await fetchCreateSurvey(convert(userInput), token);
  };

  return (
    <ContentPane title="New survey">
      <p>
        <Link to="/surveys/">Back to list</Link>
      </p>
      <div>
        <textarea
          style={{ width: "100%", height: "400px" }}
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
      </div>
      <div>
        <button onClick={handleSubmit} disabled={!isValid}>
          Submit
        </button>
      </div>
    </ContentPane>
  );
};

export default SurveyCreation;
