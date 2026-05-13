import { z } from "zod";

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export const Gender = {
  Male: "male",
  Female: "female",
  Other: "other",
} as const;

export const NewPatientEntrySchema = z.object({
  name: z.string(),
  dateOfBirth: z.iso.date(),
  ssn: z.string(),
  gender: z.enum(Gender),
  occupation: z.string(),
});

export type Gender = (typeof Gender)[keyof typeof Gender];

export type PatientWithoutSSN = Omit<Patient, "ssn" | "gender" | "occupation">;

export type NewPatientEntry = z.infer<typeof NewPatientEntrySchema>;

export interface Patient extends NewPatientEntry {
  id: string;
}
