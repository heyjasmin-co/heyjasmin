/* eslint-disable @typescript-eslint/no-explicit-any */
export type BusinessDetailsType = {
  _id?: string;
  name: string;
  overview?: string;
  address?: string;
  website?: string;
  services: string[];
  businessHours: IBusinessHour[];

  stripeCustomerId?: string | null;

  totalCallMinutes: number;

  ownerUserId?: string;
  aiAgentSettings: {
    assistantId?: string;
    assistantName?: string;
    assistantPhoneNumberId?: string;
    assistantSetup?: string;
    twilioNumber?: string;
    twilioId?: string;
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
