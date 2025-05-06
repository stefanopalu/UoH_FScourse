import { Diagnosis, HealthCheckEntry } from "../../types";
import { Card, CardContent, Typography, Box, List, ListItem, ListItemText } from "@mui/material";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import FavoriteIcon from "@mui/icons-material/Favorite";

interface HealthCheckEntryProps {
    entry: HealthCheckEntry;
    diagnoses: Diagnosis[] | null;
}

const healthColor = (rating: number): string => {
    switch (rating) {
      case 0: return "green";
      case 1: return "yellow";
      case 2: return "orange";
      case 3: return "red";
      default: return "disabled";
    }
  };

const HealthCheckEntryComponent = ( {entry, diagnoses}: HealthCheckEntryProps) => {
    return (
        <Box mb={2}>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h6">
              {entry.date} <MonitorHeartIcon fontSize="small"/>
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
            <Box mt={2} >
                <FavoriteIcon
                fontSize="large"
                sx={{ color: healthColor(entry.healthCheckRating) }}
                />
            </Box>
            <Typography variant="body2" gutterBottom>
              diagnose by {entry.specialist}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    );
};

export default HealthCheckEntryComponent;