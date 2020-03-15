import React from 'react';
import PropTypes from 'prop-types';
import { CovidPageTemplate } from '../../templates/covid-page';
import { CmsLayout } from '../CmsLayout';

const CovidPagePreview = ({ entry, widgetFor }) => (
  <CmsLayout>
    <CovidPageTemplate
      title={entry.getIn(['data', 'title'])}
      content={widgetFor('body')}
      featuredImage={entry.getIn(['data', 'featuredImage'])}
    />
  </CmsLayout>
);

CovidPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func
  }),
  widgetFor: PropTypes.func
};

export default CovidPagePreview;
