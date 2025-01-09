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

type BaseQuestionType = {
  message: string;
  conditions: { [key: number]: null };
};

type SingleChoiceQuestion = BaseQuestionType & {
  type: "singleChoice";
  choices: string[];
  lastIsSpecify: boolean;
};

type MultipleChoiceQuestion = BaseQuestionType & {
  type: "multipleChoice";
  choices: string[];
  lastIsSpecify: boolean;
};

type OpenEndedQuestion = BaseQuestionType & {
  type: "openEnded";
  maxLength?: number;
  optional: boolean;
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
  expiredAt: Date;
};

type SingleChoiceAnswer = {
  type: "singleChoice";
  selectedIndex: number;
  specify: string | null;
};

type MultipleChoiceAnswer = {
  type: "multipleChoice";
  selectedIndices: number[];
  specify: string | null;
};

type OpenEndedAnswer = {
  type: "openEnded";
  value: string;
};
