import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import Content, { HTMLContent } from '../components/Content';
import { EventItem } from '../components/events/event-item';
import { Row, Col, Card } from 'react-bootstrap';
import { ImageHeader } from '../components/ImageHeader';

export const EventsPageTemplate = ({
  title,
  heading,
  content,
  contentComponent,
  featuredImage,
  events
}) => {
  // const PageContent = contentComponent || Content;

  const featured = events.find(i => i.featuredevent);
  const others = events.filter(i => !i.featuredevent);

  return (
    <section className="section">
      <ImageHeader image={featuredImage}>
        <h1>{title}</h1>
      </ImageHeader>

      {/* {content && (
        <Card>
          {heading && <Card.Header as="h3">{heading}</Card.Header>}
          <Card.Body>
            <PageContent className="content" content={content} />
          </Card.Body>
        </Card>
      )} */}

      <EventItem event={featured} />

      <Row className="justify-content-center">
        {others.map(event => (
          <Col key={event.id} className="mt-4">
            <EventItem event={event} />
          </Col>
        ))}
      </Row>
    </section>
  );
};

EventsPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  heading: PropTypes.string,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
  events: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      start: PropTypes.string,
      end: PropTypes.string,
      location: PropTypes.string,
      address: PropTypes.string,
      description: PropTypes.string,
      featuredevent: PropTypes.bool,
      featuredImage: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
      body: PropTypes.string
    })
  )
};

const EventsPage = ({ data }) => {
  const {
    page,
    eventsRemark: { edges }
  } = data;
  const events = edges.map(({ node }) => ({
    id: node.id,
    ...node.frontmatter,
    body: node.html
  }));

  return (
    <Layout>
      <EventsPageTemplate
        contentComponent={HTMLContent}
        title={page.frontmatter.title}
        heading={page.frontmatter.heading}
        content={page.html}
        events={events}
        featuredImage={page.frontmatter.featuredImage}
      />
    </Layout>
  );
};

EventsPage.propTypes = {
  data: PropTypes.object.isRequired
};

export default EventsPage;

export const eventsPageQuery = graphql`
  query EventsPage($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        heading
        featuredImage
        event_items {
          title
          start
          end
          location
          address
          description
          featuredevent
          body
        }
      }
    }
    eventsRemark: allMarkdownRemark(
      filter: { frontmatter: { templateKey: { eq: "events" } } }
      sort: { order: ASC, fields: [frontmatter___start] }
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          html
          frontmatter {
            title
            start
            end
            location
            address
            description
            featuredevent
            featuredImage
          }
        }
      }
    }
  }
`;
