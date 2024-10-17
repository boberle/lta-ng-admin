type UserListItemType = {
  id: string;
  emailAddress: string;
  deviceOSes: string[];
};

type UserDetailsType = {
  id: string;
  emailAddress: string;
  createdAt: Date;
  devices: {
    token: string;
    os: string;
    version?: string;
    firstConnection: Date;
    lastConnection: Date;
  }[];
};

type UserAssignmentListItemType = {
  id: string;
  title: string;
  createdAt: Date;
  openedAt?: Date;
  submittedAd?: Date;
};

type SurveyListItemType = {
  id: string;
  title: string;
};

type SurveyQuestionListItemType = {
  message: string;
  type: "single-choice" | "multiple-choice" | "open-ended";
};

type SurveyDetailsType = {
  id: string;
  title: string;
  questions: SurveyQuestionListItemType[];
};

type TimeRangeType = {
  startTime: number;
  endTime: number;
};

type ScheduleListItemType = {
  id: string;
  surveyId: string;
  startDate: Date;
  endDate: Date;
  timeRanges: TimeRangeType[];
  userIds: string[];
  groupIds: string[];
};

type GroupListItemType = {
  id: string;
  name: string;
};
