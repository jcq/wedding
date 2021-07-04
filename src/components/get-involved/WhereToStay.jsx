import React from 'react';

import { Card, CardDeck } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown/with-html';

const gMapUrl = ({ location, address }) => {
  const loc = encodeURIComponent(location);
  const addr = encodeURIComponent(address);
  const gMapUrl = `https://www.google.com/maps/search/?api=1&query=${loc},${addr}`;

  return gMapUrl;
};

export const HotelCard = ({ name, url, address, phone, notes }) => (
  <Card>
    <Card.Body>
      <Card.Title>
        {url ? (
          <a href={url} target="_blank" rel="noopener noreferrer">
            {name}
          </a>
        ) : (
          { name }
        )}
      </Card.Title>
      <address className="pt-1">
        {phone && <div>{phone}</div>}
        {address &&
          address.split('\n').map((item, key) => {
            return (
              <React.Fragment key={key}>
                {item}
                <br />
              </React.Fragment>
            );
          })}

        {address && (
          <div>
            <small>
              [
              <a
                href={gMapUrl({
                  location: name,
                  address: address
                })}
                target="_blank"
                rel="noopener noreferrer"
              >
                Map
              </a>
              ]
            </small>
          </div>
        )}
      </address>
      {notes && <ReactMarkdown source={notes} />}
    </Card.Body>
  </Card>
);

export const WhereToStay = ({ heading, body, hotels, className = '' }) => {
  return (
    <Card className={className}>
      {heading && <Card.Header as="h4" id="where-to-stay">{heading}</Card.Header>}
      <Card.Body>
        {body && <ReactMarkdown source={body} />}
        {hotels.length && (
          <div className="hotel-list">
            <CardDeck>
              {hotels.map((hotel, idx) => (
                <HotelCard {...hotel} key={idx} />
              ))}
            </CardDeck>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};
