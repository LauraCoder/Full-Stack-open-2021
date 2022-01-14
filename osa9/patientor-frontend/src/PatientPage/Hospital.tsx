import React from "react";
import { HospitalEntry } from "../types";
import { Segment, Header, Icon, List } from "semantic-ui-react";

import DiagnoseDetails from "./DiagnoseDetails";
import "./entrystyle.css";

const Hospital = ({ entry }: {entry: HospitalEntry}) => {
  return (
    <Segment>
      <Header as="h4">
        {entry.date} <Icon name="hospital outline" />
      </Header>
      <p className="description">{entry.description}</p>
      <p><strong>Specialist:</strong> {entry.specialist}</p>
      <List bulleted>
        {entry.diagnosisCodes &&
          <DiagnoseDetails diagnosisCodes={entry.diagnosisCodes} />
        }
      </List>
      <p><strong>Discharge:</strong> <em>{entry.discharge.date} {entry.discharge.criteria}</em></p>
    </Segment>
  );
};

export default Hospital;
