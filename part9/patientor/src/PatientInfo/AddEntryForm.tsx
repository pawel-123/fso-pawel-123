import axios from "axios";
import { Field, Form, Formik } from "formik";
import React from "react";
import { Button, Segment } from "semantic-ui-react";
import { DiagnosisSelection, NumberField, TextField } from "../AddPatientModal/FormField";
import { apiBaseUrl } from "../constants";
import { addEntry, useStateValue } from "../state";
import { Entry, EntryType, HealthCheckRating } from "../types";

const AddEntryForm = () => {
  const [{ diagnoses, currentPatient }, dispatch] = useStateValue();
  const [error, setError] = React.useState<string | undefined>();
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (values: any) => {
    if (!currentPatient) {
      throw new Error('Missing patient info');
    }

    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${currentPatient.id}/entries`,
        values
      );
      dispatch(addEntry(newEntry, currentPatient));
    } catch (e) {
      console.log('e.response: ', e.response);
      console.error(e.response?.data || 'Unknown error');
      setError(e.response?.data || 'Unknown error');
    }
  };
  
  return (
    <div>
      <h2>Add a new entry</h2>
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
      <Formik
        initialValues={{
          description: "",
          date: "",
          specialist: "",
          type: EntryType.HealthCheck,
          healthCheckRating: HealthCheckRating.Healthy,
        }}
        onSubmit={onSubmit}
      >
        {({ setFieldValue, setFieldTouched }) => {
          return (
            <Form className="form ui">
              <Field 
                label="Type"
                placeholder="Type"
                name="type"
                component={TextField}
              />
              <Field 
                label="Description"
                placeholder="Description"
                name="description"
                component={TextField}
              />
              <Field 
                label="Date"
                placeholder="YYYY-MM-DD"
                name="date"
                component={TextField}
              />
              <Field 
                label="Specialist"
                placeholder="Specialist"
                name="specialist"
                component={TextField}
              />
              <DiagnosisSelection 
                setFieldValue={setFieldValue}
                setFieldTouched={setFieldTouched}
                diagnoses={diagnoses}
              />
              <Field 
                label="Health Check Rating"
                placeholder="Health Check Rating"
                name="healthCheckRating"
                component={NumberField}
                min={0}
                max={3}
              />
              <Button
                type="submit"
                color="green"
              >
                Add entry
              </Button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default AddEntryForm;