/* eslint-disable @typescript-eslint/no-explicit-any */
export type CallType = {
  _id: string;
  businessId: string;
  callId: string;
  summary: string;
  status: "completed" | "missed" | "voicemail" | "in_progress";
  recordingUrl: string;
  durationMs?: number;
  durationSeconds?: number;
  durationMinutes?: number;
  customerPhoneNumber?: string;
  createdAt: Date;
  updatedAt: Date;
};
export type CallsType = CallType[];
