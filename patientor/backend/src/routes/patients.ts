import { z } from "zod";
import express, { type Response, type Request, type NextFunction } from "express";

import patientsService from "../services/patientsService.ts";
import { NewPatientEntrySchema, type NewPatientEntry, type Patient, type NonSensitivePatient, EntrySchema, type Entry } from "../types.ts";

const router = express.Router();

router.get("/", (_req, res: Response<NonSensitivePatient[]>) => {
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
    next();
  } catch (error: unknown) {
    next(error);
  }
};

const newEntryParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    EntrySchema.parse(req.body);
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

router.post("/:id/entries", newEntryParser, (req: Request<{ id: string }, unknown, Entry>, res: Response) => {
  const addNewEntry = patientsService.addNewEntry(req.params.id, req.body);
  res.json(addNewEntry);
});

router.use(errorMiddleware);

export default router;
