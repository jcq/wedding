import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import Content, { HTMLContent } from '../components/Content';
import { Card } from 'react-bootstrap';
import { ImageHeader } from '../components/ImageHeader';

import styles from './ty-page.module.scss';

export const RsvpThanksPageTemplate = ({
  title,
  content,
  contentComponent,
  featuredImage
}) => {
  const PageContent = contentComponent || Content;

  return (
    <section className="section">
      <ImageHeader image={featuredImage}>
        <h1>{title}</h1>
      </ImageHeader>

      <Card>
        <Card.Body>
          <PageContent className={styles.content} content={content} />
        </Card.Body>
      </Card>
    </section>
  );
};

RsvpThanksPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
  featuredImage: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
};

const RsvpThanksPage = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout>
      <RsvpThanksPageTemplate
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        content={post.html}
        featuredImage={post.frontmatter.featuredImage}
      />
    </Layout>
  );
};

RsvpThanksPage.propTypes = {
  data: PropTypes.object.isRequired
};

export default RsvpThanksPage;

export const rsvpThanksPageQuery = graphql`
  query RsvpThanksPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        featuredImage
      }
    }
  }
`;
