  export interface Diagnosis {
    code: string;
    name: string;
    latin?: string;
  }

  export enum Gender {
    Male = "male",
    Female = "female",
    Other = "other"
  }

  export interface Patient {
    id: string;
    name: string;
    occupation: string;
    gender: Gender;
    ssn?: string;
    dateOfBirth?: string;
    entries: Entry[]
  }

  interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<Diagnosis['code']>;
  }

  export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
  }

  interface Discharge {
    date: string;
    criteria: string;
  }

  interface SickLeave {
    startDate: string;
    endDate: string;
  }

  export interface HospitalEntry extends BaseEntry {
    type: "Hospital";
    discharge: Discharge;
  }

  export interface OccupationalHealthcareEntry extends BaseEntry {
    type: "OccupationalHealthcare";
    employerName: string;
    sickLeave?: SickLeave;
  }

  export interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck";
    healthCheckRating: HealthCheckRating;
  }

  export type Entry = | HospitalEntry | OccupationalHealthcareEntry | HealthCheckEntry;
  export type PatientFormValues = Omit<Patient, "id" | "entries">;
  export type EntryFormValues = Omit<HospitalEntry, "id" > | Omit<OccupationalHealthcareEntry, "id" > | Omit<HealthCheckEntry, "id" >