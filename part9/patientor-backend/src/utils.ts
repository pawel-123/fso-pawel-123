import { NewPatient, Gender, HealthCheckRating, NewEntry, EntryType, Diagnosis } from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name');
  }
  return name;
};

const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing ssn');
  }
  return ssn;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation');
  }
  return occupation;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

type PatientFields = { name: unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown };

export const toNewPatient = ({ name, dateOfBirth, ssn, gender, occupation }: PatientFields): NewPatient => {
  const newPatient: NewPatient = {
    name: parseName(name),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseSsn(ssn),
    gender: parseGender(gender),
    occupation: parseOccupation(occupation)
  };
  return newPatient;
};

// V3
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isEntryType = (param: any): param is EntryType.HealthCheck => {
  return Object.values(EntryType).includes(param);
};

const parseEntryType = (type: unknown): EntryType.HealthCheck => {
  if (!type || !isEntryType(type)) {
    throw new Error('Missing or incorrect entry type: ' + type);
  }
  return type;
};

const parseDescription = (description: unknown): string => {
  if (!description || !isString(description)) {
    throw new Error('Missing or incorrect description');
  }
  return description;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error('Missing or incorrect specialist');
  }
  return specialist;
};

const isArray = (codes: unknown): boolean => {
  return Array.isArray(codes);
};

const parseDiagnosisCodes = (codes: unknown): Array<Diagnosis['code']> => {
  if (!codes || !isArray(codes) || !Array.prototype.every.call(codes, isString)) {
    throw new Error('Missing or incorrect diagnosis codes');
  }
  return codes as Array<Diagnosis['code']>;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
  if (!rating || !isHealthCheckRating(rating)) {
    throw new Error('Missing or incorrect health check rating');
  }
  return rating;
};

type EntryFields = { 
  description: unknown, 
  date: unknown, 
  specialist: unknown, 
  type: unknown, 
  healthCheckRating: unknown, 
  diagnosisCodes?: unknown
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toNewEntry = ({ description, date, specialist, type, healthCheckRating, diagnosisCodes }: EntryFields): NewEntry => {
  if (!type) {
    throw new Error('Missing or incorrect entry');
  }

  const newEntry: NewEntry = {
    type: parseEntryType(type),
    description: parseDescription(description),
    date: parseDate(date),
    specialist: parseSpecialist(specialist),
    healthCheckRating: parseHealthCheckRating(healthCheckRating)
  };

  if (diagnosisCodes && isArray(diagnosisCodes)) {
    newEntry.diagnosisCodes = parseDiagnosisCodes(diagnosisCodes);
  }

  return newEntry;
};