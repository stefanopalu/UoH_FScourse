import patients from '../../data/patients';
import { NoSsnPatient, Patient, NewPatient, Gender} from '../types';
import { v1 as uuid } from 'uuid'

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
        ...patient
    };
    patients.push(newPatient);
    return newPatient;
};

export default {
  getPatients,
  addPatient
};