import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import Header from '../components/Header';
import Footer from '../components/Footer';

export const CmsLayout = ({ children }) => (
  <Container fluid={true} className="d-flex min-vh-100 flex-column">
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
);
