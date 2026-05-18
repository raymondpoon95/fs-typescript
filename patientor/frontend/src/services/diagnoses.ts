import axios from "axios";

import { apiBaseUrl } from "../constants";
import { Diagnosis } from "../types";

const getDiagnoses = async () => {
  const response = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`);

  return response.data;
};

export default {
  getDiagnoses,
};
