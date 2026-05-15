import { v4 as uuidv4 } from "uuid";
import patientsData from "../../data/patients.ts";
import type { NewPatientEntry, Patient, PatientWithoutSSN } from "../types.ts";

const patients = patientsData as Patient[];

const getPatients = (): PatientWithoutSSN[] => {
  return patients.map(({ dateOfBirth, gender, id, name, occupation }) => ({
    dateOfBirth,
    gender,
    id,
    name,
    occupation,
  }));
};

const getPatient = (id: string): Patient | undefined => {
  return patients.find((patient) => patient.id === id);
};

const addNewPatient = (patient: NewPatientEntry): Patient => {
  const newPatient = {
    ...patient,
    id: uuidv4(),
  };

  patients.push(newPatient);

  return newPatient;
};

export default {
  getPatients,
  addNewPatient,
  getPatient,
};
