/* eslint-disable @typescript-eslint/no-explicit-any */
export type BusinessUserType = {
  _id: string;
  role: string;
  status: string;
  email: string;
  name: string;
  businessName: string;
};
export type BusinessUsersDetailsType = BusinessUserType[];
