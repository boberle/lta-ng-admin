import BaseQuestionLayout, { QuestionProps } from "./BaseQuestionLayout";
import { useEffect, useState } from "react";
import Text from "../../Text.tsx";
import View from "../../View.tsx";

export type MultipleChoicesQuestionProps = QuestionProps & {
  choices: string[];
  initialValues: MultipleChoiceAnswer | null;
  onChange: (indices: MultipleChoiceAnswer | null) => void;
  lastIsSpecify: boolean;
};

const MultipleChoiceQuestion = ({
  message,
  onNext,
  onPrevious,
  onChange,
  choices,
  initialValues,
  enableNextButton,
  lastIsSpecify,
}: MultipleChoicesQuestionProps) => {
  const [selectedIndices, setSelectedIndices] = useState<number[]>(
    initialValues?.selectedIndices ?? [],
  );
  const [specifiedAnswer, setSpecifiedAnswer] = useState<string>(
    initialValues?.specify ?? "",
  );

  const isLastQuestion = (index: number) => index === choices.length - 1;

  useEffect(() => {
    const buildAnswer = (): MultipleChoiceAnswer | null => {
      if (selectedIndices.length === 0) return null;
      if (lastIsSpecify && selectedIndices.some((v) => isLastQuestion(v))) {
        if (!specifiedAnswer) return null;
        return {
          type: "multipleChoice",
          selectedIndices,
          specify: specifiedAnswer,
        };
      }
      return {
        type: "multipleChoice",
        selectedIndices,
        specify: null,
      };
    };

    onChange(buildAnswer());
  }, [selectedIndices, specifiedAnswer]);

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
            checked={selectedIndices.includes(index)}
            onChange={(e) =>
              setSelectedIndices((prev) => {
                if (e.target.checked) {
                  if (!selectedIndices.includes(index)) return [...prev, index];
                }
                return prev.filter((v) => v !== index);
              })
            }
            style={styles.checkbox}
            id={`choice-${index}`}
          />
          <label htmlFor={`choice-${index}`}>{choice}</label>
          {lastIsSpecify && isLastQuestion(index) && (
            <input
              type="text"
              disabled={!selectedIndices.includes(index)}
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

export default MultipleChoiceQuestion;
