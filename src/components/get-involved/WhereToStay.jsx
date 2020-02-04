import React from 'react';

import { Card, Row, Col } from 'react-bootstrap';
import Content from '../Content';

const gMapUrl = ({ location, address }) => {
  const loc = encodeURIComponent(location);
  const addr = encodeURIComponent(address);
  const gMapUrl = `https://www.google.com/maps/search/?api=1&query=${loc},${addr}`;

  return gMapUrl;
};

export const HotelCard = ({ name, address, notes }) => (
  <Card>
    <Card.Body>
      <Card.Title>{name}</Card.Title>
      <address className="pt-1">
        {address.split('\n').map((item, key) => {
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
      {notes && <div class="notes">{notes}</div>}
    </Card.Body>
  </Card>
);

export const WhereToStay = ({ heading, body, hotels, className = '' }) => {
  return (
    <Card className={className}>
      {heading && <Card.Header as="h4">{heading}</Card.Header>}
      <Card.Body>
        {body && <Content content={body} />}
        {hotels.length && (
          <div className="hotel-list">
            <Row>
              {hotels.map((hotel, idx) => (
                <Col key={idx}>
                  <HotelCard {...hotel} />
                </Col>
              ))}
            </Row>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};
