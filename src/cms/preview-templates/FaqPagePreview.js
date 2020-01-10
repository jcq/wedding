import React from 'react';
import PropTypes from 'prop-types';
import { FaqPageTemplate } from '../../templates/faq-page';
import { CmsLayout } from '../CmsLayout';

const FaqPagePreview = ({ entry, widgetFor }) => (
  <CmsLayout>
    <FaqPageTemplate
      title={entry.getIn(['data', 'title'])}
      content={widgetFor('body')}
    />
  </CmsLayout>
);

FaqPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func
  }),
  widgetFor: PropTypes.func
};

export default FaqPagePreview;
