import diagnosisData from "../../data/diagnosis.ts";
import type { Diagnosis } from "../types.ts";

const diagnosis = diagnosisData as Diagnosis[];

const getDiagnosises = (): Diagnosis[] => {
  return diagnosis;
};

export default {
  getDiagnosises,
};
