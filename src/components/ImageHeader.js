import React from 'react';

import { Jumbotron } from 'react-bootstrap';

import styles from './ImageHeader.scss';

export const ImageHeader = ({ image, children, alignItems = 'center' }) => {
  const jumbotronStyles = {
    backgroundImage: `url(${
      !!image?.childImageSharp ? image?.childImageSharp?.fluid.src : image
    })`
  };

  return (
    <Jumbotron fluid style={jumbotronStyles} className={`${styles.jumbotron} d-flex align-items-${alignItems}`}>
      {children}
    </Jumbotron>
  );
};
