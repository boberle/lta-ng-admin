import { useEffect, useState } from "react";
import Welcome from "./Welcome";
import SingleChoiceQuestion from "./question/SingleChoiceQuestion";
import Submit from "./Submit";
import MultipleChoiceQuestion from "./question/MultipleChoiceQuestion";
import OpenEndedQuestion from "./question/OpenEndedQuestion";
import {
  isMultipleChoiceQuestion,
  isOpenEndedQuestion,
  isSingleChoiceQuestion,
} from "../../types/guards";
import useFetchAssignment from "../../hooks/fetch_assigment";
import { useParams } from "react-router-dom";

export type AssignmentProps = {
  onClose: () => void;
};

const Assigment = ({ onClose }: AssignmentProps) => {
  const { assignment, isError, isLoading, fetchAssignment } =
    useFetchAssignment();
  const { userId } = useParams<string>();
  const { assignmentId } = useParams<string>();

  useEffect(() => {
    const f = async () => {
      fetchAssignment(userId!, assignmentId!);
    };
    f();
  }, [fetchAssignment, assignmentId, userId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || assignment == null) {
    return <div>An error occurred...</div>;
  }

  if (assignment.expiredAt < new Date()) {
    return <div>This assignment has expired.</div>;
  }

  return (
    <Assigment_ userId={userId!} assignment={assignment} onClose={onClose} />
  );
};

export type _AssignmentProps = {
  userId: string;
  assignment: AssignmentType;
  onClose: () => void;
};

const Assigment_ = ({ userId, assignment, onClose }: _AssignmentProps) => {
  const [position, setPosition] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(AnswerType | null)[]>(() =>
    Array(assignment.questions.length).fill(null),
  );

  const handleNext = () => {
    setPosition((v) => (v == null ? null : v + 1));
  };

  const handlePrevious = () => {
    setPosition((v) => (v == null || v === 0 ? null : v - 1));
  };

  const handleChange = (answer: AnswerType | null) => {
    if (position == null) return;
    setAnswers((prev) => {
      const newAnswers = [...prev];
      newAnswers[position] = answer;
      return newAnswers;
    });
  };

  const isValidAnswer = (index?: number): boolean => {
    if (position == null) {
      return true;
    }
    if (index == null) {
      index = position;
    }
    return answers[index] != null;
  };

  const areValidAnswers = () => {
    return answers.every((answer) => answer != null);
  };

  if (position == null) {
    return (
      <Welcome
        message={assignment.welcomeMessage}
        onClose={onClose}
        onStart={() => setPosition(0)}
      />
    );
  } else if (position >= assignment.questions.length) {
    if (!areValidAnswers()) {
      return (
        <div>Une erreur s'est produite. Les réponses ne sont pas valides.</div>
      );
    }
    return (
      <Submit
        userId={userId}
        message={assignment.submitMessage}
        assignmentId={assignment.id}
        answers={answers as AnswerType[]}
        onSubmit={onClose}
        onPrevious={handlePrevious}
        enableNextButton={areValidAnswers()}
      />
    );
  } else {
    const question = assignment.questions[position];
    if (isSingleChoiceQuestion(question)) {
      return (
        <SingleChoiceQuestion
          key={position}
          message={question.message}
          choices={question.choices!}
          onNext={handleNext}
          onPrevious={handlePrevious}
          onChange={handleChange}
          enableNextButton={isValidAnswer()}
          initialValue={answers[position] as number | null}
        />
      );
    } else if (isMultipleChoiceQuestion(question)) {
      return (
        <MultipleChoiceQuestion
          key={position}
          message={question.message}
          choices={question.choices!}
          onNext={handleNext}
          onPrevious={handlePrevious}
          onChange={handleChange}
          enableNextButton={isValidAnswer()}
          initialValues={answers[position] as number[] | null}
        />
      );
    } else if (isOpenEndedQuestion(question)) {
      return (
        <OpenEndedQuestion
          key={position}
          message={question.message}
          initialValue={answers[position] as string | null}
          onNext={handleNext}
          onPrevious={handlePrevious}
          onChange={handleChange}
          enableNextButton={isValidAnswer()}
          maxLength={question.maxLength}
        />
      );
    } else {
      throw new Error("Unknown question type");
    }
  }
};

export default Assigment;
