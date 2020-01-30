import React from 'react';
import PropTypes from 'prop-types';
import { ShopPageTemplate } from '../../templates/about-page';
import { CmsLayout } from '../CmsLayout';

const ShopPagePreview = ({ entry, widgetFor }) => (
  <CmsLayout>
    <ShopPageTemplate
      title={entry.getIn(['data', 'title'])}
      content={widgetFor('body')}
    />
  </CmsLayout>
);

ShopPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func
  }),
  widgetFor: PropTypes.func
};

export default ShopPagePreview;
