import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import Content, { HTMLContent } from '../components/Content';
import { EventItem } from '../components/events/event-item';
import { Row, Col } from 'react-bootstrap';



export const EventsPageTemplate = ({ title, content, contentComponent, event_items }) => {
  const PageContent = contentComponent || Content;

  console.log('EventsPageTemplate', event_items)

  return (
    <section className="section">
      <h2 className="title">{title}</h2>
      <PageContent className="content" content={content} />
      <Row>
        {
          event_items.map(({id, title, date, body}) => (
            <Col key={id}><EventItem title={title} date={date} body={body} /></Col>
          ))
        }
      </Row>
    </section>
  );
};

EventsPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
  event_items: PropTypes.shape({
    title: PropTypes.string,
    date: PropTypes.string,
    description: PropTypes.string,
    featuredevent: PropTypes.string,
    featuredimage: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    body: PropTypes.string
  })
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
          date(formatString: "MMMM DD, HH:mm")
          description
        }
      }
    }
  }
`;
