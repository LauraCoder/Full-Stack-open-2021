import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Button, Container, Icon } from "semantic-ui-react";
import { EntryFormValues } from "../AddEntryModal/AddEntryForm";

import { apiBaseUrl } from "../constants";
import { addNewEntry, useStateValue } from "../state";
import { Patient } from "../types";
import EntryDetails from "./EntryDetails";
import AddEntryModal from "../AddEntryModal";

const unorderedList = {
  listStyleType: "none",
  padding: 0,
};

const PatientPage = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patients }, dispatch] = useStateValue();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const patient = Object.values(patients).find(
    (patient: Patient) => patient.id === id
  );

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  if (!patient) return null;

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const { data: newEntry } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${patient.id}/entries`,
        values
      );
      dispatch(addNewEntry(newEntry));
      closeModal();
    } catch (e) {
      console.error(e.response?.data || "Unknown Error");
      setError(e.response?.data?.error || "Unknown error");
    }
  };

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
            patient.entries.map((entry, i) => (
              <EntryDetails entry={entry} key={i}/>
          ))}
          <AddEntryModal
            modalOpen={modalOpen}
            onSubmit={submitNewEntry}
            error={error}
            onClose={closeModal}
          />
          <Button onClick={() => openModal()}>Add New Entry</Button>
        </Container>
      }
    </div>
  );
};

export default PatientPage;
