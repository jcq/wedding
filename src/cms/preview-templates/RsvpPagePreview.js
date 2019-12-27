import React from 'react'
import PropTypes from 'prop-types'
import { RsvpPageTemplate } from '../../templates/rsvp-page'

const RsvpPagePreview = ({ entry, widgetFor }) => (
  <RsvpPageTemplate
    title={entry.getIn(['data', 'title'])}
    content={widgetFor('body')}
  />
)

RsvpPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
}

export default RsvpPagePreview
