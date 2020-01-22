import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { RsvpContext } from './RsvpContext';

export const AttendenceResponse = ({ attending }) => {
  const [{ attendingMsg, notAttendingMsg }] = useContext(RsvpContext);

  if (!attending) return null;

  return <p>{attending === 'yes' ? attendingMsg : notAttendingMsg}</p>;
};
AttendenceResponse.propTypes = {
  attending: PropTypes.string
};
