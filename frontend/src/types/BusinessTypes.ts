/* eslint-disable @typescript-eslint/no-explicit-any */
export type BusinessDetailsType = {
  _id?: string;
  name: string;
  overview?: string;
  hasPublish: boolean;
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
  callTransferSettings: {
    enabled: boolean;
    scenarios: ITransferScenario[];
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

export interface ITransferScenario {
  _id?: string;
  name: string;
  phoneNumber: string;
  warmTransfer: boolean;
  availability: "always" | "business_hours" | "custom" | "none";
  customHours?: IBusinessHour[];
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
