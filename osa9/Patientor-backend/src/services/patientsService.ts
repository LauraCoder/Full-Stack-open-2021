import patients from '../../data/patients';
import { 
    PatientEntry,
    NewPatientEntry,
    Entry,
    NewEntry,
    NonSensitivePatientEntry
} from '../types';
import { v4 as uuidv4 } from 'uuid';

const id = uuidv4();

const getEntries = () : PatientEntry[] => {
  return patients;
};

const getNonSensitivePatientEntries = (): NonSensitivePatientEntry[] => {
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
  const patient = patients.find(patient => patient.id === id);

  return patient;
};

const addPatient = ( patient: NewPatientEntry ): PatientEntry => {
  const newPatientEntry = {
    id: id,
    ...patient
  };
  
  patients.push(newPatientEntry);
  return newPatientEntry;
};

const addEntry = ( patient: PatientEntry, newEntry: NewEntry ): PatientEntry => {
  const addNewEntry: Entry = {
    id: id,
    ...newEntry
  };
  
  patient.entries?.push(addNewEntry);
  return patient;
};

export default {
  getEntries,
  getNonSensitivePatientEntries,
  findPatientById,
  addPatient,
  addEntry
};