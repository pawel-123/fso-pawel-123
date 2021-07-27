import { State } from "./state";
import { Patient, Diagnosis, Entry } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "GET_PATIENT";
      payload: Patient;
    }
  | {
      type: "SET_DIAGNOSES";
      payload: Diagnosis[];
    }
  | {
      type: "ADD_ENTRY";
      payload: { entry: Entry, patient: Patient }
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "GET_PATIENT":
      return {
        ...state,
        currentPatient: action.payload
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "SET_DIAGNOSES":
      return {
        ...state,
        diagnoses: action.payload
      };
    case "ADD_ENTRY": {
      const updatedEntries: Entry[] = action.payload.patient.entries.concat(action.payload.entry) 
      || [action.payload.entry];

      const updatedPatient: Patient = {
        ...action.payload.patient,
        entries: updatedEntries
      };
      
      return {
        ...state,
        currentPatient: updatedPatient,
        patients: {
          ...state.patients,
          [action.payload.patient.id]: updatedPatient
        }
      };
    }
    default:
      return state;
  }
};

export const setPatientList = (patients: Patient[]): Action => {
  return {
    type: "SET_PATIENT_LIST",
    payload: patients
  };
};

export const getPatient = (patient: Patient): Action => {
  return {
    type: "GET_PATIENT",
    payload: patient
  };
};

export const addPatient = (newPatient: Patient): Action => {
  return {
    type: "ADD_PATIENT",
    payload: newPatient
  };
};

export const setDiagnoses = (diagnoses: Diagnosis[]): Action => {
  return {
    type: "SET_DIAGNOSES",
    payload: diagnoses
  };
};

export const addEntry = (entry: Entry, patient: Patient): Action => {
  return {
    type: "ADD_ENTRY",
    payload: {
      entry,
      patient
    }
  };
};