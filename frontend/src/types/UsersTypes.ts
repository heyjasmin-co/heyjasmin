/* eslint-disable @typescript-eslint/no-explicit-any */
export type UserDetailsType = {
  clerkId: string;
  email: string;
  firstName: string;
  lastName: string;
  profileImage: string;
  createdAt: Date;
  updatedAt: Date;
};

export type UserBusinessesType = {
  _id: string;
  role: string;
  businessId: string;
  businessName: string;
}[];
