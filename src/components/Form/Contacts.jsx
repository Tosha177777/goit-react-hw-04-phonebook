import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { nanoid } from 'nanoid';

const Contacts = ({ handleContact }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleSubmit = (values, { resetForm }) => {
    const { name } = values;
    const { number } = values;
    const trimName = name.trim();
    const trimNumber = number.trim();
    const newContact = {
      id: nanoid(),
      name: trimName,
      number: trimNumber,
    };
    handleContact(newContact);
    resetForm();
  };

  return (
    <>
      <Formik initialValues={{ name, number }} onSubmit={handleSubmit}>
        <Form>
          <label htmlFor="name">
            <span>Name</span>
            <Field type="text" name="name" required />
          </label>
          <label htmlFor="tel">
            <span>Number</span>
            <Field type="tel" name="number" required />
          </label>
          <button type="submit">Add</button>
        </Form>
      </Formik>
    </>
  );
};
export default Contacts;
