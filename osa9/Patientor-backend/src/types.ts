export interface DiagnoseEntry {
    code: string;
    name: string;
    latin?: string;
}

interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<DiagnoseEntry["code"]>;
}

interface Discharge {
    date: string;
    criteria: string;
}

interface HospitalEntry extends BaseEntry {
    type: "HospitalEntry";
    discharge: Array<Discharge["criteria"]>;
}

interface SickLeave {
    startDate: string;
    endDate: string;
}

interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcareEntry";
  employerName: string,
  sickLeave?: Array<SickLeave["startDate"]>;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}
  
interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export interface PatientEntry {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: string;
    occupation: string;
    entries: Entry[];
}

export enum Gender {
    Female = "female",
    Male = "male",
    Other = "other",
}

type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
export type PublicPatient = UnionOmit<PatientEntry, "ssn" | "entries" >;
export type NonSensitivePatientEntry = UnionOmit<PatientEntry, "ssn">;
export type NewPatientEntry = UnionOmit<PatientEntry, "id">;