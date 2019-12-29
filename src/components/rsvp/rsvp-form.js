import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Form, Button } from 'react-bootstrap';

import { saveToNetlify } from './netlify-form';

export const RsvpForm = ({ notesPlaceholder }) => {
  const [attendees, setAttendees] = useState(0);
  const [names, setNames] = useState([]);
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);

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
    const updatedNames = [...names];
    updatedNames[event.target.dataset.idx] = event.target.value;
    setNames(updatedNames);
  };

  const handleSubmit = async event => {
    event.preventDefault();

    const payload = {
      attendees,
      names,
      notes
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
      <Form.Group controlId="howMany">
        <Form.Label>How many will be attending?</Form.Label>
        <Form.Control
          type="number"
          name="attendees"
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
          name="notes"
          as="textarea"
          rows="3"
          placeholder={notesPlaceholder}
          value={notes}
          onChange={event => setNotes(event.target.value)}
        ></Form.Control>
      </Form.Group>
      <Button variant="primary" type="submit" disabled={loading}>
        Submit
      </Button>
    </Form>
  );
};

RsvpForm.propTypes = {
  notesPlaceholder: PropTypes.string,
  onSubmit: PropTypes.func
};
