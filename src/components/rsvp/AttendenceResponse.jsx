import React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery } from 'gatsby';
import { rsvpPageQuery } from '../../templates/rsvp-page';

export const AttendenceResponse = ({ attending }) => {
  const { attending_msg, not_attending_msg } = useStaticQuery(rsvpPageQuery);
  if (!attending) return null;

  return <p>{attending == 'yes' ? attending_msg : not_attending_msg}</p>;
};
AttendenceResponse.propTypes = {
  attending: PropTypes.string
};
