import React from "react";
import { HealthCheckEntry } from "../types";
import { Segment, Header, Icon, List } from "semantic-ui-react";

import DiagnoseDetails from "./DiagnoseDetails";
import "./entrystyle.css";

const HealthCheck = ({ entry }: {entry: HealthCheckEntry}) => {
  let color: "green" | "yellow" | "orange" | "red";

  switch(entry.healthCheckRating) {
    case 0:
      color = "green";
      break;
    case 1:
      color = "yellow";
      break;
    case 2:
      color = "orange";
      break;
    case 3:
      color = "red";
      break;
    default:
      return null;
  }

  return (
    <Segment>
      <Header as="h4">
        {entry.date} <Icon name="user md" />
      </Header>
      <p className="description">{entry.description}</p>
      <p><strong>Specialist:</strong> {entry.specialist}</p>
      <List bulleted>
        {entry.diagnosisCodes &&
          <DiagnoseDetails diagnosisCodes={entry.diagnosisCodes} />
        }
      </List>
      <Icon name="heart" color={color} />
    </Segment>
  );
};

export default HealthCheck;
