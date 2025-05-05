import { z } from 'zod';
import { NewPatientSchema } from './utils'

export enum Gender {
  male = 'male',
  female = 'female',
  other = 'other',
}

export interface Diagnoses {
    code: string;
    name: string;
    latin?: string;
  }

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface Entry {

}

export interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
    entries: Entry[];
}

export type NoSsnPatient = Omit<Patient, 'ssn' | 'entries'>;
export type NewPatient = z.infer<typeof NewPatientSchema>;