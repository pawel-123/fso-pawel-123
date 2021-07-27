import uuid = require('uuid');
import patients from '../../data/patients';
import { Patient, NewPatient, PublicPatient, Entry, NewEntry } from '../types';

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

const addEntry = (patientId: Patient['id'], entry: NewEntry): Entry => {
  const patientIndex: number = patients.findIndex(p => p.id === patientId);
  if (patientIndex === -1) {
    throw new Error('Patient not found');
  }
  const newEntry: Entry = { id: uuid.v1(), ...entry };
  patients[patientIndex].entries.push(newEntry);
  return newEntry;
};

export default {
  getNonSensitivePatients,
  getPatient,
  addPatient,
  addEntry
};