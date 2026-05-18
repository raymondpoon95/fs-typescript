import { z } from "zod";

const HealthCheckRating = {
  Healthy: 0,
  LowRisk: 1,
  HighRisk: 2,
  CriticalRisk: 3,
} as const;

type HealthCheckRating = (typeof HealthCheckRating)[keyof typeof HealthCheckRating];

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

// Patient Types

const BaseEntrySchema = z.object({
  id: z.string(),
  description: z.string(),
  date: z.string(),
  specialist: z.string(),
  diagnosisCodes: z.array(z.string()).optional(),
});

export const EntryWithoutIdSchema = BaseEntrySchema.omit({
  id: true,
});

const HealthCheckRatingSchema = z.union([z.literal(HealthCheckRating.Healthy), z.literal(HealthCheckRating.LowRisk), z.literal(HealthCheckRating.HighRisk), z.literal(HealthCheckRating.CriticalRisk)]);

const SickLeaveSchema = z.object({
  startDate: z.string(),
  endDate: z.string(),
});

const DischargeSchema = z.object({
  date: z.string(),
  criteria: z.string(),
});

const HealthCheckEntrySchema = BaseEntrySchema.extend({
  type: z.literal("HealthCheck"),
  healthCheckRating: HealthCheckRatingSchema,
});

const OccupationalHealthcareEntrySchema = BaseEntrySchema.extend({
  type: z.literal("OccupationalHealthcare"),
  employerName: z.string(),
  sickLeave: SickLeaveSchema.optional(),
});

const HospitalEntrySchema = BaseEntrySchema.extend({
  type: z.literal("Hospital"),
  discharge: DischargeSchema,
});

export const EntrySchema = z.discriminatedUnion("type", [HealthCheckEntrySchema, OccupationalHealthcareEntrySchema, HospitalEntrySchema]);

export const NewPatientEntrySchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  dateOfBirth: z.iso.date(),
  ssn: z.string(),
  gender: z.enum(Gender),
  occupation: z.string(),
  entries: z.array(EntrySchema).optional(),
});

export type Gender = (typeof Gender)[keyof typeof Gender];

export type PatientWithoutSSN = Omit<Patient, "ssn" | "gender" | "occupation">;

export type NewPatientEntry = z.infer<typeof NewPatientEntrySchema>;

export type Entry = z.infer<typeof EntrySchema>;

export interface Patient {
  id: string;
  name: string;
  ssn: string;
  occupation: string;
  gender: Gender;
  dateOfBirth: string;
  entries: Entry[];
}

export type NonSensitivePatient = Omit<Patient, "ssn" | "entries">;
