import express from "express";
import cors from "cors";
import diagnosisRouter from "./routes/diagnosis.ts";
import patientsRouter from "./routes/patients.ts";

const app = express();
app.use(express.json());
app.use(cors());

const apiBaseUrl = "/api";

const PORT = 3001;

app.get(`${apiBaseUrl}/ping`, (_req, res) => {
  console.log("someone pinged here");
  res.send("pong");
});

app.use(`${apiBaseUrl}/diagnoses`, diagnosisRouter);
app.use(`${apiBaseUrl}/patients`, patientsRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
