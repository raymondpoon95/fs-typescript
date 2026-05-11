// export type Weather = "sunny" | "rainy" | "cloudy" | "windy" | "stormy";

// export type Visibility = "great" | "good" | "ok" | "poor";

// export interface DiaryEntry {
//   id: number;
//   date: string;
//   weather: Weather;
//   visibility: Visibility;
//   comment?: string;
// }

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
}

export type PatientWithoutSSN = Omit<Patient, "ssn">;

// export type NonSensitiveDiaryEntry = Omit<DiaryEntry, "comment">;
