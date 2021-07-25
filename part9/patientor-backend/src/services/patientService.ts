import uuid = require('uuid');
import patients from '../../data/patients';
import { Patient, NewPatient, PublicPatient } from '../types';

const getNonSensitivePatients = (): PublicPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const getPatient = (id: string): Patient | undefined => {
  return patients.find(patient => patient.id === id);
};

const addPatient = (patient: NewPatient): Patient => {  
  const newPatient: Patient = {
    id: uuid.v1(),
    entries: [],
    ...patient
  };
  patients.push(newPatient);
  return newPatient;
};

export default {
  getNonSensitivePatients,
  getPatient,
  addPatient
};