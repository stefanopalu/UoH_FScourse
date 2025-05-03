import patients from '../../data/patients';
import { NoSsnPatient, Patient } from '../types';
import { v1 as uuid } from 'uuid'

const getPatients = (): NoSsnPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (
    name: string, dateOfBirth: string, ssn: string, gender: string, occupation: string): Patient => {
    const newPatient = {
        id: uuid(),
        name,
        dateOfBirth,
        ssn,
        gender,
        occupation,
    };
    patients.push(newPatient);
    return newPatient;
};

export default {
  getPatients,
  addPatient
};