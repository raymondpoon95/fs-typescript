import React from "react";
import { Discharge } from "../types";
import { DatePicker } from "@mui/x-date-pickers";
import { PickerValue } from "@mui/x-date-pickers/internals";
import { TextField } from "@mui/material";

interface HospitalCheckFormProps {
  discharge: Discharge;
  setDischarge: React.Dispatch<React.SetStateAction<Discharge>>;
}

const HospitalCheckForm = ({ discharge, setDischarge }: HospitalCheckFormProps) => {
  const handleDateChange = (value: PickerValue) => {
    setDischarge((prevState) => ({
      ...prevState,
      date: value?.format("YYYY-MM-DD").toString() || "",
    }));
  };

  return (
    <>
      <div style={{ marginTop: "1rem" }}>
        <DatePicker label="Discharge date" onChange={handleDateChange} sx={{ width: "100%" }} />
      </div>

      <div style={{ marginTop: "1rem" }}>
        <TextField
          id="criteria"
          label="criteria"
          value={discharge.criteria}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setDischarge((prevState) => ({
              ...prevState,
              criteria: event.target.value,
            }));
          }}
          sx={{ width: "100%", marginY: "1rem" }}
        />{" "}
      </div>
    </>
  );
};

export default HospitalCheckForm;
