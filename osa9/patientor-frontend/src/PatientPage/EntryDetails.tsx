import React from "react";
import { Entry, EntryType } from "../types";
import { assertNever } from "../utils";
import HealthCheck from "./HealthCheck";
import Hospital from "./Hospital";
import OccupationalHealthcareEntry from "./OccupationalHealthcare";

const EntryDetails = ({ entry }: {entry: Entry}) => {
  switch(entry.type) {
    case EntryType.Hospital:
      return <Hospital entry={entry} />;
    case EntryType.OccupationalHealthCare:
      return <OccupationalHealthcareEntry entry={entry} />;
    case EntryType.HealthCheck:
      return <HealthCheck entry={entry} />;
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;