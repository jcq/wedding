import React from 'react';
import ReactMarkdown from 'react-markdown/with-html';

import { Card } from 'react-bootstrap';

export const ThingsToDo = ({ heading, body, className = '' }) => {
  return (
    <Card className={className}>
      {heading && <Card.Header as="h4">{heading}</Card.Header>}
      <Card.Body>{body && <ReactMarkdown source={body} />}</Card.Body>
    </Card>
  );
};
