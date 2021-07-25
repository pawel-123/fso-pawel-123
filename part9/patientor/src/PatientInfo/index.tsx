import axios from "axios";
import React from "react";
import { Icon } from "semantic-ui-react";
import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../constants";
import { getPatient, useStateValue } from "../state";
import { Patient } from "../types";

const PatientInfo = () => {
  const[{ currentPatient }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();

  React.useEffect(() => {
    if (!(currentPatient?.id === id)) {
      const fetchPatient = async () => {
        console.log('fetching patient data');
        const patient = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
        if (patient.data) {
          dispatch(getPatient(patient.data));
        }
      };
      void fetchPatient();
    }
  }, [id]);

  if (!currentPatient) {
    return null;
  }

  const getGenderIcon = (gender: string) => {
    switch(gender) {
      case "male":
        return "mars";
      case "female":
        return "venus";
      case "other":
        return "neuter";
    }
  };

  return (
    <div>
      <h2>{currentPatient.name} <Icon name={getGenderIcon(currentPatient.gender)} /></h2>
      <p>ssn: {currentPatient.ssn}</p>
      <p>occupation: {currentPatient.occupation}</p>
    </div>
  );
};

export default PatientInfo;