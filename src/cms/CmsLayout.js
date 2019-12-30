import React from 'react';
import { Row, Col, Container, Card } from 'react-bootstrap';

export const CmsLayout = ({ children }) => (
  <Row className="flex-fill d-flex justify-content-start align-items-center">
    <Col>
      <Container className="main">
        <Row className="justify-content-center">
          <Col xs={12} sm={10} md={8}>
            <Card>
              <Card.Body>{children}</Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Col>
  </Row>
);
