import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Patient, Diagnosis, EntryFormValues } from "../../types";
import patientService from "../../services/patients";
import EntryDetails from "./EntryDetails";
import AddEntryModal from "../AddEntryModal";
import { Male, Female } from "@mui/icons-material";
import { Typography, Box, Button } from "@mui/material";

interface PatientPageProps {
  diagnoses: Diagnosis[] | null;
}


const PatientPage = ({ diagnoses }: PatientPageProps) => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState<string | undefined>();
  
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

  const onSubmit = async (entry: EntryFormValues) => {
    console.log('Submitting entry:', entry);
    const newEntry = await patientService.createEntry(patient.id, entry)
    setPatient({...patient, entries: [...patient.entries, newEntry]})
    setModalOpen(false);
  }

  const openModal = () => setModalOpen(true);
  const closeModal = () => {
    setModalOpen(false);
    setError(undefined);
  };

  return (
    <div>
      <Typography  mt={2} variant="h5">{patient.name}</Typography>
      {patient.gender === "male" ? (
            <Male color="primary" />
          ) : (
            <Female color="secondary" />
          )}
      <Typography variant="body2">SSN: {patient.ssn}</Typography>
      <Typography variant="body2">Occupation: {patient.occupation}</Typography>

      <Button variant="contained" onClick={openModal}>
        Add New Entry
      </Button>

      <AddEntryModal
        modalOpen={modalOpen}
        onClose={closeModal}
        onSubmit={onSubmit}
        error={error}
        diagnoses={diagnoses}
      />

      <Typography mt={8} variant="h6">Entries</Typography>
      {patient.entries.map((entry) => (
        <Box key={entry.id} style={{ marginBottom: '1rem' }}>
          <EntryDetails entry={entry} diagnoses={diagnoses} />
        </Box>
      ))}
    </div>
  );
};

export default PatientPage;