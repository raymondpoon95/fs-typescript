import { z } from "zod";
import express, { type Response } from "express";

import patientsService from "../services/patientsService.ts";
import { NewPatientEntrySchema, type PatientWithoutSSN } from "../types.ts";

const router = express.Router();

router.get("/", (_req, res: Response<PatientWithoutSSN[]>) => {
  res.send(patientsService.getPatients());
});

router.post("/", (req, res) => {
  try {
    const newPatientEntry = NewPatientEntrySchema.parse(req.body);
    const addNewPatient = patientsService.addNewPatient(newPatientEntry);
    res.json(addNewPatient);
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      res.status(400).send({ error: error.issues });
    }
    res.status(400).send({ error: "unkown error" });
  }
});

export default router;
