import React from 'react';
import PropTypes from 'prop-types';
import { format, utcToZonedTime } from 'date-fns-tz';
import { Card, Row, Col } from 'react-bootstrap';
import { HTMLContent } from '../Content';
import PreviewCompatibleImage from '../PreviewCompatibleImage';
import { OutboundLink } from 'gatsby-plugin-google-analytics';

export const EventItem = ({ event }) => {
  const {
    title,
    start,
    end,
    location,
    url,
    address,
    body,
    featuredImage
  } = event;
  const tz = 'America/Chicago';
  const formattedDate = format(utcToZonedTime(new Date(start), tz), 'EEEE, MMMM dd, yyyy');
  const startTime = format(utcToZonedTime(new Date(start), tz), 'hh:mm aaaa');
  const endTime = format(utcToZonedTime(new Date(end), tz), 'hh:mm aaaa');

  const gMapUrl = `https://www.google.com/maps/search/?api=1&query=${location},${address}`;
  const encUrl = encodeURI(gMapUrl);

  return (
    <Card>
      <Card.Header as="h4">{title}</Card.Header>
      <Card.Body>
        <Row>
          {featuredImage && (
            <Col md={{ span: 6, order: 12 }} lg={4}>
              <div className="">
                <PreviewCompatibleImage
                  imageInfo={{
                    image: featuredImage,
                    alt: `Image for ${title}`,
                    style: { width: '100%' }
                  }}
                />
              </div>
            </Col>
          )}
          <Col md={{ span: 6, order: 1 }} lg={8}>
            <Card.Title>
              {formattedDate}
              <br />
              <small>
                {startTime} – {endTime}
              </small>
            </Card.Title>
            <address className="pt-1">
              {location && url ? (
                <div>
                  <OutboundLink
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {location}
                  </OutboundLink>
                </div>
              ) : (
                <div>{location}</div>
              )}
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
                    <OutboundLink href={encUrl} target="_blank" rel="noopener noreferrer">
                      Map
                    </OutboundLink>
                    ]
                  </small>
                </div>
              )}
            </address>
            {body && <HTMLContent className="content" content={body} />}
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

EventItem.propTypes = {
  event: PropTypes.shape({
    title: PropTypes.string,
    date: PropTypes.string,
    location: PropTypes.string,
    url: PropTypes.string,
    address: PropTypes.string,
    description: PropTypes.string,
    featuredevent: PropTypes.bool,
    featuredImage: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    body: PropTypes.string
  })
};

export default EventItem;
