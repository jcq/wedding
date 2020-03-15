import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import Content, { HTMLContent } from '../components/Content';
import { Card } from 'react-bootstrap';
import { ImageHeader } from '../components/ImageHeader';

import styles from './faq-page.module.scss';

export const CovidPageTemplate = ({
  title,
  content,
  contentComponent,
  featuredImage
}) => {
  const PageContent = contentComponent || Content;

  return (
    <section className="section">
      <ImageHeader image={featuredImage} alignItems="end">
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

CovidPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func
};

const CovidPage = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout>
      <CovidPageTemplate
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        content={post.html}
        featuredImage={post.frontmatter.featuredImage}
      />
    </Layout>
  );
};

CovidPage.propTypes = {
  data: PropTypes.object.isRequired
};

export default CovidPage;

export const covidPageQuery = graphql`
  query CovidPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        featuredImage
      }
    }
  }
`;
