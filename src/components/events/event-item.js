import React from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';

export const EventItem = ({ title, date, location, address, body }) => {
  const formattedDate = format(new Date(date), 'MMM dd, yyyy');

  return (
    <div className="text-center">
      <h4>{title}</h4>
      <p>{formattedDate}</p>
      <p>
        {location && <div>{location}</div>}
        {address & <div>{address}</div>}
      </p>
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
