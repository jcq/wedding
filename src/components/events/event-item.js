import React from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';

export const EventItem = ({ title, date, location, address, body }) => {
  const formattedDate = format(new Date(date), 'MMM dd, yyyy');

  const gMapUrl = `https://www.google.com/maps/search/?api=1&query=${location},${address}`;
  const encUrl = encodeURI(gMapUrl);

  return (
    <div className="text-center">
      <h4>{title}</h4>
      <p>{formattedDate}</p>
      <div className="pt-1">
        {location && <div>{location}</div>}
        {address && <div>{address}</div>}
        {address && (
          <div>
            <small>
              [
              <a href={encUrl} target="_blank" rel="noopener noreferrer">
                Map
              </a>
              ]
            </small>
          </div>
        )}
      </div>
    </div>
  );
};

EventItem.propTypes = {
  title: PropTypes.string,
  date: PropTypes.string,
  location: PropTypes.string,
  address: PropTypes.string,
  description: PropTypes.string,
  featuredevent: PropTypes.string,
  featuredimage: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  body: PropTypes.string
};

export default EventItem;
