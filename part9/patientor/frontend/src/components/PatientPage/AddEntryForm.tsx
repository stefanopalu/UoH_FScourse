import { useState, SyntheticEvent } from "react";

import { Box, TextField, Grid, Button } from '@mui/material';

import { EntryFormValues } from "../../types";

interface Props {
    onSubmit: (values: EntryFormValues) => void;
  }

  const AddEntryForm = ({ onSubmit }: Props) => {
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [specialist, setSpecialist] = useState('');
    const [diagnosisCodes, setDiagnosisCodes] = useState('');
    const [dischargeDate, setDischargeDate] = useState('');
    const [dischargeCriteria, setDischargeCriteria] = useState('');

    
    const addEntry = (event: SyntheticEvent) => {
      event.preventDefault();
      
      const diagnosisCodesArray = diagnosisCodes.split(',').map(code => code.trim());

      onSubmit({
        type: "Hospital",
        description,
        date,
        specialist,
        diagnosisCodes: diagnosisCodesArray,
        discharge: {
            date: dischargeDate,
            criteria: dischargeCriteria
        }
      });
    };

    const handleCancel = () => {
        setDescription('')
        setDate('')
        setSpecialist('')
        setDiagnosisCodes('')
        setDischargeCriteria('')
        setDischargeDate('')
    }
  
    return (
      <div>
        <Box my={2}>
        <form onSubmit={addEntry}>
          <TextField
            label="Description"
            fullWidth 
            value={description}
            onChange={({ target }) => setDescription(target.value)}
          />
          <TextField
            label="Date"
            placeholder="YYYY-MM-DD"
            fullWidth
            value={date}
            onChange={({ target }) => setDate(target.value)}
          />
          <TextField
            label="Specialist"
            fullWidth
            value={specialist}
            onChange={({ target }) => setSpecialist(target.value)}
          />
          <TextField
            label="diagnosisCodes"
            fullWidth
            value={diagnosisCodes}
            onChange={({ target }) => setDiagnosisCodes(target.value)}
          />
  
          <TextField
            label="discharge date"
            fullWidth
            value={dischargeDate}
            onChange={({ target }) => setDischargeDate(target.value)}
          />

          <TextField
            label="discharge criteria"
            fullWidth
            value={dischargeCriteria}
            onChange={({ target }) => setDischargeCriteria(target.value)}
          />
          
          <Grid>
            <Grid item>
              <Button
                color="secondary"
                variant="contained"
                style={{ float: "left" }}
                type="button"
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </Grid>
            <Grid item>
              <Button
                style={{
                  float: "right",
                }}
                type="submit"
                variant="contained"
              >
                Add
              </Button>
            </Grid>
          </Grid>
          
        </form>
        </Box>
      </div>
    );
  };
  
  export default AddEntryForm;