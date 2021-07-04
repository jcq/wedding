import React from 'react';

import { Card } from 'react-bootstrap';

import { HTMLContent } from '../Content';
import styles from './ThingsToDo.module.scss';

export const ThingsToDo = ({ heading, body, className = '' }) => {
  return (
    <Card className={className}>
      {heading && <Card.Header as="h4" id="things-to-do">{heading}</Card.Header>}
      <Card.Body>
        {body && <HTMLContent content={body} className={styles.content} />}
      </Card.Body>
    </Card>
  );
};
