import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import Content, { HTMLContent } from '../components/Content';
import { Card, Button } from 'react-bootstrap';
import { ImageHeader } from '../components/ImageHeader';
import Helmet from 'react-helmet';

export const ShopPageTemplate = ({
  title,
  content,
  contentComponent,
  featuredImage
}) => {
  const PageContent = contentComponent || Content;

  return (
    <section className="section">
      <Helmet
        script={[
          {
            type: 'text/javascript',
            innerHTML:
              '!function(e,t,n){var s,a=e.getElementsByTagName(t)[0];e.getElementById(n)||(s=e.createElement(t),s.id=n,s.async=!0,s.src="https://widget.zola.com/js/widget.js",a.parentNode.insertBefore(s,a))}(document,"script","zola-wjs")'
          }
        ]}
      ></Helmet>
      <ImageHeader
        image={featuredImage}
        alignItems="end"
        className="align-items-md-center"
      >
        <h1>{title}</h1>
      </ImageHeader>

      <Card>
        <Card.Body>
          <PageContent className="content" content={content} />
          {/* <a
            className="zola-registry-embed"
            href="www.zola.com/registry/megan-jc"
            data-registry-key="megan-jc"
          >
            Our Zola Wedding Registry
          </a> */}
          {/* <iframe title="Zola Registry" id="zola-registry-iframe-6580837651844" src="https://widget.zola.com/v1/widget/registry/megan-jc/html?" className="zola-registry-iframe" data-registry-key="megan-jc" width="100%" frameBorder="0" scrolling="no"></iframe> */}
          <div className="text-center">
            <Button
              variant="secondary"
              size="lg"
              as="a"
              href="https://www.zola.com/registry/miraglia-quirin-2020"
              target="_blank"
              rel="noopener noreferrer"
            >
              Go to Registry
            </Button>
          </div>
        </Card.Body>
      </Card>
    </section>
  );
};

ShopPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
  featuredImage: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
};

const ShopPage = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout>
      <ShopPageTemplate
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        content={post.html}
        featuredImage={post.frontmatter.featuredImage}
      />
    </Layout>
  );
};

ShopPage.propTypes = {
  data: PropTypes.object.isRequired
};

export default ShopPage;

export const shopPageQuery = graphql`
  query ShopPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        featuredImage
      }
    }
  }
`;
