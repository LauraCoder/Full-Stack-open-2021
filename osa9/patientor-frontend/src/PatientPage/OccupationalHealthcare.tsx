import React from "react";
import { OccupationalHealthcareEntry } from "../types";
import { Segment, Header, Icon, List } from "semantic-ui-react";

import DiagnoseDetails from "./DiagnoseDetails";
import "./entrystyle.css";

const OccupationalHealthcare = ({ entry }: {entry: OccupationalHealthcareEntry}) => {
  return (
    <Segment>
      <Header as="h4">
        {entry.date} <Icon name="medkit" />
      </Header>
      <p className="description">{entry.description}</p>
      <p><strong>Specialist:</strong> {entry.specialist}</p>
      <List bulleted>
        {entry.diagnosisCodes &&
          <DiagnoseDetails diagnosisCodes={entry.diagnosisCodes} />
        }
      </List>
      <p><strong>Employer:</strong> {entry.employerName}</p>
      <p><strong>Sickleave:</strong> {entry.sickLeave?.startDate} - {entry.sickLeave?.endDate}</p>
    </Segment>
  );
};

export default OccupationalHealthcare;
