import { v4 as uuidv4 } from "uuid";
import patientsData from "../../data/patients.ts";
import type {
  NewPatientEntry,
  Patient,
  NonSensitivePatient,
  Entry,
} from "../types.ts";

const patients = patientsData as Patient[];

const getPatients = (): NonSensitivePatient[] => {
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

const addNewEntry = (patientId: string, entry: Entry) => {
  const newId: string = uuidv4();

  const newEntry = {
    ...entry,
    id: newId,
  };
  const idx: number = patientsData.findIndex(
    (patient) => patientId === patient.id,
  );
  if (idx === -1) {
    throw Error("Patient not found");
  } else {
    patientsData[idx]?.entries.push(newEntry);
    return newEntry;
  }
};

export default {
  getPatients,
  addNewPatient,
  getPatient,
  addNewEntry,
};
