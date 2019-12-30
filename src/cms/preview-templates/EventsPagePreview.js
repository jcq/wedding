import React from 'react';
import PropTypes from 'prop-types';
import { EventsPageTemplate } from '../../templates/events-page';
import { CmsLayout } from '../CmsLayout';

const EventsPagePreview = ({ entry, widgetFor }) => {
  const entryEventItems = entry.getIn(['data', 'event_items']);
  const eventItems = entryEventItems ? entryEventItems.toJS() : [];

  return (
    <CmsLayout>
      <EventsPageTemplate
        title={entry.getIn(['data', 'title'])}
        content={widgetFor('body')}
        event_items={eventItems}
      />
    </CmsLayout>
  );
};

EventsPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func
  }),
  widgetFor: PropTypes.func
};

export default EventsPagePreview;
