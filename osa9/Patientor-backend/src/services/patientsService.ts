/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import patients from '../../data/patients';
import { 
    PatientEntry, 
    NonSensitivePatientEntry,
    NewPatientEntry
} from '../types';
import { v4 as uuidv4 } from 'uuid';

const id = uuidv4();

const getEntries = () : PatientEntry[] => {
  return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries
  }));
};

const findPatientById = (id: string): PatientEntry | undefined => {
  const entry = patients.find(p => p.id === id);
  return entry;
};

const addPatient = ( entry: NewPatientEntry ): PatientEntry => {
  const newPatientEntry = {
    id: id,
    ...entry
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  findPatientById,
  addPatient
};