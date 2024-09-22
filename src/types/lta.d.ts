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
