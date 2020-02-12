import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import Content, { HTMLContent } from '../components/Content';
import { Card } from 'react-bootstrap';
import { WhereToStay } from '../components/get-involved/WhereToStay';
import { ImageHeader } from '../components/ImageHeader';
import { ThingsToDo } from '../components/get-involved/ThingsToDo';
import styles from './get-involved-page.module.scss'

export const GetInvolvedPageTemplate = ({
  title,
  content,
  contentComponent,
  featuredImage,
  where_to_stay,
  thingsToDo
}) => {
  const PageContent = contentComponent || Content;

  return (
    <section className="section">
      <ImageHeader image={featuredImage} alignItems="center">
        <h1>{title}</h1>
      </ImageHeader>

      <Card>
        <Card.Header as="h4">How to Get Around</Card.Header>
        <Card.Body>
          <PageContent className={styles.content} content={content} />
        </Card.Body>
      </Card>
      <WhereToStay {...where_to_stay} className="mt-4" />
      {thingsToDo?.heading && <ThingsToDo {...thingsToDo} className="mt-4" />}
    </section>
  );
};

GetInvolvedPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func
};

const GetInvolvedPage = ({ data }) => {
  const { markdownRemark: page, thingsToDoRemark } = data;
  const thingsToDo = {
    heading: thingsToDoRemark.frontmatter.heading,
    body: thingsToDoRemark.html
  };

  return (
    <Layout>
      <GetInvolvedPageTemplate
        contentComponent={HTMLContent}
        title={page.frontmatter.title}
        content={page.html}
        featuredImage={page.frontmatter.featuredImage}
        where_to_stay={page.frontmatter.where_to_stay}
        thingsToDo={thingsToDo}
      />
    </Layout>
  );
};

GetInvolvedPage.propTypes = {
  data: PropTypes.object.isRequired
};

export default GetInvolvedPage;

export const getInvolvedPageQuery = graphql`
  query GetInvolvedPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        featuredImage
        where_to_stay {
          heading
          body
          hotels {
            name
            url
            phone
            distance
            address
            notes
          }
        }
      }
    }
    thingsToDoRemark: markdownRemark(
      frontmatter: { templateKey: { eq: "things-to-do" } }
    ) {
      id
      html
      frontmatter {
        heading
      }
    }
  }
`;
