import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Form } from 'react-bootstrap';

const handleSubmit = event => {
  console.log('handleSubmit', event);

  const payload = {};

  event.preventDefault();
};

export const RsvpForm = ({
  notesPlaceholder = 'Is there anything else we should know?'
}) => {
  const [attendees, setAttendees] = useState(0);
  const [names, setNames] = useState([]);
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (attendees > names.length) {
      const toAdd = attendees - names.length;
      setNames([...names, ...Array.from({ length: toAdd }, (v, i) => '')]);
    } else if (attendees < names.length) {
      const toRemove = names - attendees;
      setNames([...names.splice(attendees - 1, toRemove)]);
    }
  }, [attendees, names]);

  const handleChangeName = event => {
    console.log('handleChangeName', event.target.dataset.idx);
    const updatedNames = [...names];
    updatedNames[event.target.dataset.idx] = event.target.value;
    setNames(updatedNames);
  };

  return (
    <Form name="rsvp" onSubmit={handleSubmit}>
      <Form.Group controlId="howMany">
        <Form.Label>How many will be attending?</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter a number"
          value={attendees}
          onChange={event => setAttendees(event.target.value)}
        ></Form.Control>
      </Form.Group>
      {names.map((name, idx) => (
        <Form.Group controlId={'name-' + idx} key={'name-' + idx}>
          <Form.Label>Name {idx + 1}</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            data-idx={idx}
            value={name}
            onChange={handleChangeName}
          ></Form.Control>
        </Form.Group>
      ))}
      <Form.Group controlId="notes">
        <Form.Label>Notes</Form.Label>
        <Form.Control
          as="textarea"
          rows="3"
          placeholder={notesPlaceholder}
          value={notes}
          onChange={event => setNotes(event.target.value)}
        ></Form.Control>
      </Form.Group>
    </Form>
  );
};

RsvpForm.propTypes = {
  notesPlaceholder: PropTypes.string
};
