import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap';

export const RsvpFormInitial = ({
  formVals: { primaryName, attending },
  onChange,
  onNext
}) => {
  const isValid = () => {
    return primaryName && attending;
  };

  return (
    <>
      <Form.Group>
        <Form.Label>Your Name</Form.Label>
        <Form.Control
          type="text"
          name="primaryName"
          placeholder="Enter your full name"
          value={primaryName}
          onChange={evt => onChange(evt.target.name, evt.target.value)}
        ></Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label>Attending?</Form.Label>
        <Form.Check type="radio" id="attending-yes">
          <Form.Check.Input
            type="radio"
            name="attending"
            value="yes"
            onChange={evt => onChange(evt.target.name, evt.target.value)}
          />
          <Form.Check.Label>Yes</Form.Check.Label>
        </Form.Check>
        <Form.Check type="radio" id="attending-no">
          <Form.Check.Input
            type="radio"
            name="attending"
            value="no"
            onChange={evt => onChange(evt.target.name, evt.target.value)}
          />
          <Form.Check.Label>No</Form.Check.Label>
        </Form.Check>
      </Form.Group>
      <Button
        variant="primary"
        type="button"
        disabled={!isValid()}
        onClick={() => onNext()}
      >
        Next
      </Button>
    </>
  );
};

RsvpFormInitial.propTypes = {
  formVals: PropTypes.shape({
    primaryName: PropTypes.string,
    attending: PropTypes.string
  }),
  onChange: PropTypes.func,
  onNext: PropTypes.func
};
