import React from 'react';
import { Row, Col } from 'react-bootstrap';

const Footer = class extends React.Component {
  render() {
    return (
      <footer className="footer container-fluid pt-3 pb-3 pt-md-4 pb-md-4 text-white">
        <Row className="justify-content-center">
          <Col xs={12} sm={10} md={5}>
            <div className="disclaimer border p-2 text-center ">
              Paid for by Miraglia / Quirin 2020
            </div>

            <div className="mt-3 text-center">
              <small>
                Contact us:{' '}
                <a
                  href="mailto:info@miragliaquirin2020.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white"
                >
                  info@miragliaquirin2020.com
                </a>
              </small>
            </div>
          </Col>
        </Row>
      </footer>
    );
  }
};
export default Footer;
