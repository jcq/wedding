import React from 'react';
import { Row, Col } from 'react-bootstrap';

const Footer = class extends React.Component {
  render() {
    return (
      <footer className="footer container-fluid pt-3 pb-3 pt-md-4 pb-md-4 text-white">
        <Row className="justify-content-center">
          <Col className="text-center">
            <div className="disclaimer d-inline-block border p-2 text-center text-uppercase">
              Paid for by Miraglia / Quirin 2021
            </div>
          </Col>
        </Row>
      </footer>
    );
  }
};
export default Footer;
