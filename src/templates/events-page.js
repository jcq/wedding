import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import Content, { HTMLContent } from '../components/Content';
import { EventItem } from '../components/events/event-item';
import { Row, Col, Card } from 'react-bootstrap';

export const EventsPageTemplate = ({
  title,
  content,
  contentComponent,
  event_items
}) => {
  const PageContent = contentComponent || Content;

  return (
    <section className="section">
      <h2 className="title text-white">{title}</h2>
      {content && (
        <Card>
          <Card.Body>
            <PageContent className="content" content={content} />
          </Card.Body>
        </Card>
      )}

      <Row className="justify-content-center mt-4">
        {event_items.map(({ title, date, location, address, body }) => (
          <Col key={title}>
            <EventItem
              title={title}
              date={date}
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
  content: PropTypes.string,
  contentComponent: PropTypes.func,
  event_items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      date: PropTypes.string,
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
        content={post.html}
        event_items={post.frontmatter.event_items}
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
        event_items {
          title
          date
          location
          address
          description
        }
      }
    }
  }
`;
