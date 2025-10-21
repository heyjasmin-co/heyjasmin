/* eslint-disable @typescript-eslint/no-explicit-any */
export type BusinessDetailsType = {
  name: string;
  overview?: string;
  address?: string;
  website: string;
  services: string[];
  businessHours: IBusinessHour[];
  stripeCustomerId?: string | null;
  stripeSubscriptionId?: string | null;
  subscriptionStatus?:
    | "trialing"
    | "active"
    | "past_due"
    | "canceled"
    | "incomplete"
    | "incomplete_expired"
    | "unpaid";
  subscriptionPlan?: "core" | "pro" | "smart" | "infinity";
  subscriptionStartDate?: Date | null;
  subscriptionEndDate?: Date | null;
  ownerUserId: string;
  aiAgentSettings: {
    agentId?: string;
    agentNumber?: string;
    trainingData?: Record<string, any>;
    voiceSettings?: Record<string, any>;
    customInstructions?: string;
  };
  isSetupComplete: boolean;
  createdAt: Date;
  updatedAt: Date;
};
export interface IBusinessHour {
  day:
    | "Monday"
    | "Tuesday"
    | "Wednesday"
    | "Thursday"
    | "Friday"
    | "Saturday"
    | "Sunday";
  start: string;
  end: string;
  isOpen: boolean;
}

