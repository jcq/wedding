import React from 'react';

import { Card } from 'react-bootstrap';
import Content from '../Content';

export const ThingsToDo = ({ heading, body, className = '' }) => {
  return (
    <Card className={className}>
      {heading && <Card.Header as="h4">{heading}</Card.Header>}
      <Card.Body>{body && <Content content={body} />}</Card.Body>
    </Card>
  );
};
