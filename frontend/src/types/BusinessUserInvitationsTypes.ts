/* eslint-disable @typescript-eslint/no-explicit-any */
export type BusinessUserInvitationsType = {
  _id: string;
  businessId: string;
  clerKInvitationId: string;
  email: string;
  role: "editor" | "admin" | "viewer";
  status: "active" | "pending" | "removed";
  createdAt: Date;
  updatedAt: Date;
};
