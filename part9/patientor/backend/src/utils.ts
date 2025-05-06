import { NewPatient, Gender, Entry, HealthCheckRating } from "./types";
import { z } from 'zod';

export const NewPatientSchema = z.object({
    name: z.string(),
    dateOfBirth: z.string().date(),
    ssn: z.string(),
    occupation: z.string(),
    gender: z.nativeEnum(Gender),
    entries: z.array(z.any()).default([])
});


export const toNewPatient = (object: unknown): NewPatient => {
    return NewPatientSchema.parse(object);
};

type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
export type EntryWithoutId = UnionOmit<Entry, 'id'>;

export const BaseEntrySchema = z.object({
    type: z.string(),
    description: z.string(),
    date: z.string().date(),
    specialist: z.string(),
    diagnosisCodes: z.array(z.string()).default([])
});

const HealthCheckEntrySchema = BaseEntrySchema.extend({
    type: z.literal('HealthCheck'),
    healthCheckRating: z.nativeEnum(HealthCheckRating)
  }).strict();
  
const HospitalEntrySchema = BaseEntrySchema.extend({
    type: z.literal('Hospital'),
    discharge: z.object({
      date: z.string().date(),
      criteria: z.string()
    })
}).strict();
  
const OccupationalEntrySchema = BaseEntrySchema.extend({
    type: z.literal('OccupationalHealthcare'),
    employerName: z.string(),
    sickLeave: z.object({
      startDate: z.string().date(),
      endDate: z.string().date()
    }).optional()
}).strict();

export const EntryWithoutIdSchema = z.union([
    HealthCheckEntrySchema,
    HospitalEntrySchema,
    OccupationalEntrySchema
]);


export const toNewEntry = (object: unknown): EntryWithoutId => {
    return EntryWithoutIdSchema.parse(object);
};

