import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';

import { Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { saveToNetlify } from './netlify-form';
import { AttendenceResponse } from './AttendenceResponse';
import { RsvpContext } from './RsvpContext';

const validationSchema = yup.object().shape({
  primaryName: yup.string().required(),
  email: yup
    .string()
    .email()
    .required(),
  attending: yup
    .string()
    .matches(/^yes$|^no$/, 'Must be either "Yes" or "No"')
    .required(),
  notes: yup.string()
});

export const RsvpForm = () => {
  const {
    register,
    watch,
    handleSubmit,
    errors,
    formState: { touched, isValid }
  } = useForm({ validationSchema, mode: 'onBlur' });

  const [{ notesPlaceholder }] = useContext(RsvpContext);

  const watchAttending = watch('attending');

  const [loading, setLoading] = useState(false);

  const onSubmit = async data => {
    const payload = {
      ...data
    };

    setLoading(true);
    await saveToNetlify({ payload, formName: 'rsvp' });
    setLoading(false);
  };

  return (
    <Form
      noValidate
      name="rsvp"
      onSubmit={handleSubmit(onSubmit)}
      data-netlify="true"
      data-netlify-honeypot="bot-field"
    >
      <Form.Control
        ref={register}
        type="hidden"
        name="form-name"
        value="rsvp"
      />
      <Form.Control
        ref={register}
        type="text"
        name="bot-field"
        style={{ display: 'none' }}
      />
      <Form.Control ref={register} type="hidden" name="names" value="" />

      <Form.Group>
        <Form.Label>Your Name</Form.Label>
        <Form.Control
          ref={register}
          type="text"
          name="primaryName"
          placeholder="Enter your full name"
          isValid={touched.primaryName && !errors.primaryName}
          isInvalid={!!errors.primaryName}
        ></Form.Control>
      </Form.Group>

      <Form.Group>
        <Form.Label>Email Address</Form.Label>
        <Form.Control
          ref={register}
          type="text"
          name="email"
          placeholder="Enter your email address"
          isValid={touched.email && !errors.email}
          isInvalid={!!errors.email}
        ></Form.Control>
      </Form.Group>

      <Form.Group>
        <Form.Label className={{ 'text-danger': !!errors.attending }}>
          Attending?
        </Form.Label>
        <Form.Check type="radio" id="attending-yes">
          <Form.Check.Input
            ref={register}
            type="radio"
            name="attending"
            value="yes"
            isInvalid={!!errors.attending}
          />
          <Form.Check.Label>Yes</Form.Check.Label>
        </Form.Check>
        <Form.Check type="radio" id="attending-no">
          <Form.Check.Input
            ref={register}
            type="radio"
            name="attending"
            value="no"
            isInvalid={!!errors.attending}
          />
          <Form.Check.Label>No</Form.Check.Label>
        </Form.Check>
      </Form.Group>

      {watchAttending && <AttendenceResponse attending={watchAttending} />}

      {watchAttending && (
        <Form.Group controlId="notes">
          <Form.Label>Notes</Form.Label>
          <Form.Control
            ref={register}
            name="notes"
            as="textarea"
            rows="3"
            placeholder={notesPlaceholder}
          ></Form.Control>
        </Form.Group>
      )}

      <Button variant="primary" type="submit" disabled={!isValid || loading}>
        Submit
      </Button>
    </Form>
  );
};

RsvpForm.propTypes = {
  notesPlaceholder: PropTypes.string,
  onSubmit: PropTypes.func
};
