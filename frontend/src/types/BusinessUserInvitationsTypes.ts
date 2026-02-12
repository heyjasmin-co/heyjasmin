export type BusinessUserInvitationsType = {
  _id: string;
  businessId: string;
  invitationToken: string;
  email: string;
  role: "editor" | "admin" | "viewer" | "owner";
  status: "active" | "pending" | "removed" | "accepted" | "expired";
  createdAt: Date;
  updatedAt: Date;
};
