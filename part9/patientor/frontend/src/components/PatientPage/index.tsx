import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Patient, Diagnosis } from "../../types";
import patientService from "../../services/patients";
import EntryDetails from "./EntryDetails";
import { Male, Female } from "@mui/icons-material";
import { Typography, Box } from "@mui/material";

interface PatientPageProps {
  diagnoses: Diagnosis[] | null;
}

const PatientPage = ({ diagnoses }: PatientPageProps) => {
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
          <EntryDetails entry={entry} diagnoses={diagnoses} />
        </Box>
      ))}
    </div>
  );
};

export default PatientPage;