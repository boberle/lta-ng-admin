export const isSingleChoiceQuestion = (
  question: any,
): question is SingleChoiceQuestion => {
  return question.type === "singleChoice";
};

export const isMultipleChoiceQuestion = (
  question: any,
): question is MultipleChoiceQuestion => {
  return question.type === "multipleChoice";
};

export const isOpenEndedQuestion = (
  question: any,
): question is OpenEndedQuestion => {
  return question.type === "openEnded";
};
