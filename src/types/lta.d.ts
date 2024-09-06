type UserListItemType = {
  id: string;
  emailAddress: string;
  createdAt: Date;
};

type UserDetailsType = {
  id: string;
  emailAddress: string;
  createdAt: Date;
  devices: {
    token: string;
    lastConnection: Date;
  }[];
};
