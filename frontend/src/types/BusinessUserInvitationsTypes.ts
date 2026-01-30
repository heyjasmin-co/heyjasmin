/* eslint-disable @typescript-eslint/no-explicit-any */
export type BusinessUserInvitationsType = {
  _id: string;
  businessId: string;
  invitationToken: string;
  email: string;
  role: "editor" | "admin" | "viewer" | "owner";
  status: "active" | "pending" | "removed";
  createdAt: Date;
  updatedAt: Date;
};
