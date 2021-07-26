import React from "react";
import { Icon, SemanticCOLORS } from "semantic-ui-react";
import { Entry, HealthCheckEntry, HospitalEntry, OccupationalHealthcareEntry } from "../types";

// const getDiagnosisName = (code: Diagnosis['code']): Diagnosis['name'] | undefined => {
//   const diagnosis = diagnoses.find(d => d.code === code);
//   return diagnosis ? diagnosis.name : undefined;
// };

const EntryHospital = ({ entry }: { entry: HospitalEntry }) => {
  return (
    <div>
      <h2>{entry.date} <Icon name="hospital" /></h2>
      <p>{entry.description}</p>
    </div>
  );
};

const EntryOccupational = ({ entry }: { entry: OccupationalHealthcareEntry }) => {
  return (
    <div>
      <h2>{entry.date} <Icon name="briefcase" />{entry.employerName}</h2>
      <p>{entry.description}</p>
    </div>
  );
};

const EntryHealthCheck = ({ entry }: { entry: HealthCheckEntry }) => {
  const getRatingColor = (rating: HealthCheckEntry['healthCheckRating']): SemanticCOLORS | undefined => {
    switch(rating) {
      case 0:
        return "green";
      case 1:
        return "yellow";
      case 2:
        return "orange";
      case 3:
        return "red";
    }
  };
  
  return (
    <div>
      <h2>{entry.date} <Icon name="stethoscope" /></h2>
      <p>{entry.description}</p>
      <Icon name="heart" color={getRatingColor(entry.healthCheckRating)} />
    </div>
  );
};

const EntryDetails = ({ entry }: { entry: Entry}) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };
  
  switch (entry.type) {
    case "Hospital":
      return <EntryHospital entry={entry} />;
    case "OccupationalHealthcare":
      return <EntryOccupational entry={entry} />;
    case "HealthCheck":
      return <EntryHealthCheck entry={entry} />;
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;