import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap';

export const RsvpFormAttendees = ({
  formVals: { addtlNames, attendees },
  onChange,
  onNext
}) => {
  useEffect(() => {
    if (attendees > addtlNames.length) {
      const toAdd = attendees - addtlNames.length;
      onChange('addtlNames', [
        ...addtlNames,
        ...Array.from({ length: toAdd }, (v, i) => '')
      ]);
    } else if (attendees < addtlNames.length) {
      const toRemove = addtlNames - attendees;
      onChange('addtlNames', [...addtlNames.splice(attendees - 1, toRemove)]);
    }
  }, [attendees, addtlNames, onChange]);

  const handleChangeName = event => {
    const updatedNames = [...addtlNames];
    updatedNames[event.target.dataset.idx] = event.target.value;
    onChange('addtlNames', updatedNames);
  };

  const isValid = () => {
    return (
      attendees === addtlNames.length && addtlNames.every(name => Boolean(name))
    );
  };

  return (
    <>
      <Form.Group controlId="howMany">
        <Form.Label>How many others will be attending?</Form.Label>
        <Form.Control
          type="number"
          name="attendees"
          placeholder="Enter a number"
          value={attendees}
          onChange={evt => onChange(evt.target.name, evt.target.value)}
          min={1}
        ></Form.Control>
      </Form.Group>
      {addtlNames.map((name, idx) => (
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

RsvpFormAttendees.propTypes = {
  formVals: PropTypes.shape({
    addtlNames: PropTypes.array,
    attendees: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  }),
  onChange: PropTypes.func,
  onNext: PropTypes.func
};
