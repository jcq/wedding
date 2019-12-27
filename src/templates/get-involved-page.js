import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'

export const GetInvolvedPageTemplate = ({ title, content, contentComponent }) => {
  const PageContent = contentComponent || Content

  return (
    <section className="section">
      <h2 className="title">{title}</h2>
      <PageContent className="content" content={content} />
    </section>
  )
}

GetInvolvedPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
}

const GetInvolvedPage = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <GetInvolvedPageTemplate
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        content={post.html}
      />
    </Layout>
  )
}

GetInvolvedPage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default GetInvolvedPage

export const getInvolvedPageQuery = graphql`
  query GetInvolvedPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
      }
    }
  }
`
