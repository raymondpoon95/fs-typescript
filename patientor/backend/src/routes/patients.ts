import express, { type Response } from "express";
import patientsService from "../services/patientsService.ts";
import type { PatientWithoutSSN } from "../types.ts";

const router = express.Router();

router.get("/", (_req, res: Response<PatientWithoutSSN[]>) => {
  res.send(patientsService.getPatients());
});

router.post("/", (_req, _res) => {
  // parse methods
  // type check req
  // check resonse
  //return response
});

export default router;
