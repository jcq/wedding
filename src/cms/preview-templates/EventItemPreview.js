import React from 'react';
import PropTypes from 'prop-types';
import { CmsLayout } from '../CmsLayout';
import EventItem from '../../components/events/event-item';
import marked from 'marked';

const EventItemPreview = ({ entry }) => {
  const event = {
    title: entry.getIn(['data', 'title']),
    start: entry.getIn(['data', 'start']),
    end: entry.getIn(['data', 'end']),
    location: entry.getIn(['data', 'location']),
    address: entry.getIn(['data', 'address']),
    body: marked(entry.getIn(['data', 'body']))
  };

  return (
    <CmsLayout>
      <EventItem event={event} />
    </CmsLayout>
  );
};

EventItemPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func
  }),
  widgetFor: PropTypes.func
};

export default EventItemPreview;
