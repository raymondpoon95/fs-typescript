import { Box, Card, CardContent } from "@mui/material";
import { Diagnosis, HospitalEntry } from "../../types";

interface HospitalCheckProps {
  entry: HospitalEntry;
  allDiagnosesCodes: Diagnosis[];
}

const HospitalCheck = ({ allDiagnosesCodes, entry }: HospitalCheckProps) => {
  const codeDetails = (codes: string) => allDiagnosesCodes.find(({ code }) => code === codes);

  return (
    <>
      Hospital Check
      <Box sx={{ minWidth: 275, marginBottom: 1 }}>
        <Card variant="outlined" sx={{ minHeight: "100%" }}>
          <CardContent sx={{ flexDirection: "column", gap: 10 }}>
            <div>{entry?.date}</div>
            <span style={{ fontStyle: "italic" }}> {entry?.description}</span>

            {entry?.diagnosisCodes?.map((codes) => (
              <li key={codes}>
                {codes} {codeDetails?.name}
              </li>
            ))}

            {entry?.discharge && (
              <div>
                {entry?.discharge.date} - {entry?.discharge.criteria}
              </div>
            )}

            <div>Diagnose by {entry?.specialist}</div>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default HospitalCheck;
