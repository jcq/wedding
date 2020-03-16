import React from 'react';
import PropTypes from 'prop-types';
import { IndexPageTemplate } from '../../templates/index-page';
import { CmsLayout } from '../CmsLayout';

const IndexPagePreview = ({ entry, widgetFor }) => {
  const data = entry.getIn(['data']).toJS();

  if (data) {
    return (
      <CmsLayout>
        <IndexPageTemplate
          image={data.image}
          title={data.title}
          heading={data.heading}
          subheading={data.subheading}
          alert={data.alert}
          content={widgetFor('body')}
        />
      </CmsLayout>
    );
  } else {
    return <div>Loading...</div>;
  }
};

IndexPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func
  }),
  getAsset: PropTypes.func
};

export default IndexPagePreview;
