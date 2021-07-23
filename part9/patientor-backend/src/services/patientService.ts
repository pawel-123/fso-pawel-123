import uuid = require('uuid');
import patients from '../../data/patients';
import { Patient, NewPatient } from '../types';

// const patients: Patient[] = patientData;

// const patients: Omit<Patient, 'ssn'>[] = patientData;

const getNonSensitivePatients = (): Omit<Patient, 'ssn'>[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addPatient = (patient: NewPatient): Patient => {  
  const newPatient: Patient = {
    id: uuid.v1(),
    ...patient
  };
  patients.push(newPatient);
  return newPatient;
};

export default {
  getNonSensitivePatients,
  addPatient
};