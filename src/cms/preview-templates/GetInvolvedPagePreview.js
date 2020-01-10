import React from 'react';
import PropTypes from 'prop-types';
import { GetInvolvedPageTemplate } from '../../templates/get-involved-page';
import { CmsLayout } from '../CmsLayout';

const GetInvolvedPagePreview = ({ entry, widgetFor }) => (
  <CmsLayout>
    <GetInvolvedPageTemplate
      title={entry.getIn(['data', 'title'])}
      content={widgetFor('body')}
    />
  </CmsLayout>
);

GetInvolvedPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func
  }),
  widgetFor: PropTypes.func
};

export default GetInvolvedPagePreview;
