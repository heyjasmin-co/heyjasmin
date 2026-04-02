export interface NotificationRecipient {
  id: string;
  value: string; // email or phone number
}

export interface NotificationSettings {
  emailNotificationsEnabled: boolean;
  textNotificationsEnabled: boolean;
  emailRecipients: NotificationRecipient[];
  textRecipients: NotificationRecipient[];
}
