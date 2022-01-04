export interface DiagnoseEntry {
    code: string;
    name: string;
    latin?: string;
}

export type gender = 'female' | 'male' | 'other';

export interface PatientEntry {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: string;
    occupation: string;
}

export type NonSensitivePatientEntry = Omit<PatientEntry, 'ssn'>;