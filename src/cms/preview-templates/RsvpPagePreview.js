import React from 'react';
import PropTypes from 'prop-types';
import { RsvpPageTemplate } from '../../templates/rsvp-page';
import { CmsLayout } from '../CmsLayout';

const RsvpPagePreview = ({ entry, widgetFor }) => (
  <CmsLayout>
    <RsvpPageTemplate
      title={entry.getIn(['data', 'title'])}
      content={widgetFor('body')}
    />
  </CmsLayout>
);

RsvpPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func
  }),
  widgetFor: PropTypes.func
};

export default RsvpPagePreview;
