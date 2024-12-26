import BaseQuestionLayout, { QuestionProps } from "./BaseQuestionLayout";
import { useEffect, useState } from "react";
import Text from "../../Text.tsx";
import View from "../../View.tsx";

export type SingleChoiceQuestionProps = QuestionProps & {
  choices: string[];
  initialValue: SingleChoiceAnswer | null;
  onChange: (answer: SingleChoiceAnswer | null) => void;
  lastIsSpecify: boolean;
};

const SingleChoiceQuestion = ({
  message,
  onNext,
  onPrevious,
  onChange,
  choices,
  initialValue,
  enableNextButton,
  lastIsSpecify,
}: SingleChoiceQuestionProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(
    initialValue?.selectedIndex ?? null,
  );
  const [specifiedAnswer, setSpecifiedAnswer] = useState<string>(
    initialValue?.specify ?? "",
  );

  const isLastQuestion = (index: number) => index === choices.length - 1;

  useEffect(() => {
    const buildAnswer = (): SingleChoiceAnswer | null => {
      if (selectedIndex == null) return null;

      if (lastIsSpecify && isLastQuestion(selectedIndex)) {
        if (!specifiedAnswer) return null;
        return {
          type: "singleChoice",
          selectedIndex,
          specify: specifiedAnswer,
        };
      }
      return {
        type: "singleChoice",
        selectedIndex,
        specify: null,
      };
    };
    onChange(buildAnswer());
  }, [selectedIndex, specifiedAnswer]);

  return (
    <BaseQuestionLayout
      iconType={"single"}
      onNext={onNext}
      onPrevious={onPrevious}
      enableNextButton={enableNextButton}
    >
      <Text style={styles.message}>{message}</Text>
      {choices.map((choice, index) => (
        <View key={index} style={styles.checkboxContainer}>
          <input
            type="checkbox"
            checked={index === selectedIndex}
            onChange={() => setSelectedIndex(index)}
            style={styles.checkbox}
            id={`choice-${index}`}
          />
          <label htmlFor={`choice-${index}`}>{choice}</label>
          {lastIsSpecify && isLastQuestion(index) && (
            <input
              type="text"
              disabled={selectedIndex != null && !isLastQuestion(selectedIndex)}
              value={specifiedAnswer}
              onChange={(e) => setSpecifiedAnswer(e.target.value)}
              style={styles.specifyInput}
              maxLength={30}
            />
          )}
        </View>
      ))}
    </BaseQuestionLayout>
  );
};

const styles = {
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    margin: 8,
  },
  message: {
    marginBottom: 20,
  },
  specifyInput: {
    marginLeft: 10,
  },
};

export default SingleChoiceQuestion;
