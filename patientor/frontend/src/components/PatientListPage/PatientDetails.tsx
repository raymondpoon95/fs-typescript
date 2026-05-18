import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";

import patientService from "../../services/patients";
import { Diagnosis, Entry, Patient } from "../../types";
import diagnosesService from "../../services/diagnoses";
import HealthCheck from "./HealthCheck";
import HospitalCheck from "./HospitalCheck";
import OccupationalHealthcareCheck from "./OccupationalHealthcareCheck";
import { Button } from "@mui/material";
import AddNewEntryForm from "../EntryForm";

const PatientDetails = () => {
  const params = useParams();

  const [patientDetails, setPatientDetails] = useState<Patient>();
  const [allDiagnosesCodes, setAllDiagnosesCodes] = useState<Diagnosis[]>();
  const [addNewEntry, setAddNewEntry] = useState(false);

  useEffect(() => {
    const fetchPatientList = async () => {
      const patient = await patientService.getPatient(params?.id ?? "");
      setPatientDetails(patient);
    };

    const fetchDiagnosesList = async () => {
      const diagnoses = await diagnosesService.getDiagnoses();
      setAllDiagnosesCodes(diagnoses);
    };

    fetchPatientList();
    fetchDiagnosesList();
  }, []);

  if (!patientDetails || !allDiagnosesCodes) {
    return <div>Loading data...</div>;
  }

  const RenderChecksComponent = (entry: Entry) => {
    switch (entry.type) {
      case "HealthCheck":
        return <HealthCheck entry={entry} />;
      case "Hospital":
        return (
          <HospitalCheck allDiagnosesCodes={allDiagnosesCodes} entry={entry} />
        );

      case "OccupationalHealthcare":
        return (
          <OccupationalHealthcareCheck
            allDiagnosesCodes={allDiagnosesCodes}
            entry={entry}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <h1>
        {patientDetails.name}{" "}
        {patientDetails.gender === "male" ? <MaleIcon /> : <FemaleIcon />}
      </h1>
      ssn: {patientDetails.ssn}
      <br />
      occupation: {patientDetails.occupation}
      <br />
      Date of Birth: {patientDetails.dateOfBirth}
      <br />
      <div>
        <h2>Entries</h2>
        {patientDetails.entries.map((entry) => (
          <Fragment key={entry.id}>{RenderChecksComponent(entry)}</Fragment>
        ))}
      </div>
      {addNewEntry ? (
        <AddNewEntryForm setAddNewEntry={setAddNewEntry} />
      ) : (
        <Button
          variant="contained"
          color="primary"
          onClick={() => setAddNewEntry(true)}
        >
          Add new entry
        </Button>
      )}
    </div>
  );
};

export default PatientDetails;
