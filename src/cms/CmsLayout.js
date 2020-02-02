import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import classNames from 'classnames/bind';
import Header from '../components/Header';
import Footer from '../components/Footer';

import layoutStyles from '../components/Layout.scss';

const cx = classNames.bind(layoutStyles);

const wrapperProps = (theme, bgImage) => {
  const props = {
    className: cx({
      index: theme === 'index',
      interior: theme === 'interior'
    })
  };
  return props;
};

const containerClasses = theme => {
  return cx('d-flex min-vh-100 flex-column outside', {});
};

export const CmsLayout = ({ children, theme = 'interior', bgImage }) => (
  <div {...wrapperProps(theme, bgImage)}>
    <Container
      fluid={true}
      className={containerClasses(theme)}
      style={{ backgroundImage: bgImage ? `url(${bgImage})` : '' }}
    >
      <Row>
        <Col>
          <Header />
        </Col>
      </Row>
      <Row className="flex-fill d-flex justify-content-start align-items-top pt-4">
        <Col>
          <Container className="main h-100">
            <Row
              className="justify-content-center align-items-center"
              style={{ minHeight: '75%' }}
            >
              <Col xs={12} sm={10} md={9} className="h-100">
                {children}
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
      <Row className="">
        <Col>
          <Footer />
        </Col>
      </Row>
    </Container>
  </div>
);
