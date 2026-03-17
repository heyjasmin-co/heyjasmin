export interface IUser {
  _id: string;
  clerkId: string;
  email: string;
  firstName: string;
  lastName: string;
  profileImage: string;
  businessCount?: number;
  createdAt: string;
  updatedAt: string;
}

export interface IBusinessUser {
  _id: string;
  businessId: string;
  userId: string | IUser;
  role: "editor" | "admin" | "viewer" | "owner";
  status: "active" | "pending" | "removed";
  email?: string;
  name?: string;
  businessName?: string;
  createdAt: string;
  updatedAt: string;
}

export interface IBusinessUserInvitation {
  _id: string;
  businessId: string;
  email: string;
  role: "editor" | "admin" | "viewer";
  invitationToken: string;
  expiresAt: string;
  status: "active" | "pending" | "removed" | "accepted" | "expired";
  createdAt: string;
  updatedAt: string;
}

export interface UserMeResponse {
  success: boolean;
  message: string;
  data: {
    user: IUser;
    businessUser?: IBusinessUser;
  };
}
