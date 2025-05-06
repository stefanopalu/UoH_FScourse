import { Diagnosis, OccupationalHealthcareEntry } from "../../types";
import { Card, CardContent, Typography, Box, List, ListItem, ListItemText } from "@mui/material";
import WorkIcon from "@mui/icons-material/Work";

interface OccupationalHealthcareEntryProps {
    entry: OccupationalHealthcareEntry;
    diagnoses: Diagnosis[] | null;
}

const OccupationalHealthcareEntryComponent = ( {entry, diagnoses}: OccupationalHealthcareEntryProps) => {
    return (
      <Box mb={2}>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h6">
            {entry.date} <WorkIcon fontSize="small" /> {entry.employerName}
          </Typography>
          <Typography variant="body2" gutterBottom>
            {entry.description}
          </Typography>

          {entry.diagnosisCodes && (
            <List dense>
              {entry.diagnosisCodes.map((code) => {
                const diagnosis = diagnoses?.find((d) => d.code === code);
                return (
                  <ListItem key={code} sx={{ pl: 0 }}>
                    <ListItemText
                      primary={`${code} ${diagnosis ? `: ${diagnosis.name}` : ''}`}
                    />
                  </ListItem>
                );
              })}
            </List>
          )}

          {entry.sickLeave && (
            <Typography variant="body2">
              <strong>Sick Leave:</strong> {entry.sickLeave.startDate} to {entry.sickLeave.endDate}
            </Typography>
          )}
          <Typography variant="body2" gutterBottom>
              diagnose by {entry.specialist}
          </Typography>
        </CardContent>
      </Card>
    </Box>
    );
};

export default OccupationalHealthcareEntryComponent;