import BaseQuestionLayout, { QuestionProps } from "./BaseQuestionLayout";
import { useEffect, useState } from "react";
import Text from "../../Text.tsx";
import View from "../../View.tsx";

export type SingleChoiceQuestionProps = QuestionProps & {
  choices: string[];
  initialValue: number | null;
  onChange: (index: number) => void;
};

const SingleChoiceQuestion = ({
  message,
  onNext,
  onPrevious,
  onChange,
  choices,
  initialValue,
  enableNextButton,
}: SingleChoiceQuestionProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(
    initialValue,
  );

  useEffect(() => {
    if (selectedIndex != null) {
      onChange(selectedIndex);
    }
  }, [selectedIndex]);

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

export default SingleChoiceQuestion;
