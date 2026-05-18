import { Box, Button, Chip, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useState } from "react";
import { Dayjs } from "dayjs";
import { Diagnosis, Discharge, Entry, HealthCheckRating, SickLeave } from "../../types";
import uuid4 from "uuid4";
import patientService from "../../services/patients";
import HospitalCheckForm from "../HospitalCheckForm";
import HealthCheckForm from "../HealthCheckForm";
import OccupationalHealthcareCheckForm from "../OccupationalHealthcareCheckForm";

interface AddNewEntryFormProps {
  patientId: string;
  setAddNewEntry: React.Dispatch<React.SetStateAction<boolean>>;
  allDiagnosesCodes: Diagnosis[];
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  slotProps: {
    paper: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  },
};

const AddNewEntryForm = ({ patientId, setAddNewEntry, allDiagnosesCodes }: AddNewEntryFormProps) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [entryType, setEntryType] = useState<Entry["type"]>("Hospital");

  const [date, setDate] = useState<Dayjs | null>();
  const [description, setDescription] = useState<string>("");
  const [specialist, setSpecialist] = useState<string>("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>();

  // health check
  const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(0);

  // hospital check
  const [discharge, setDischarge] = useState<Discharge>({
    date: "",
    criteria: "",
  });

  // occupational healthcare check
  const [employerName, setEmployerName] = useState<string>("");
  const [sickLeave, setSickLeave] = useState<SickLeave>({
    endDate: "",
    startDate: "",
  });

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    const dateToString = date?.format("YYYY-MM-DD").toString();

    const baseEntry = {
      id: uuid4(),
      date: dateToString ?? "",
      description,
      specialist,
      diagnosisCodes,
    };

    let newEntry: Entry;

    if (entryType === "Hospital") {
      newEntry = {
        ...baseEntry,
        type: entryType,
        discharge,
      };
    } else if (entryType === "OccupationalHealthcare") {
      newEntry = {
        ...baseEntry,
        type: entryType,
        employerName,
        sickLeave,
      };
    } else {
      newEntry = {
        ...baseEntry,
        type: entryType,
        healthCheckRating,
      };
    }

    try {
      const response = await patientService.creatNewEntry(patientId, newEntry);

      if (response) {
        setDate(null);
        setDescription("");
        setSpecialist("");
        setDiagnosisCodes([]);
        setHealthCheckRating(0);
        setDischarge({
          date: "",
          criteria: "",
        });
        setEmployerName("");
        setSickLeave({
          endDate: "",
          startDate: "",
        });
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      }
    }
  };

  const RenderTypeFields = () => {
    switch (entryType) {
      case "Hospital":
        return <HospitalCheckForm discharge={discharge} setDischarge={setDischarge} />;
      case "HealthCheck":
        return <HealthCheckForm healthCheckRating={healthCheckRating} setHealthCheckRating={setHealthCheckRating} />;
      case "OccupationalHealthcare":
        return <OccupationalHealthcareCheckForm employerName={employerName} setEmployerName={setEmployerName} setSickLeave={setSickLeave} />;
    }
  };

  const handleChange = (event: SelectChangeEvent<typeof diagnosisCodes>) => {
    const {
      target: { value },
    } = event;
    setDiagnosisCodes(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value,
    );
  };

  return (
    <form>
      <Box sx={{ width: "100%", flexDirection: "column" }}>
        AddNewEntryForm
        {errorMessage && <div style={{ marginTop: "1rem", marginBottom: "1rem", backgroundColor: "red", padding: "0.5rem", color: "white" }}>{errorMessage}</div>}
        <div style={{ marginTop: "1rem" }}>
          <DatePicker label="Date" onChange={(newValue) => setDate(newValue)} sx={{ width: "100%" }} />
        </div>
        <div>
          <TextField
            id="specialist"
            label="specialist"
            value={specialist}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setSpecialist(event.target.value);
            }}
            sx={{ width: "100%", marginY: "1rem" }}
          />
        </div>
        <div>
          <TextField
            id="description"
            label="description"
            value={description}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setDescription(event.target.value);
            }}
            sx={{ width: "100%", marginBottom: "1rem" }}
          />
        </div>
        <div>
          <InputLabel id="diagnosisCodes">Diagnosis Codes</InputLabel>
          <Select
            fullWidth
            labelId="diagnosisCodes-label"
            id="diagnosisCodes"
            multiple
            value={diagnosisCodes ?? []}
            onChange={handleChange}
            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {allDiagnosesCodes.map((code) => (
              <MenuItem key={code.code} value={code.code}>
                {code.code} - {code.name}
              </MenuItem>
            ))}
          </Select>
          {/* <TextField
            id="diagnosisCodes"
            label="diagnosisCodes"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setDiagnosisCodes(event.target.value);
            }}
            sx={{ width: "100%", marginBottom: "1rem" }}
          /> */}
        </div>
        <div>
          <InputLabel id="type">Type</InputLabel>
          <Select labelId="type" id="type" label="Age" value={entryType} fullWidth onChange={(event) => setEntryType(event.target.value as Entry["type"])}>
            <MenuItem value="Hospital">Hospital</MenuItem>
            <MenuItem value="HealthCheck">Health Check</MenuItem>
            <MenuItem value="OccupationalHealthcare">Occupational Healthcare</MenuItem>
          </Select>
        </div>
        <div>{RenderTypeFields()}</div>
        <br />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            gap: "8px",
          }}
        >
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Submit entry
          </Button>

          <Button variant="contained" color="primary" onClick={() => setAddNewEntry(false)}>
            Cancel
          </Button>
        </div>
      </Box>
    </form>
  );
};

export default AddNewEntryForm;
