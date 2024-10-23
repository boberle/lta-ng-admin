import BaseQuestionLayout, { QuestionProps } from "./BaseQuestionLayout";
import { useEffect, useState } from "react";
import Text from "../../Text.tsx";
import View from "../../View.tsx";

export type MultipleChoicesQuestionProps = QuestionProps & {
  choices: string[];
  initialValues: number[] | null;
  onChange: (indices: number[] | null) => void;
};

const MultipleChoiceQuestion = ({
  message,
  onNext,
  onPrevious,
  onChange,
  choices,
  initialValues,
  enableNextButton,
}: MultipleChoicesQuestionProps) => {
  const [selectedIndices, setSelectedIndices] = useState<boolean[]>(() => {
    const values = Array(choices.length).fill(false);
    if (initialValues != null) {
      for (const index of initialValues) {
        values[index] = true;
      }
    }
    return values;
  });

  useEffect(() => {
    const selected = selectedIndices.reduce(
      (acc: number[], v: boolean, i: number) => (v ? [...acc, i] : acc),
      [],
    );
    if (selected.length === 0) {
      onChange(null);
    } else {
      onChange(selected);
    }
  }, [selectedIndices]);

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
            checked={selectedIndices[index]}
            onChange={(e) =>
              setSelectedIndices((prev) => {
                const newValues = [...prev];
                newValues[index] = e.target.checked;
                return newValues;
              })
            }
            style={styles.checkbox}
          />
          {choice}
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
};

export default MultipleChoiceQuestion;
