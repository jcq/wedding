import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { RsvpContext } from './RsvpContext';

export const AttendenceResponse = ({ attending }) => {
  const [{ attending_msg, not_attending_msg }] = useContext(RsvpContext);

  if (!attending) return null;

  return <p>{attending === 'yes' ? attending_msg : not_attending_msg}</p>;
};
AttendenceResponse.propTypes = {
  attending: PropTypes.string
};
