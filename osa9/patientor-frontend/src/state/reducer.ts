/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { State } from "./state";
import { Diagnosis, Patient } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "SET_DIAGNOSE_LIST";
      payload: Diagnosis[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "ADD_ENTRY";
      payload: Patient;
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
    case "SET_DIAGNOSE_LIST":
      return {
        ...state,
        diagnosis: {
          ...action.payload.reduce(
            (memo, diagnose) => ({ ...memo, [diagnose.code]: diagnose }),
            {}
          ),
          ...state.diagnosis
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "ADD_ENTRY":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: {
            ...state.patients[action.payload.id],
            ...action.payload,
          }
        }
      };
    default:
      return state;
  }
};

export const patientList = (patientList: Patient[]): Action => {
  return {
    type: "SET_PATIENT_LIST", 
    payload: patientList
  };
};

export const diagnoseList = (diagnoseList: Diagnosis[]): Action => {
  return {
    type: "SET_DIAGNOSE_LIST", 
    payload: diagnoseList
  };
};

export const addNewPatient = (newPatient: Patient): Action => {
  return {
    type: "ADD_PATIENT", 
    payload: newPatient
  };
};

export const addNewEntry = (newEntry: Patient): Action => {
  return {
    type: "ADD_ENTRY", 
    payload: newEntry
  };
};