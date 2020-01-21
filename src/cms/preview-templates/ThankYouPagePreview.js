import React from 'react';
import PropTypes from 'prop-types';
import { CmsLayout } from '../CmsLayout';
import { RsvpThanksPageTemplate } from '../../templates/rsvp-thanks-page';

const ThankYouPagePreview = ({ entry, widgetFor }) => (
  <CmsLayout>
    <RsvpThanksPageTemplate
      title={entry.getIn(['data', 'title'])}
      content={widgetFor('body')}
    />
  </CmsLayout>
);

ThankYouPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func
  }),
  widgetFor: PropTypes.func
};

export default ThankYouPagePreview;
