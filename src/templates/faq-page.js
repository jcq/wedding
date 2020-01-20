import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import Content, { HTMLContent } from '../components/Content';
import { Card } from 'react-bootstrap';

export const FaqPageTemplate = ({ title, content, contentComponent }) => {
  const PageContent = contentComponent || Content;

  return (
    <section className="section">
      <h2 className="title text-white">{title}</h2>
      <Card>
        <Card.Body>
          <PageContent className="content" content={content} />
        </Card.Body>
      </Card>
    </section>
  );
};

FaqPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func
};

const FaqPage = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout>
      <FaqPageTemplate
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        content={post.html}
      />
    </Layout>
  );
};

FaqPage.propTypes = {
  data: PropTypes.object.isRequired
};

export default FaqPage;

export const faqPageQuery = graphql`
  query FaqPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
      }
    }
  }
`;
