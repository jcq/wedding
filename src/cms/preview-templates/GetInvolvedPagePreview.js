import React from 'react'
import PropTypes from 'prop-types'
import { GetInvolvedPageTemplate } from '../../templates/get-involved-page'

const GetInvolvedPagePreview = ({ entry, widgetFor }) => (
  <GetInvolvedPageTemplate
    title={entry.getIn(['data', 'title'])}
    content={widgetFor('body')}
  />
)

GetInvolvedPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
}

export default GetInvolvedPagePreview
