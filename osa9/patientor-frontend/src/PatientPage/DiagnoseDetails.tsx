import React from "react";
import { Diagnosis } from "../types";
import { useStateValue } from "../state";
import { List } from "semantic-ui-react";

const DiagnoseDetails = ({ diagnosisCodes }: {diagnosisCodes: Array<Diagnosis["code"]>}) => {
  const [{ diagnosis }] = useStateValue();
    
  return (
    <>  
      {diagnosisCodes.map(code => (
        <List.Item key={code}>
          {code} {diagnosis[code]?.name}
        </List.Item>
      ))}
    </>
  );
};

export default DiagnoseDetails;