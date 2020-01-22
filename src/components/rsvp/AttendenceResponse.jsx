import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { RsvpContext } from './RsvpContext';
import { Alert } from 'react-bootstrap';

export const AttendenceResponse = ({ attending }) => {
  const [{ attendingMsg, notAttendingMsg }] = useContext(RsvpContext);

  if (!attending) return null;

  return (
    <Alert variant="info">
      {attending === 'yes' ? attendingMsg : notAttendingMsg}
    </Alert>
  );
};
AttendenceResponse.propTypes = {
  attending: PropTypes.string
};
