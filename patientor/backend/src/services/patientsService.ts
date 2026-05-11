import patientsData from "../../data/patients.ts";
import type { Patient, PatientWithoutSSN } from "../types.ts";

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

const createPatient = (Object: unknown) => {
  if (!Object || typeof Object !== Object)
    throw new Error("Incorrect or missing data");

  // type check object

  // parse methods

  //return response
};

export default {
  getPatients,
  createPatient,
};
