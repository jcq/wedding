import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';

export const RsvpFormExtra = ({
  formVals: { notes },
  onChange,
  onNext,
  notesPlaceholder
}) => {
  return (
    <>
      <Form.Group controlId="notes">
        <Form.Label>Notes</Form.Label>
        <Form.Control
          name="notes"
          as="textarea"
          rows="3"
          placeholder={notesPlaceholder}
          value={notes}
          onChange={evt => onChange(evt.target.name, evt.target.value)}
        ></Form.Control>
      </Form.Group>
    </>
  );
};

RsvpFormExtra.propTypes = {
  formVals: PropTypes.shape({
    primaryName: PropTypes.string,
    attending: PropTypes.string
  }),
  onChange: PropTypes.func,
  onNext: PropTypes.func,
  notesPlaceholder: PropTypes.string
};
