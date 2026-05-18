import { InputLabel, MenuItem, Select } from "@mui/material";
import { HealthCheckRating } from "../types";

interface HealthCheckFormProps {
  healthCheckRating: HealthCheckRating;
  setHealthCheckRating: React.Dispatch<React.SetStateAction<HealthCheckRating>>;
}

const HealthCheckForm = ({ healthCheckRating, setHealthCheckRating }: HealthCheckFormProps) => {
  return (
    <div>
      <InputLabel id="healthCheckRating">HealthCheck Rating</InputLabel>
      <Select labelId="healthCheckRating" id="healthCheckRating" label="healthCheckRating" value={healthCheckRating} fullWidth onChange={(event) => setHealthCheckRating(event.target.value)}>
        <MenuItem value={HealthCheckRating.Healthy}>{HealthCheckRating.Healthy}</MenuItem>
        <MenuItem value={HealthCheckRating.LowRisk}>{HealthCheckRating.LowRisk}</MenuItem>
        <MenuItem value={HealthCheckRating.HighRisk}>{HealthCheckRating.HighRisk}</MenuItem>
        <MenuItem value={HealthCheckRating.CriticalRisk}>{HealthCheckRating.CriticalRisk}</MenuItem>
      </Select>
    </div>
  );
};

export default HealthCheckForm;
