import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Form, Button } from 'react-bootstrap';

import { saveToNetlify } from './netlify-form';
import { RsvpFormInitial } from './rsvp-form-initial';
import { RsvpFormAttendees } from './rsvp-form-attendees';
import { RsvpFormExtra } from './rsvp-form-extra';

export const RsvpForm = ({ notesPlaceholder }) => {
  const [step, setStep] = useState('initial');
  const [inputs, setInputs] = useState({
    attendees: 0,
    primaryName: '',
    addtlNames: [],
    notes: ''
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (field, value) => {
    setInputs(inputs => ({
      ...inputs,
      [field]: value
    }));
  };

  const nextStep = () => {
    switch (step) {
      case 'initial':
        if (inputs['attending'] === 'yes') {
          setStep('attendees');
        } else {
          setStep('extra');
        }
        break;
      case 'attendees':
        setStep('extra');
        break;
      default:
        break;
    }
  };

  const handleSubmit = async event => {
    event.preventDefault();

    const payload = {
      ...inputs
    };

    setLoading(true);
    await saveToNetlify({ payload, formName: 'rsvp' });
    setLoading(false);
  };

  return (
    <Form
      name="rsvp"
      onSubmit={handleSubmit}
      data-netlify="true"
      data-netlify-honeypot="bot-field"
    >
      <Form.Control type="hidden" name="form-name" value="rsvp" />
      <Form.Control type="text" name="bot-field" style={{ display: 'none' }} />
      <Form.Control type="hidden" name="names" value="" />

      {step === 'initial' && (
        <RsvpFormInitial
          formVals={inputs}
          onChange={handleInputChange}
          onNext={nextStep}
        />
      )}

      {step === 'attendees' && (
        <RsvpFormAttendees
          formVals={inputs}
          onChange={handleInputChange}
          onNext={nextStep}
        />
      )}

      {step === 'extra' && (
        <>
          <RsvpFormExtra
            formVals={inputs}
            onChange={handleInputChange}
            onNext={nextStep}
            notesPlaceholder={notesPlaceholder}
          />
          <Button variant="primary" type="submit" disabled={loading}>
            Submit
          </Button>
        </>
      )}
    </Form>
  );
};

RsvpForm.propTypes = {
  notesPlaceholder: PropTypes.string,
  onSubmit: PropTypes.func
};
