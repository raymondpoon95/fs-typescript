import axios from "axios";
import type { Diary } from "./types";

const API_URL = "http://localhost:3000/api";

const getAllEntries = async () => {
  const response = await axios.get<Diary[]>(`${API_URL}/diaries`);
  return response.data;
};

const createNewDiaryEntry = async (data: Diary) => {
  try {
    const response = await axios.post(`${API_URL}/diaries`, {
      ...data,
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.status);
      console.log(error.response);

      const errors = error.response?.data?.error;

      if (Array.isArray(errors)) {
        const formattedErrors = errors.map((e) => `${e.path[0]}: ${e.message}`).join("\n");

        throw new Error(formattedErrors);
      }

      throw new Error("Request failed");
    } else {
      console.error(error);
    }
  }
};

export default {
  getAllEntries,
  createNewDiaryEntry,
};
