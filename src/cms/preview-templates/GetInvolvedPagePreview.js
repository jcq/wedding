import React from 'react';
import PropTypes from 'prop-types';
import { GetInvolvedPageTemplate } from '../../templates/get-involved-page';
import { CmsLayout } from '../CmsLayout';

const GetInvolvedPagePreview = ({ entry, widgetFor }) => {
  const entryWhereToStay = entry.getIn(['data', 'where_to_stay']);
  const where_to_stay = entryWhereToStay ? entryWhereToStay.toJS() : [];
  const entryThingsToDo = entry.getIn(['data', 'things_to_do']);
  const things_to_do = entryThingsToDo ? entryThingsToDo.toJS() : [];

  return (
    <CmsLayout>
      <GetInvolvedPageTemplate
        title={entry.getIn(['data', 'title'])}
        content={widgetFor('body')}
        featuredImage={entry.getIn(['data', 'featuredImage'])}
        where_to_stay={where_to_stay}
        things_to_do={things_to_do}
      />
    </CmsLayout>
  );
};

GetInvolvedPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func
  }),
  widgetFor: PropTypes.func
};

export default GetInvolvedPagePreview;
