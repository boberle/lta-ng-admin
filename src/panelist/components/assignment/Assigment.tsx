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
  const [answers, setAnswers] = useState<
    (SingleChoiceAnswer | MultipleChoiceAnswer | OpenEndedAnswer | null)[]
  >(() => Array(assignment.questions.length).fill(null));
  const [history, setHistory] = useState<(number | null)[]>([null]);

  const handleNext = () => {
    setHistory((prevHistory) => {
      const getNextPosition = () => {
        const v = prevHistory[prevHistory.length - 1];
        if (v == null) return null;
        const answer = answers[v];
        if (answer == null) return v;

        const question = assignment.questions[v];

        const getNextPositionFromConditions = (index: number) => {
          if (question.conditions[index] == null) {
            return answers.length;
          } else {
            return question.conditions[index];
          }
        };

        if (answer.type === "singleChoice") {
          if (answer.selectedIndex in question.conditions) {
            return getNextPositionFromConditions(answer.selectedIndex);
          }
        } else if (answer.type === "multipleChoice") {
          for (const index of answer.selectedIndices) {
            if (index in question.conditions) {
              return getNextPositionFromConditions(index);
            }
          }
        }

        return v + 1;
      };
      const nextPosition = getNextPosition();
      return [...prevHistory, nextPosition];
    });
  };

  const handlePrevious = () => {
    setHistory((prevHistory) => prevHistory.slice(0, -1));
  };

  const handleChange = (
    answer: SingleChoiceAnswer | MultipleChoiceAnswer | OpenEndedAnswer | null,
  ) => {
    const position = history[history.length - 1];
    if (position == null) return;
    setAnswers((prev) => {
      const newAnswers = [...prev];
      newAnswers[position] = answer;
      return newAnswers;
    });
  };

  const isAnswerValid = (index?: number): boolean => {
    const position = history[history.length - 1];
    if (position == null) {
      return true;
    }
    if (index == null) {
      index = position;
    }
    return answers[index] != null;
  };

  const position = history[history.length - 1];

  if (position == null) {
    return (
      <Welcome
        message={assignment.welcomeMessage}
        onClose={onClose}
        onStart={() => setHistory([null, 0])}
      />
    );
  } else if (position >= assignment.questions.length) {
    return (
      <Submit
        userId={userId}
        message={assignment.submitMessage}
        assignmentId={assignment.id}
        answers={
          answers as (
            | SingleChoiceAnswer
            | MultipleChoiceAnswer
            | OpenEndedAnswer
            | null
          )[]
        }
        onSubmit={onClose}
        onPrevious={handlePrevious}
        enableNextButton={true}
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
          enableNextButton={isAnswerValid()}
          initialValue={answers[position] as SingleChoiceAnswer | null}
          lastIsSpecify={question.lastIsSpecify}
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
          enableNextButton={isAnswerValid()}
          initialValues={answers[position] as MultipleChoiceAnswer | null}
          lastIsSpecify={question.lastIsSpecify}
        />
      );
    } else if (isOpenEndedQuestion(question)) {
      return (
        <OpenEndedQuestion
          key={position}
          message={question.message}
          initialValue={answers[position] as OpenEndedAnswer | null}
          onNext={handleNext}
          onPrevious={handlePrevious}
          onChange={handleChange}
          enableNextButton={isAnswerValid()}
          maxLength={question.maxLength}
          optional={question.optional}
        />
      );
    } else {
      throw new Error("Unknown question type");
    }
  }
};

export default Assigment;
