import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Patient } from "../../types";
import patientService from "../../services/patients";

import { Male, Female } from "@mui/icons-material";
import { Typography } from "@mui/material";


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
      <Typography variant="body1">SSN: {patient.ssn}</Typography>
      <Typography variant="body1">Occupation: {patient.occupation}</Typography>
    </div>
  );
};

export default PatientPage;