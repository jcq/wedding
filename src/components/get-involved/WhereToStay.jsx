import React from 'react';

import { Card } from 'react-bootstrap';
import Content from '../Content';

const gMapUrl = ({ location, address }) => {
  const loc = encodeURIComponent(location);
  const addr = encodeURIComponent(address);
  const gMapUrl = `https://www.google.com/maps/search/?api=1&query=${loc},${addr}`;

  return gMapUrl;
};

export const WhereToStay = ({ heading, body, hotels, className = '' }) => {
  return (
    <Card className={className}>
      {heading && <Card.Header as="h4">{heading}</Card.Header>}
      <Card.Body>
        {body && <Content content={body} />}
        {hotels.length && (
          <div className="hotel-list">
            {hotels.map((hotel, idx) => (
              <Card key={idx}>
                <Card.Body>
                  <Card.Title>{hotel.name}</Card.Title>
                  <address className="pt-1">
                    {hotel.address.split('\n').map((item, key) => {
                      return (
                        <React.Fragment key={key}>
                          {item}
                          <br />
                        </React.Fragment>
                      );
                    })}

                    {hotel.address && (
                      <div>
                        <small>
                          [
                          <a
                            href={gMapUrl({
                              location: hotel.name,
                              address: hotel.address
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
                </Card.Body>
              </Card>
            ))}
          </div>
        )}
      </Card.Body>
    </Card>
  );
};
