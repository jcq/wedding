import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import Content, { HTMLContent } from '../components/Content';
import { RsvpForm } from '../pages/rsvp/rsvp-form';

export const RsvpPageTemplate = ({ title, content, contentComponent }) => {
  const PageContent = contentComponent || Content;

  return (
    <section className="section">
      <h2 className="title">{title}</h2>
      <PageContent className="content" content={content} />
      <RsvpForm />
    </section>
  );
};

RsvpPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func
};

const RsvpPage = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout>
      <RsvpPageTemplate
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        content={post.html}
      />
    </Layout>
  );
};

RsvpPage.propTypes = {
  data: PropTypes.object.isRequired
};

export default RsvpPage;

export const rsvpPageQuery = graphql`
  query RsvpPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
      }
    }
  }
`;
