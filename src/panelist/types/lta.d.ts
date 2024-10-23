type AssignmentListItemType = {
  id: string;
  title: string;
  answered: boolean;
  date: Date;
};

type PendingAssignmentType = {
  id: string;
  expiredAt: Date;
};

type AssignmentListType = {
  assignments: AssignmentListItemType[];
  totalAssignments: number;
  answeredAssignments: number;
  pendingAssignment: PendingAssignmentType | null;
};

type AnswerType = string | number | number[];

type BaseQuestionType = {
  message: string;
};

type SingleChoiceQuestion = BaseQuestionType & {
  type: "singleChoice";
  choices: string[];
};

type MultipleChoiceQuestion = BaseQuestionType & {
  type: "multipleChoice";
  choices: string[];
};

type OpenEndedQuestion = BaseQuestionType & {
  type: "openEnded";
  maxLength?: number;
};

type AssignmentType = {
  id: string;
  welcomeMessage: string;
  submitMessage: string;
  questions: (
    | SingleChoiceQuestion
    | MultipleChoiceQuestion
    | OpenEndedQuestion
  )[];
};
