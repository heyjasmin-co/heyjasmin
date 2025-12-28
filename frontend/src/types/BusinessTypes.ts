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
  appointmentSettings: {
    appointmentEnabled: boolean;
    appointmentMessage: string | null;
    schedulingLink: string | null;
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

export type BusinessAppointmentOutputType = {
  appointmentEnabled: boolean;
  appointmentMessage: string | null;
  schedulingLink: string | null;
} | null;
