export interface ICall {
  _id: string;
  businessId: string;
  callId: string;
  summary: string;
  status: "completed" | "missed" | "voicemail" | "in_progress";
  recordingUrl: string;
  durationMs: number;
  durationSeconds: number;
  durationMinutes: number;
  customerPhoneNumber: string;
  createdAt: string;
  updatedAt: string;
}

export interface CallListResponse {
  success: boolean;
  message: string;
  data: ICall[];
}

export interface CallDetailResponse {
  success: boolean;
  message: string;
  data: ICall;
}
