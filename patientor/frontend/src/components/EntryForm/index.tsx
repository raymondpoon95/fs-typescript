import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";

interface AddNewEntryFormProps {
  setAddNewEntry: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddNewEntryForm = ({ setAddNewEntry }: AddNewEntryFormProps) => {
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [specialist, setSpecialist] = useState<string>("");

  const [diagnosisCodes, setDiagnosisCodes] = useState<string>();

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    const diagnosesCodeArray = diagnosisCodes?.split(",");
  };

  return (
    <form>
      <Box sx={{ width: "100%", flexDirection: "column" }}>
        AddNewEntryForm
        <div>
          <TextField
            id="date"
            label="date"
            value={date}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setDate(event.target.value);
            }}
            sx={{ width: "100%", marginBottom: "1rem", marginTop: "1rem" }}
          />
        </div>
        <div>
          <TextField
            id="specialist"
            label="specialist"
            value={specialist}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setSpecialist(event.target.value);
            }}
            sx={{ width: "100%", marginBottom: "1rem" }}
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
          <TextField
            id="diagnosisCodes"
            label="diagnosisCodes"
            value={diagnosisCodes}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setDiagnosisCodes(event.target.value);
            }}
            sx={{ width: "100%", marginBottom: "1rem" }}
          />
        </div>
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

          <Button
            variant="contained"
            color="primary"
            onClick={() => setAddNewEntry(false)}
          >
            Cancel
          </Button>
        </div>
      </Box>
    </form>
  );
};

export default AddNewEntryForm;
