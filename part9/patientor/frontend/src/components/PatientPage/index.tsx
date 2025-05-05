import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Patient } from "../../types";
import patientService from "../../services/patients";

import { Male, Female } from "@mui/icons-material";
import { Typography, Box } from "@mui/material";


const PatientPage = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);
  
  useEffect(() => {
    const fetchPatient = async () => {
      if (id) {  
        const patient = await patientService.getById(id);  
        setPatient(patient);
      }
    };
    void fetchPatient();
  }, [id]); 

  if (!patient) return <div>Loading...</div>;
  return (
    <div>
      <Typography variant="h5">{patient.name}</Typography>
      {patient.gender === "male" ? (
            <Male color="primary" />
          ) : (
            <Female color="secondary" />
          )}
      <Typography variant="body2">SSN: {patient.ssn}</Typography>
      <Typography variant="body2">Occupation: {patient.occupation}</Typography>
      <Typography variant="h6">Entries</Typography>
      {patient.entries.map((entry) => (
        <Box key={entry.id} style={{ marginBottom: '1rem' }}>
          <Typography variant="subtitle2">{entry.date}</Typography>
          <Typography variant="body2">{entry.description}</Typography>

          {entry.diagnosisCodes?.map((code) => (
            <Typography key={code} variant="body2" style={{ paddingLeft: '1rem' }}>
                - {code}
            </Typography>
        ))}
        </Box>
     ))}
    </div>
  );
};

export default PatientPage;