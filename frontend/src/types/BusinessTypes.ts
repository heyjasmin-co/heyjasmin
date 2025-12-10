/* eslint-disable @typescript-eslint/no-explicit-any */
export type BusinessDetailsType = {
  _id?: string;
  name: string;
  overview?: string;
  address?: string;
  website?: string;
  services: string[];
  businessHours: IBusinessHour[];
  totalCallMinutes: number;
  stripeSettings?: {
    stripeCustomerId?: string | null;
    stripeSubscriptionId?: string | null;
    subscriptionStatus?:
      | "trial_active"
      | "trial_end"
      | "active"
      | "canceled"
      | "inactive"
      | "unpaid";
    subscriptionPlan?: "essential" | "pro" | "plus" | null;
    stripePriceId?: string | null;
    subscriptionStartDate?: Date | null;
    subscriptionEndDate?: Date | null;
  };

  ownerUserId?: string;

  aiAgentSettings?: {
    assistantId?: string;
    assistantName?: string;
    assistantPhoneNumberId?: string;
    assistantSetup?: string;
    twilioNumber?: string;
    twilioId?: string;
    trainingData?: Record<string, any>;
    voiceSettings?: Record<string, any>;
    customInstructions?: string;
  };

  clerkOrganizationId?: string;
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

export interface BusinessCreationType {
  id: string;
  name: string;
  messageAudio: any;
  greetingAudio: any;
}
