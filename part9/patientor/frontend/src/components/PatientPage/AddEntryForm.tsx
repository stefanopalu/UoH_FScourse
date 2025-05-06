import { useState, SyntheticEvent } from "react";
import { Box, TextField, Grid, Button, InputLabel, Select, MenuItem, SelectChangeEvent, Radio, RadioGroup, FormControlLabel, FormLabel, FormControl } from '@mui/material';
import { EntryFormValues, HealthCheckRating } from "../../types";

interface Props {
    onSubmit: (values: EntryFormValues) => void;
  }

  const typeOptions = [
    { value: "Hospital", label: "Hospital" },
    { value: "OccupationalHealthcare", label: "Occupational Healthcare" },
    { value: "HealthCheck", label: "Health Check" }
  ];

  const AddEntryForm = ({ onSubmit }: Props) => {
    const [type, setType] = useState<'Hospital' | 'OccupationalHealthcare' | 'HealthCheck' | ''>('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [specialist, setSpecialist] = useState('');
    const [diagnosisCodes, setDiagnosisCodes] = useState('');
    const [dischargeDate, setDischargeDate] = useState('');
    const [dischargeCriteria, setDischargeCriteria] = useState('');
    const [employerName, setEmployerName] = useState('');
    const [sickLeaveStart, setSickLeaveStart] = useState('');
    const [sickLeaveEnd, setSickLeaveEnd] = useState('');
    const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating | ''>('');
    const [error, setError] = useState<string | null>(null);

    const addEntry = async (event: SyntheticEvent) => {
      event.preventDefault();
      
      const diagnosisCodesArray = diagnosisCodes.split(',').map(code => code.trim());

      let newEntry: EntryFormValues;

      switch (type) {
        case "Hospital":
          newEntry ={
            type,
            description,
            date,
            specialist,
            diagnosisCodes: diagnosisCodesArray,
            discharge: {
                date: dischargeDate,
                criteria: dischargeCriteria
            }
          };
          break;
          case "OccupationalHealthcare":
            newEntry = {
                type,
                description,
                date,
                specialist,
                diagnosisCodes: diagnosisCodesArray,
                employerName: employerName, 
                sickLeave: sickLeaveStart && sickLeaveEnd ?{
                    startDate: sickLeaveStart,
                    endDate: sickLeaveEnd
                } : undefined
            };
            break;
            case "HealthCheck":
                newEntry = {
                  type,
                  description,
                  date,
                  specialist,
                  diagnosisCodes: diagnosisCodesArray,
                  healthCheckRating: healthCheckRating !== '' ? healthCheckRating : HealthCheckRating.Healthy
                };
                break;
          default:
            throw new Error("Unsupported entry type");
      }

      try {
        await onSubmit(newEntry);
      } catch (err) {
        setError('Failed to add the entry. Please check the form and try again.');
        setTimeout(() => {
            setError(null);
          }, 3000);
      }
    };

    const handleCancel = () => {
        setDescription('')
        setDate('')
        setSpecialist('')
        setDiagnosisCodes('')
        setDischargeCriteria('')
        setDischargeDate('')
    }

    const onTypeChange = (event: SelectChangeEvent<"Hospital" | "OccupationalHealthcare" | "HealthCheck" | "">) => {
        setType(event.target.value as "Hospital" | "OccupationalHealthcare" | "HealthCheck" | "")
      };

      const handleHealthCheckRatingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setHealthCheckRating(Number(event.target.value) as HealthCheckRating);  // Convert to HealthCheckRating type
      };
  
    return (
      <div>
        {error && <Box color="error.main" mb={2}>{error}</Box>}
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
        <InputLabel style={{ marginTop: 20 }}>Type</InputLabel>
                <Select
                label="Type"
                fullWidth 
                value={type}
                onChange={onTypeChange}
                >
                {typeOptions.map(option =>
                <MenuItem
                    key={option.label}
                    value={option.value}
                >
                    {option.label
                }</MenuItem>
                )}
                </Select>
                {type === "Hospital" && (
                <>
                <TextField
                    label="discharge date"
                    placeholder="YYYY-MM-DD"
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
              </>
              )}
                {type === "OccupationalHealthcare" && (
                <>
                <TextField
                    label="employer name"
                    fullWidth
                    value={employerName}
                    onChange={({ target }) => setEmployerName(target.value)}
                />
                <TextField
                    label="sick leave start"
                    placeholder="YYYY-MM-DD"
                    fullWidth
                    value={sickLeaveStart}
                    onChange={({ target }) => setSickLeaveStart(target.value)}
                />
                <TextField
                    label="sick leave end"
                    placeholder="YYYY-MM-DD"
                    fullWidth
                    value={sickLeaveEnd}
                    onChange={({ target }) => setSickLeaveEnd(target.value)}
                />
              </>
              )}
              {type === "HealthCheck" && (
                <>
                <FormControl fullWidth>
                <FormLabel>Health Check Rating</FormLabel>
                <RadioGroup
                    value={healthCheckRating ?? HealthCheckRating.Healthy}
                    onChange={handleHealthCheckRatingChange}
                    row
                >
                    <FormControlLabel value={HealthCheckRating.Healthy} control={<Radio />} label="Healthy" />
                    <FormControlLabel value={HealthCheckRating.LowRisk} control={<Radio />} label="Low Risk" />
                    <FormControlLabel value={HealthCheckRating.HighRisk} control={<Radio />} label="High Risk" />
                    <FormControlLabel value={HealthCheckRating.CriticalRisk} control={<Radio />} label="Critical Risk" />
                </RadioGroup>
                </FormControl>
              </>
              )}
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