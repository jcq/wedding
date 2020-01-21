import React from 'react';
import PropTypes from 'prop-types';
import { graphql, navigate } from 'gatsby';
import Layout from '../components/Layout';
import Content, { HTMLContent } from '../components/Content';
import { RsvpForm } from '../components/rsvp/rsvp-form';
import { Card } from 'react-bootstrap';

export const RsvpPageTemplate = ({
  title,
  content,
  notesPlaceholder,
  contentComponent
}) => {
  const PageContent = contentComponent || Content;

  return (
    <section className="section">
      <h2 className="title text-white">{title}</h2>
      <Card>
        <Card.Body>
          <Card.Title>
            <PageContent className="content" content={content} />
          </Card.Title>
          <RsvpForm
            notesPlaceholder={notesPlaceholder}
            onSubmit={() => navigate('/rsvp/thanks')}
          />
        </Card.Body>
      </Card>
    </section>
  );
};

RsvpPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
  notesPlaceholder: PropTypes.string
};

const RsvpPage = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout>
      <RsvpPageTemplate
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        content={post.html}
        notesPlaceholder={post.frontmatter.notes_placeholder}
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
        notes_placeholder
      }
    }
  }
`;
