import React from 'react';
import PropTypes from 'prop-types';

export const EventItem = ({ title, date, body }) => {
  return (
    <div className="text-center">
      <h4>{title}</h4>
      <p>{date}</p>
    </div>
  );
};

EventItem.propTypes = {
  title: PropTypes.string,
  date: PropTypes.string,
  description: PropTypes.string,
  featuredevent: PropTypes.string,
  featuredimage: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  body: PropTypes.string
};

export default EventItem;
