import { Box, Card, CardContent } from "@mui/material";
import { HealthCheckEntry } from "../../types";

interface HealthCheckProps {
  entry: HealthCheckEntry;
}

const HealthCheck = ({ entry }: HealthCheckProps) => {
  return (
    <>
      Health Check
      <Box sx={{ minWidth: 275, marginBottom: 1 }}>
        <Card variant="outlined" sx={{ minHeight: "100%" }}>
          <CardContent sx={{ flexDirection: "column", gap: 10 }}>
            <div>{entry?.date}</div>
            <span style={{ fontStyle: "italic" }}> {entry?.description}</span>
            <div>Health rating {entry.healthCheckRating}</div>
            <div>Diagnose by {entry?.specialist}</div>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default HealthCheck;
