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
  event_items
}) => {
  const PageContent = contentComponent || Content;

  return (
    <section className="section">
      <ImageHeader image={featuredImage}>
        <h1>{title}</h1>
      </ImageHeader>
      {content && (
        <Card>
          {heading && <Card.Title>{heading}</Card.Title>}
          <Card.Body>
            <PageContent className="content" content={content} />
          </Card.Body>
        </Card>
      )}

      <Row className="justify-content-center mt-4">
        {event_items.map(({ title, start, end, location, address, body }) => (
          <Col key={title}>
            <EventItem
              title={title}
              start={start}
              end={end}
              body={body}
              location={location}
              address={address}
            />
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
  event_items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      start: PropTypes.string,
      end: PropTypes.string,
      location: PropTypes.string,
      address: PropTypes.string,
      description: PropTypes.string,
      featuredevent: PropTypes.string,
      featuredimage: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
      body: PropTypes.string
    })
  )
};

const EventsPage = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout>
      <EventsPageTemplate
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        heading={post.frontmatter.heading}
        content={post.html}
        event_items={post.frontmatter.event_items}
        featuredImage={post.frontmatter.featuredImage}
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
    markdownRemark(id: { eq: $id }) {
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
        }
      }
    }
  }
`;
