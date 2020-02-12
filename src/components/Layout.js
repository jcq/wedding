import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Footer from '../components/Footer';
import Header from './Header';
import './all.scss';

import { Container, Row, Col } from 'react-bootstrap';

import { SiteHelmet } from './SiteHelmet';
import layoutStyles from './Layout.scss';

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

const TemplateWrapper = ({ children, theme = 'interior', bgImage }) => {
  return (
    <div {...wrapperProps(theme, bgImage)}>
      <SiteHelmet />
      {theme === 'index' && <div className="bg" style={{ backgroundImage: bgImage ? `url(${bgImage})` : '' }} />}
      <Container
        fluid={true}
        className={containerClasses(theme)}
        // style={{ backgroundImage: bgImage ? `url(${bgImage})` : '' }}
      >
        <Row>
          <Col className="p-0">
            <Header variant="light" />
          </Col>
        </Row>
        <Row className="flex-fill d-flex justify-content-start align-items-top pt-4">
          <Col>
            <Container className="main h-100">
              <Row
                className="justify-content-center align-items-center"
                style={{ minHeight: '75%' }}
              >
                <Col xs={12} sm={10} md={9} className="h-100 main">
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
};

TemplateWrapper.propTypes = {
  theme: PropTypes.string
};

export default TemplateWrapper;
