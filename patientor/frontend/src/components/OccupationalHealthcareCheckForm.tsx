import { TextField } from "@mui/material";
import { SickLeave } from "../types";
import { DatePicker } from "@mui/x-date-pickers";
import { PickerValue } from "@mui/x-date-pickers/internals";

interface OccupationalHealthcareCheckFormProps {
  employerName: string;
  setEmployerName: React.Dispatch<React.SetStateAction<string>>;
  setSickLeave: React.Dispatch<React.SetStateAction<SickLeave>>;
}

const OccupationalHealthcareCheckForm = ({ employerName, setEmployerName, setSickLeave }: OccupationalHealthcareCheckFormProps) => {
  const handleStartDateChange = (value: PickerValue) => {
    setSickLeave((prevState) => ({
      ...prevState,
      startDate: value?.format("YYYY-MM-DD").toString() ?? "",
    }));
  };

  const handleEndDateChange = (value: PickerValue) => {
    setSickLeave((prevState) => ({
      ...prevState,
      endDate: value?.format("YYYY-MM-DD").toString() ?? "",
    }));
  };

  return (
    <div>
      <div style={{ marginTop: "1rem" }}>
        <TextField
          id="employerName"
          label="employerName"
          value={employerName}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setEmployerName(event.target.value);
          }}
          sx={{ width: "100%", marginY: "1rem" }}
        />
      </div>

      <div style={{ marginTop: "1rem" }}>
        <DatePicker label="start date" onChange={handleStartDateChange} sx={{ width: "100%" }} />
      </div>

      <div style={{ marginTop: "1rem" }}>
        <DatePicker label="end date" onChange={handleEndDateChange} sx={{ width: "100%" }} />
      </div>
    </div>
  );
};

export default OccupationalHealthcareCheckForm;
