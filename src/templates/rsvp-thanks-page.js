import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import Content, { HTMLContent } from '../components/Content';
import { Card } from 'react-bootstrap';

export const RsvpThanksPageTemplate = ({
  title,
  content,
  contentComponent
}) => {
  const PageContent = contentComponent || Content;

  return (
    <section className="section">
      <h2 className="title text-primary">{title}</h2>
      <Card>
        <Card.Body>
          <PageContent className="content" content={content} />
        </Card.Body>
      </Card>
    </section>
  );
};

RsvpThanksPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func
};

const RsvpThanksPage = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout>
      <RsvpThanksPageTemplate
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        content={post.html}
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
      }
    }
  }
`;
