import React from 'react';
import PropTypes from 'prop-types';
import { Link, graphql } from 'gatsby';

import Content, { HTMLContent } from '../components/Content';

import Layout from '../components/Layout';
import { Button, Card, Alert } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown/with-html';
import { Hero } from '../components/Hero';

import styles from './index-page.module.scss';

export const IndexPageTemplate = ({
  title,
  subheading,
  contentComponent,
  content,
  alert
}) => {
  const PageContent = contentComponent || Content;

  return (
    <div>
      <Hero />
      <Card className={styles.main}>
        <Card.Body>
          {title && <h1 className="text-center text-primary">{title}</h1>}
          {subheading && (
            <h3 className="text-center text-secondary">{subheading}</h3>
          )}
          {content && (
            <PageContent
              className="content text-center mt-3"
              content={content}
            />
          )}
          <p className="text-center">
            <Button as={Link} to="/rsvp" variant="danger">
              RSVP by June 1, 2021
            </Button>
          </p>

          {alert && !alert.disabled && (
            <Alert variant="warning">
              {alert.heading && <Alert.Heading>{alert.heading}</Alert.Heading>}
              {alert.details && <span><ReactMarkdown source={alert.details} /></span>}{' '}
              {alert.link && (
                <Alert.Link as={Link} to={alert.link}>
                  Read more...
                </Alert.Link>
              )}
            </Alert>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

IndexPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  heading: PropTypes.string,
  subheading: PropTypes.string,
  content: PropTypes.string
};

const IndexPage = ({ data }) => {
  const { frontmatter, html } = data.markdownRemark;

  return (
    <Layout theme="index" bgImage={frontmatter.image}>
      <IndexPageTemplate
        // image={frontmatter.image}
        title={frontmatter.title}
        heading={frontmatter.heading}
        subheading={frontmatter.subheading}
        contentComponent={HTMLContent}
        content={html}
        alert={frontmatter.alert}
      />
    </Layout>
  );
};

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object
    })
  })
};

export default IndexPage;

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      html
      frontmatter {
        title
        image
        heading
        subheading
        alert {
          heading
          details
          link
          disabled
        }
      }
    }
  }
`;

// Old image portion of query
// image {
//   childImageSharp {
//     fluid(maxWidth: 2048, quality: 100) {
//       ...GatsbyImageSharpFluid
//     }
//   }
// }
