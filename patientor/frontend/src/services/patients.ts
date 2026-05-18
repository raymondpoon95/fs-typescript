import axios, { isAxiosError } from "axios";
import { Entry, Patient, PatientFormValues } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);
  return data;
};

const getPatient = async (id: string) => {
  const { data } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(`${apiBaseUrl}/patients`, object);

  return data;
};

const creatNewEntry = async (id: string, object: Entry) => {
  try {
    const { data } = await axios.post(`${apiBaseUrl}/patients/${id}/entries`, object);
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      const message = Array.isArray(error.response?.data?.error)
        ? error.response.data.error.map((e: any) => e.message).join(", ")
        : error.response?.data?.error?.message || error.message || "Unknown error";

      throw new Error(message);
    } else {
      throw new Error("Error with new entry");
    }
  }
};

export default {
  getAll,
  create,
  getPatient,
  creatNewEntry,
};
