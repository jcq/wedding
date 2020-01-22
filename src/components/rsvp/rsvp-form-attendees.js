import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

import { useFormContext } from 'react-hook-form';

export const RsvpFormAttendees = ({ className }) => {
  const { register } = useFormContext();
  const [guests, setGuests] = useState([]);

  const addGuest = () => {
    setGuests(prevGuests => [...prevGuests, '']);
  };

  return (
    <div className={className}>
      <Button variant="primary" size="sm" onClick={addGuest} className="mb-3">
        <FontAwesomeIcon icon={faPlusCircle} /> Add Guest
      </Button>

      {guests.map((name, idx) => (
        <Form.Group controlId={'name-' + idx} key={'name-' + idx}>
          <Form.Label>Name {idx + 1}</Form.Label>
          <Form.Control
            ref={register}
            type="text"
            placeholder="Enter name"
            data-idx={idx}
          ></Form.Control>
        </Form.Group>
      ))}
    </div>
  );
};

RsvpFormAttendees.propTypes = {};
