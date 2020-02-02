import React from 'react';
import PropTypes from 'prop-types';
import { AboutPageTemplate } from '../../templates/about-page';
import { CmsLayout } from '../CmsLayout';

const AboutPagePreview = ({ entry, widgetFor }) => (
  <CmsLayout>
    <AboutPageTemplate
      title={entry.getIn(['data', 'title'])}
      content={widgetFor('body')}
      featuredImage={entry.getIn(['data', 'featuredImage'])}
    />
  </CmsLayout>
);

AboutPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func
  }),
  widgetFor: PropTypes.func
};

export default AboutPagePreview;
