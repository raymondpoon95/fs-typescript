import { Box, Card, CardContent } from "@mui/material";
import { CheckDetailsProps } from "../../types";

const HospitalCheck = ({ allDiagnosesCodes, entry }: CheckDetailsProps) => {
  const codeDetails = (codes: string) =>
    allDiagnosesCodes.find(({ code }) => code === codes);

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

            <div>Diagnose by {entry?.specialist}</div>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default HospitalCheck;
