import patients from '../../data/patients-full';
import { NoSsnPatient, Patient, NewPatient, Gender, Entry} from '../types';
import { v1 as uuid } from 'uuid'
import { EntryWithoutId } from '../utils';

const getPatients = (): NoSsnPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender: gender as Gender,
    occupation,
  }));
};

const addPatient = ( patient: NewPatient ): Patient => {
    const newPatient = {
        id: uuid(),
        ...patient,
        entries: []
    };
    patients.push(newPatient);
    return newPatient;
};

const addEntry = ( id: string, entry: EntryWithoutId ): Entry => {
  const patient = patients.find(patient => patient.id === id);
  const newEntry = {
      ...entry,
      id: uuid(),
   };
  patient?.entries.push(newEntry);
  return newEntry;
};

const findById = (id: string): Patient | undefined => {
  const patient = patients.find(patient => patient.id === id);

  if (!patient) return undefined;

  const { id: patientid, name, dateOfBirth, ssn, gender, occupation, entries } = patient
  return {
    id: patientid,
    name,
    ssn,
    dateOfBirth,
    gender: gender as Gender,
    occupation,
    entries
  }
};

export default {
  getPatients,
  addPatient,
  findById,
  addEntry
};