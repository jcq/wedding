import React from 'react';

import { Card } from 'react-bootstrap';

import { HTMLContent } from '../Content';
import styles from './ThingsToDo.module.scss';

export const ThingsToDo = ({ heading, body, className = '' }) => {
  console.log('styles', styles);
  return (
    <Card className={className}>
      {heading && <Card.Header as="h4">{heading}</Card.Header>}
      <Card.Body>
        {body && <HTMLContent content={body} className={styles.content} />}
      </Card.Body>
    </Card>
  );
};
