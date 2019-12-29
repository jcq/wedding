import React from 'react';
import { Helmet } from 'react-helmet';
import Footer from '../components/Footer';
import Header from './Header';
import './all.scss';
import useSiteMetadata from './SiteMetadata';
import { withPrefix } from 'gatsby';
import { Container, Row, Col, Card } from 'react-bootstrap';

const TemplateWrapper = ({ children }) => {
  const { title, description } = useSiteMetadata();
  return (
    <div>
      <Helmet>
        <html lang="en" />
        <title>{title}</title>
        <meta name="description" content={description} />

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href={`${withPrefix('/')}img/apple-touch-icon.png`}
        />
        <link
          rel="icon"
          type="image/png"
          href={`${withPrefix('/')}img/favicon-32x32.png`}
          sizes="32x32"
        />
        <link
          rel="icon"
          type="image/png"
          href={`${withPrefix('/')}img/favicon-16x16.png`}
          sizes="16x16"
        />

        <link
          rel="mask-icon"
          href={`${withPrefix('/')}img/safari-pinned-tab.svg`}
          color="#ff4400"
        />
        <meta name="theme-color" content="#fff" />

        <meta property="og:type" content="business.business" />
        <meta property="og:title" content={title} />
        <meta property="og:url" content="/" />
        <meta
          property="og:image"
          content={`${withPrefix('/')}img/og-image.jpg`}
        />
      </Helmet>
      <Container fluid={true} className="d-flex min-vh-100 flex-column">
        <Row>
          <Col>
            <Header />
          </Col>
        </Row>
        <Row className="flex-fill fill d-flex justify-content-start">
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
        <Row className="bg-primary">
          <Col>
            <Footer />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default TemplateWrapper;
