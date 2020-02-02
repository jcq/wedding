import React from 'react';
import PropTypes from 'prop-types';
import { RsvpPageTemplate } from '../../templates/rsvp-page';
import { CmsLayout } from '../CmsLayout';
import { RsvpContextProvider } from '../../components/rsvp/RsvpContext';

const RsvpPagePreview = ({ entry, widgetFor }) => {
  const initialState = {
    notesPlaceholder: entry.getIn(['data', 'notesPlaceholder']),
    attending_msg: entry.getIn(['data', 'attending_msg']),
    not_attending_msg: entry.getIn(['data', 'not_attending_msg'])
  };

  return (
    <CmsLayout>
      <RsvpContextProvider initialState={initialState}>
        <RsvpPageTemplate
          title={entry.getIn(['data', 'title'])}
          content={widgetFor('body')}
          featuredImage={entry.getIn(['data', 'featuredImage'])}
        />
      </RsvpContextProvider>
    </CmsLayout>
  );
};

RsvpPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func
  }),
  widgetFor: PropTypes.func
};

export default RsvpPagePreview;
