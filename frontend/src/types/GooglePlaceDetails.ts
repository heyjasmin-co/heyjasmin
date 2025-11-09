export interface PlaceTimePeriod {
  date: string; // e.g. "2025-11-09"
  day: number; // 0 (Sunday) - 6 (Saturday)
  time: string; // "HHmm" format, e.g. "1300" = 1:00 PM
}

export interface PlaceOpeningPeriod {
  open: PlaceTimePeriod;
  close: PlaceTimePeriod;
}

export interface CurrentOpeningHours {
  open_now: boolean;
  periods: PlaceOpeningPeriod[];
  weekday_text: string[];
}
export interface BusinessSummary {
  language: string;
  overview: string;
}
export interface GooglePlaceDetails {
  current_opening_hours?: CurrentOpeningHours;
  editorial_summary?: BusinessSummary;
  formatted_address: string;
  icon?: string;
  name: string;
  types: string[];
  website?: string;
  html_attributions: string[];
}
