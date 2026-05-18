import { Diagnosis, OccupationalHealthcareEntry } from "../../types";
import { Box, Card, CardContent } from "@mui/material";

interface OccupationalHealthcareCheckProps {
  allDiagnosesCodes: Diagnosis[];
  entry: OccupationalHealthcareEntry;
}

const OccupationalHealthcareCheck = ({ allDiagnosesCodes, entry }: OccupationalHealthcareCheckProps) => {
  const codeDetails = (codes: string) => allDiagnosesCodes.find(({ code }) => code === codes);

  return (
    <>
      Occupational Healthcare Check
      <Box sx={{ minWidth: 275, marginBottom: 1 }}>
        <Card variant="outlined" sx={{ minHeight: "100%" }}>
          <CardContent sx={{ flexDirection: "column", gap: 10 }}>
            <div>{entry?.date}</div>
            <span style={{ fontStyle: "italic" }}> {entry?.description}</span>
            <div>Employer Name {entry.employerName}</div>

            {entry?.diagnosisCodes?.map((codes) => (
              <li key={codes}>
                {codes} {codeDetails?.name}
              </li>
            ))}

            <div>Diagnose by {entry?.specialist}</div>

            {entry?.sickLeave && (
              <div>
                <div>Sick leave start date: {entry.sickLeave.startDate}</div>
                <div>Sick leave start date: {entry.sickLeave.endDate}</div>
              </div>
            )}
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default OccupationalHealthcareCheck;
