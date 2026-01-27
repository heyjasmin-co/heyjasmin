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

export interface SubscriptionDetails {
  plan: "essential" | "pro" | "plus" | "trial";
  remainingMinutes: number | "unlimited";
  remainingMinutesFormatted: string;
  usedMinutes: number;
  stripePriceId: string | null;
  status:
    | "trial_active"
    | "trial_ended"
    | "canceled"
    | "active"
    | "inactive"
    | "unpaid";
}

export interface UserData {
  dbUserId: string | null;
  clerkId: string | null;
  businessId: string | null;
  isSetupComplete: boolean;
  role: string | null;
  assistantNumber: string | null;
  businessName: string | null;
  subscription: SubscriptionDetails | null;
}
