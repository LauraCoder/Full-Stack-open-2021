import React from "react";
import { useParams } from 'react-router-dom';
import { Container } from "semantic-ui-react";
import { useStateValue } from "../state";
import { Patient } from "../types";
import { Icon } from 'semantic-ui-react';

const unorderedList = {
  listStyleType: 'none',
  padding: 0,
};

const PatientPage = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patients }] = useStateValue();

  const patient = Object.values(patients).find(
    (patient: Patient) => patient.id === id
  );

  const genderIcon = () => {
    if ( patient?.gender === 'female') {
      return <Icon name='venus' />;
    } else if ( patient?.gender === 'male') {
      return <Icon name='mars' />;
    } else {
      return <Icon name='genderless' />;
    }
  };

  return (
    <div className="App">
      {patient &&
        <Container>
          <h3>{patient.name} {genderIcon()}</h3>
          <ul style={unorderedList}>
            <li>ssn: {patient.ssn}</li>
            <li>occupation: {patient.occupation}</li>
          </ul>
        </Container>
      }
    </div>
  );
};

export default PatientPage;
