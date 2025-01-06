import BaseQuestionLayout, { QuestionProps } from "./BaseQuestionLayout";
import { useEffect, useState } from "react";
import Text from "../../Text.tsx";

export type OpenEndedQuestionProps = QuestionProps & {
  initialValue: OpenEndedAnswer | null;
  onChange: (value: OpenEndedAnswer | null) => void;
  maxLength?: number;
  optional: boolean;
};

const OpenEndedQuestion = ({
  message,
  onNext,
  onPrevious,
  onChange,
  initialValue,
  enableNextButton,
  maxLength = 100,
  optional,
}: OpenEndedQuestionProps) => {
  const [value, setValue] = useState<string>(initialValue?.value ?? "");

  useEffect(() => {
    let answer: OpenEndedAnswer | null;
    if (!optional && value.length === 0) {
      answer = null;
    } else {
      answer = { type: "openEnded", value };
    }
    onChange(answer);
  }, [value]);

  return (
    <BaseQuestionLayout
      iconType="open-ended"
      onNext={onNext}
      onPrevious={onPrevious}
      enableNextButton={enableNextButton}
    >
      <Text style={styles.message}>{message}</Text>
      <textarea
        style={styles.input}
        onChange={(e) => setValue(e.target.value.trim())}
        value={value}
        maxLength={maxLength}
      ></textarea>
      <Text style={styles.characterCount}>
        {value.length}/{maxLength}
      </Text>
    </BaseQuestionLayout>
  );
};

const styles = {
  message: {
    marginBottom: 20,
  },
  input: {
    textAlignVertical: "top",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    height: 150,
    marginBottom: 5,
  },
  characterCount: {
    fontSize: 12,
    color: "#999",
    marginBottom: 20,
    alignSelf: "flex-end",
  },
};

export default OpenEndedQuestion;
