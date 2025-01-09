import Text from "../Text";
import useSubmitAssignment from "../../hooks/fetch_submit";
import BaseQuestionLayout from "./question/BaseQuestionLayout";
import { ReactElement, useEffect } from "react";

export type SubmitProps = {
  message: string;
  userId: string;
  assignmentId: string;
  answers: (
    | SingleChoiceAnswer
    | MultipleChoiceAnswer
    | OpenEndedAnswer
    | null
  )[];
  onSubmit: () => void;
  onPrevious: () => void;
  enableNextButton: boolean;
};

const Submit = ({
  message,
  userId,
  assignmentId,
  answers,
  onSubmit,
  onPrevious,
  enableNextButton,
}: SubmitProps) => {
  const { submitAssignment, isLoading, isError, isTooLate, isSubmitted } =
    useSubmitAssignment();

  const handleSubmit = async () => {
    submitAssignment(userId, assignmentId, answers);
  };

  useEffect(() => {
    if (isSubmitted) {
      onSubmit();
    }
  }, [isSubmitted]);

  let messageElement: ReactElement = (
    <Text style={styles.message}>{message}</Text>
  );

  if (isLoading) {
    messageElement = <div>Loading...</div>;
  }

  let nextHandler: () => void | Promise<void> = handleSubmit;
  let nextButtonLabel = "Envoyer";

  if (isError) {
    messageElement = (
      <Text style={styles.message}>
        An error occurred while submitting your answers. Please try again later.
      </Text>
    );
    nextButtonLabel = "Réessayer";
  }

  if (isTooLate) {
    messageElement = (
      <Text style={styles.message}>
        Oops.... This assignment is too late to submit.
      </Text>
    );
    nextButtonLabel = "Fermer";
    nextHandler = onSubmit;
  }

  return (
    <BaseQuestionLayout
      iconType={"done"}
      onNext={nextHandler}
      onPrevious={onPrevious}
      nextButtonLabel={nextButtonLabel}
      enableNextButton={enableNextButton}
    >
      {messageElement}
    </BaseQuestionLayout>
  );
};

const styles = {
  message: {
    marginBottom: 20,
  },
};

export default Submit;
