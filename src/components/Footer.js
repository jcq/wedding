import React from 'react';
import { Row, Col } from 'react-bootstrap';

const Footer = class extends React.Component {
  render() {
    return (
      <footer className="footer container pt-4 pb-4">
        <Row className="justify-content-md-center">
          <Col xs={8} md={5}>
            <div className="disclaimer border p-2 text-center">
              Paid for by Miraglia / Quirin 2020
            </div>
          </Col>
        </Row>
      </footer>
    );
  }
};

export default Footer;
