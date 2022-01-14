import React from "react";
import { useParams } from "react-router-dom";
import { Container, Icon } from "semantic-ui-react";

import { useStateValue } from "../state";
import { Patient } from "../types";
import EntryDetails from "./EntryDetails";

const unorderedList = {
  listStyleType: "none",
  padding: 0,
};

const PatientPage = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patients }] = useStateValue();

  const patient = Object.values(patients).find(
    (patient: Patient) => patient.id === id
  );

  let genderIcon: "venus" | "mars" | "genderless";

  switch(patient?.gender) {
    case "female":
      genderIcon = "venus";
      break;
    case "male":
      genderIcon = "mars";
      break;
    case "other":
      genderIcon = "genderless";
      break;
    default:
      return null;
  }

  return (
    <div className="App">
      {patient &&
        <Container>
          <h3>{patient.name} <Icon name={genderIcon} /></h3>
          <ul style={unorderedList}>
            <li>ssn: {patient.ssn}</li>
            <li>occupation: {patient.occupation}</li>
          </ul>
          <h4>Entries:</h4>
          {patient.entries &&
            patient.entries.map(entry => (
              <EntryDetails entry={entry} key={entry.id}/>
          ))}
        </Container>
      }
    </div>
  );
};

export default PatientPage;
