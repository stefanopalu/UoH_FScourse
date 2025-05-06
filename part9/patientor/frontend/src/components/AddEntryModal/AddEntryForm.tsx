import { useState, SyntheticEvent } from "react";
import { Box, TextField, Grid, Button, InputLabel, Select, MenuItem, SelectChangeEvent, Radio, RadioGroup, FormControlLabel, FormLabel, FormControl, Checkbox } from '@mui/material';
import { EntryFormValues, HealthCheckRating, Diagnosis } from "../../types";

interface Props {
    onCancel: () => void;
    onSubmit: (values: EntryFormValues) => void;
    diagnoses: Diagnosis[] | null;
  }

  const typeOptions = [
    { value: "Hospital", label: "Hospital" },
    { value: "OccupationalHealthcare", label: "Occupational Healthcare" },
    { value: "HealthCheck", label: "Health Check" }
  ];

  const AddEntryForm = ({ onSubmit, onCancel, diagnoses }: Props) => {
    const [type, setType] = useState<'Hospital' | 'OccupationalHealthcare' | 'HealthCheck' | ''>('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [specialist, setSpecialist] = useState('');
    const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
    const [dischargeDate, setDischargeDate] = useState('');
    const [dischargeCriteria, setDischargeCriteria] = useState('');
    const [employerName, setEmployerName] = useState('');
    const [sickLeaveStart, setSickLeaveStart] = useState('');
    const [sickLeaveEnd, setSickLeaveEnd] = useState('');
    const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating | ''>('');
    const [error, setError] = useState<string | null>(null);

    const addEntry = async (event: SyntheticEvent) => {
      event.preventDefault();
      

      let newEntry: EntryFormValues;

      switch (type) {
        case "Hospital":
          newEntry ={
            type,
            description,
            date,
            specialist,
            diagnosisCodes,
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
                diagnosisCodes,
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
                  diagnosisCodes,
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

    const onTypeChange = (event: SelectChangeEvent<"Hospital" | "OccupationalHealthcare" | "HealthCheck" | "">) => {
        setType(event.target.value as "Hospital" | "OccupationalHealthcare" | "HealthCheck" | "")
      };

      const handleHealthCheckRatingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setHealthCheckRating(Number(event.target.value) as HealthCheckRating);  
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
            style={{ marginBottom: '16px' }}
          />

          <Box mb={2}>
            <TextField
              label="Date"
              type="date"
              fullWidth
              value={date}
              onChange={({ target }) => setDate(target.value)}
              InputLabelProps={{
                shrink: true, 
              }}
            />
          </Box>

          <TextField
            label="Specialist"
            fullWidth
            value={specialist}
            onChange={({ target }) => setSpecialist(target.value)}
            style={{ marginBottom: '16px' }}
          />

          <FormControl fullWidth style={{ marginTop: 20 }}>
            <InputLabel id="diagnosis-codes-label">Diagnosis Codes</InputLabel>
            <Select
              labelId="diagnosis-codes-label"
              id="diagnosis-codes"
              multiple
              value={diagnosisCodes}
              onChange={(event) => setDiagnosisCodes(event.target.value as string[])}
              renderValue={(selected) => {
                if (selected.length === 0) {
                  return <em>None</em>;
                }
                return selected.join(', ');
              }}
              onClose={() => {

              }}
            >
              {diagnoses?.map((d) => (
                <MenuItem key={d.code} value={d.code}>
                  <Checkbox checked={diagnosisCodes.indexOf(d.code) > -1} />
                  {d.code} - {d.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <InputLabel style={{ marginTop: 20 }}>Type</InputLabel>
          <Select
            label="Type"
            fullWidth
            value={type}
            onChange={onTypeChange}
            style={{ marginBottom: '16px' }}
          >
            {typeOptions.map((option) => (
              <MenuItem key={option.label} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>

          {type === "Hospital" && (
            <>
            <Box mb={2}>
              <TextField
                label="Discharge Date"
                type="date"
                fullWidth
                value={dischargeDate}
                onChange={({ target }) => setDischargeDate(target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Box>

              <TextField
                label="Discharge Criteria"
                fullWidth
                value={dischargeCriteria}
                onChange={({ target }) => setDischargeCriteria(target.value)}
                style={{ marginBottom: '16px' }}
              />
            </>
          )}

          {type === "OccupationalHealthcare" && (
            <>
              <TextField
                label="Employer Name"
                fullWidth
                value={employerName}
                onChange={({ target }) => setEmployerName(target.value)}
                style={{ marginBottom: '16px' }}
              />
              <Box mb={2}>
              <TextField
                label="Sick Leave Start"
                type="date"
                fullWidth
                value={sickLeaveStart}
                onChange={({ target }) => setSickLeaveStart(target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              </Box>
              <Box mb={2}>
              <TextField
                label="Sick Leave End"
                type="date"
                fullWidth
                value={sickLeaveEnd}
                onChange={({ target }) => setSickLeaveEnd(target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              </Box>
            </>
          )}

          {type === "HealthCheck" && (
            <>
              <FormControl fullWidth>
                <FormLabel>Health Check Rating</FormLabel>
                <RadioGroup
                  value={healthCheckRating ?? 0}
                  onChange={handleHealthCheckRatingChange}
                  row
                >
                  <FormControlLabel value={0} control={<Radio />} label="Healthy" />
                  <FormControlLabel value={1} control={<Radio />} label="Low Risk" />
                  <FormControlLabel value={2} control={<Radio />} label="High Risk" />
                  <FormControlLabel value={3} control={<Radio />} label="Critical Risk" />
                </RadioGroup>
              </FormControl>
            </>
          )}

          <Grid container justifyContent="space-between" mt={3}>
            <Grid item>
              <Button
                color="secondary"
                variant="contained"
                type="button"
                onClick={onCancel}
              >
                Cancel
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                type="submit"
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