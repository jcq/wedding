import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';

import { Form, Button } from 'react-bootstrap';
import { useForm, FormContext } from 'react-hook-form';
import * as yup from 'yup';

import { saveToNetlify } from './netlify-form';
import { AttendenceResponse } from './AttendenceResponse';
import { RsvpContext } from './RsvpContext';
import { RsvpFormAttendees } from './rsvp-form-attendees';
import { navigate } from 'gatsby';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const validationSchema = yup.object().shape({
  primaryName: yup.string().required(),
  email: yup.string().email(),
  attending: yup
    .string()
    .matches(/^yes$|^no$/, 'Must be either "Yes" or "No"')
    .required(),
  guests: yup
    .array(
      yup
        .object()
        .shape({ name: yup.string().required() })
        .required()
    )
    .nullable(),
  notes: yup.string()
});

const defaultValues = {
  'form-name': 'rsvp2',
  guests: [],
  notes: '',
  'bot-field': ''
};

export const RsvpForm = () => {
  const formMethods = useForm({
    validationSchema,
    defaultValues,
    mode: 'onBlur'
  });
  const {
    register,
    watch,
    handleSubmit,
    errors,
    formState: { touched }
  } = formMethods;

  const [{ notesPlaceholder }] = useContext(RsvpContext);

  const watchAttending = watch('attending');
  const watchEmail = watch('email');

  const [loading, setLoading] = useState(false);

  const onSubmit = async data => {
    const payload = {
      ...data,
      guests: Array.isArray(data.guests) ? data.guests.map(g => g.name) : ''
    };

    setLoading(true);
    await saveToNetlify({ payload, formName: 'rsvp2' });
    setLoading(false);

    navigate('/rsvp/thanks');
  };

  return (
    <FormContext {...formMethods}>
      <Form
        noValidate
        name="rsvp2"
        onSubmit={handleSubmit(onSubmit)}
        data-netlify="true"
        data-netlify-honeypot="bot-field"
      >
        <Form.Control ref={register} type="hidden" name="form-name" />
        <Form.Control
          ref={register}
          type="text"
          name="bot-field"
          value=""
          style={{ display: 'none' }}
        />
        <Form.Control ref={register} type="hidden" name="guests" />
        <Form.Control type="hidden" name="notes" />

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
          <Form.Control.Feedback type="invalid">
            Name is required
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            ref={register}
            type="text"
            name="email"
            placeholder="Enter your email address"
            isValid={touched.email && !!watchEmail && !errors.email}
            isInvalid={!!errors.email}
          ></Form.Control>
          <Form.Control.Feedback type="invalid">
            Please enter a valid email address
          </Form.Control.Feedback>
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

        {watchAttending && watchAttending === 'yes' && (
          <RsvpFormAttendees className="" />
        )}

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

        <Button variant="primary" type="submit" disabled={loading}>
          {loading && (
            <>
              <FontAwesomeIcon icon={faSpinner} spin={true} />{' '}
            </>
          )}
          Submit
        </Button>
      </Form>
    </FormContext>
  );
};

RsvpForm.propTypes = {
  notesPlaceholder: PropTypes.string,
  onSubmit: PropTypes.func
};
