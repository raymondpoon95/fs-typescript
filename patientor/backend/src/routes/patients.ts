import { z } from "zod";
import express, { type Response, type Request, type NextFunction } from "express";

import patientsService from "../services/patientsService.ts";
import { NewPatientEntrySchema, type NewPatientEntry, type Patient, type PatientWithoutSSN } from "../types.ts";

const router = express.Router();

router.get("/", (_req, res: Response<PatientWithoutSSN[]>) => {
  res.send(patientsService.getPatients());
});

router.get("/:id", (req, res) => {
  const patient = patientsService.getPatient(req.params.id);
  if (patient) {
    res.json(patient);
  } else {
    res.status(404).send({ Error: "patient not found" });
  }
});

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    NewPatientEntrySchema.parse(req.body);
    console.log(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => {
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};

router.post("/", newPatientParser, (req: Request<unknown, unknown, NewPatientEntry>, res: Response<Patient>) => {
  const addNewPatient = patientsService.addNewPatient(req.body);
  res.json(addNewPatient);
});

router.use(errorMiddleware);

export default router;
