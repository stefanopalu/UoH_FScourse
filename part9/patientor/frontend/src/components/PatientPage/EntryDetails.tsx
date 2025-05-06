import { Diagnosis, Entry } from "../../types";
import HospitalEntryComponent from "./HospitalEntry";
import OccupationalHealthcareEntryComponent from "./OccupationalHealthcareEntry";
import HealthCheckEntryComponent from "./HealthCheckEntry";

interface EntryDetailsProps {
    entry: Entry;
    diagnoses: Diagnosis[] | null;
}

const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };
  
const EntryDetails = ( {entry, diagnoses}: EntryDetailsProps) => {
    switch (entry.type) {
        case "Hospital":
            return <HospitalEntryComponent entry={entry} diagnoses ={diagnoses} />;
        case "OccupationalHealthcare":
            return <OccupationalHealthcareEntryComponent entry={entry} diagnoses ={diagnoses} />;
        case "HealthCheck":
            return <HealthCheckEntryComponent entry={entry} diagnoses ={diagnoses} />;
        default:
            return assertNever(entry);
        }
    };

export default EntryDetails
