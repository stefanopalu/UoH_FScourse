import { Diagnosis, HospitalEntry } from "../../types";
import { Card, CardContent, Typography, Box, List, ListItem, ListItemText } from "@mui/material";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";


interface HospitalEntryProps {
    entry: HospitalEntry;
    diagnoses: Diagnosis[] | null;
}

const HospitalEntryComponent = ( {entry, diagnoses}: HospitalEntryProps) => {
    return (
    <Box style={{ marginBottom: '1rem' }}>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="subtitle2">
            {entry.date} <LocalHospitalIcon fontSize="small" />
          </Typography>
          <Typography variant="body2">{entry.description}</Typography>

          {entry.diagnosisCodes && (
            <List>
              {entry.diagnosisCodes.map((code) => {
                const diagnosis = diagnoses?.find(d => d.code === code);
                return (
                  <ListItem key={code}>
                    <ListItemText primary={`${code} ${diagnosis ? `: ${diagnosis.name}` : ''}`}/>
                  </ListItem>
                );
              })}
            </List>
            )}
          <Typography variant="body2">
            Discharge: {entry.discharge.date} – {entry.discharge.criteria}
          </Typography>
          <Typography variant="body2" gutterBottom>
              diagnose by {entry.specialist}
            </Typography>
        </CardContent>
      </Card>
    </Box>
    )
};

export default HospitalEntryComponent;