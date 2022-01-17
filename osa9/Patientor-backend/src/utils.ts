/* eslint-disable @typescript-eslint/no-unsafe-return */ /* eslint-disable @typescript-eslint/no-explicit-any */ /* eslint-disable @typescript-eslint/no-unsafe-argument */
import { NewPatientEntry, Gender, Entry, NewBaseEntry, NewEntry, EntryType, HealthCheckRating, DiagnoseEntry } from "./types";


const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseName = (name: unknown): string => {
    if (!name || !isString(name)) {
      throw new Error("Incorrect or missing name");
    }
    return name;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};
  
const parseDateOfBirth = (dateOfBirth: unknown): string => {
  if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
    throw new Error("Incorrect or missing date: " + dateOfBirth);
  }
  return dateOfBirth;
};
  
const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error("Incorrect or missing ssn: " + ssn);
  }
  return ssn;
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error("Incorrect or missing gender: " + gender);
  }
  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error("Incorrect or missing occupation: " + occupation);
  }
  return occupation;
};

const parseEntries = (entries: any): Entry[] => {
  if (!entries) return entries;
  return entries;
};

const parseType = (type: any): EntryType => {
  if (!Object.values(EntryType).includes(type)) {
    throw new Error(`Incorrect or missing type: ${type || ""}`);
  }
  return type;
};

const parseDescription = (description: unknown): string => {
  if (!description || !isString(description)) {
    throw new Error("Incorrect or missing description");
  }
  return description;
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date: " + date);
  }
  return date;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error("Incorrect or missing specialist: " + specialist);
  }
  return specialist;
};

const parseDiagnosisCodes = (diagnosisCodes: any): Array<DiagnoseEntry["code"]> => {
  if (!diagnosisCodes) {
    throw new Error("Incorrect or missing diagnosis codes: " + diagnosisCodes);
  }
  return diagnosisCodes;
};

const parseDischarge = (discharge: any): string[] => {
  if (!discharge) {
    throw new Error("Incorrect or missing discharge: " + discharge);
  }
  return discharge;
};

const parseEmployerName = (employerName: unknown): string => {
    if (!employerName || !isString(employerName)) {
      throw new Error("Incorrect or missing employer mame");
    }
    return employerName;
};

const parseSickLeave = (sickLeave: any): string[] => {
  if (!sickLeave) {
    throw new Error("Incorrect or missing sickleave: " + sickLeave);
  }
  return sickLeave;
};

const isRating = (param: any): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

const parseHealthCheckRating = (healthCheckRating: unknown): HealthCheckRating => {
  if (!isRating(healthCheckRating)) {
    throw new Error("Incorrect or missing health check rating: " + healthCheckRating);
  }
  return healthCheckRating;
};

const parseEntry = (entry: any): NewEntry => {
  if (!entry) {
    throw new Error("Incorrect or missing entry type: " + entry);
  }

  return entry;
};


type Fields = { name: unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown, entries: any };

export const toNewPatientEntry = ({ name, dateOfBirth, ssn, gender, occupation, entries } : Fields): NewPatientEntry => {
  const newEntry: NewPatientEntry = {
    name: parseName(name),
    dateOfBirth: parseDateOfBirth(dateOfBirth),
    ssn: parseSsn(ssn),
    gender: parseGender(gender),
    occupation: parseOccupation(occupation),
    entries: parseEntries(entries) || [],
  };

  return newEntry;
};

type EntryFields = { type: any, description: unknown, date: unknown, specialist: unknown, diagnosisCodes: any };

export const toNewBaseEntry = ({ type, description, date, specialist, diagnosisCodes, } : EntryFields): NewBaseEntry => {
  const newBaseEntry: NewBaseEntry = {
    type: parseType(type),
    description: parseDescription(description),
    date: parseDate(date),
    specialist: parseSpecialist(specialist),
    diagnosisCodes: parseDiagnosisCodes(diagnosisCodes),
  };

  return newBaseEntry;
};

export const toNewEntry = (newEntry: any): NewEntry => {
  const baseEntry = parseEntry(newEntry);

  const entry: Omit<NewBaseEntry, "id"> = {
    type: parseType(baseEntry.type),
    date: parseDate(baseEntry.date),
    description: parseDescription(baseEntry.description),
    specialist: parseSpecialist(baseEntry.specialist),
    diagnosisCodes: parseDiagnosisCodes(baseEntry.diagnosisCodes),
  };

  switch (baseEntry.type) {
    case EntryType.Hospital:
      return { 
        ...entry, 
        type: baseEntry.type,
        discharge: parseDischarge(baseEntry.discharge) 
      };
    case EntryType.OccupationalHealthCare:
      return {
        ...entry,
        type: baseEntry.type,
        employerName: parseEmployerName(baseEntry.employerName),
        sickLeave: parseSickLeave(baseEntry.sickLeave),
      };
    case EntryType.HealthCheck:
      return {
        ...entry,
        type: baseEntry.type,
        healthCheckRating: parseHealthCheckRating(baseEntry.healthCheckRating),
      };
    default:
      return assertNever(baseEntry);
  }
};

export const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};