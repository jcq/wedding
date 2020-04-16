import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import { HTMLContent } from '../components/Content';
import { EventItem } from '../components/events/event-item';
import { CardDeck } from 'react-bootstrap';
import { ImageHeader } from '../components/ImageHeader';

export const EventsPageTemplate = ({ title, featuredImage, events }) => {
  const featured = events.find(i => i.featuredevent);
  const others = events.filter(i => !i.featuredevent);

  return (
    <section className="section">
      <ImageHeader image={featuredImage} alignItems="end">
        <h1>{title}</h1>
      </ImageHeader>

      <EventItem event={featured} />

      {/* <CardDeck className="mt-3">
        {others.map(event => (
          <EventItem event={event} key={event.id} />
        ))}
      </CardDeck> */}
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
            url
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
