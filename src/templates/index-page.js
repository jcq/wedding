import React from 'react';
import PropTypes from 'prop-types';
import { Link, graphql } from 'gatsby';

import Layout from '../components/Layout';
import Features from '../components/Features';
import BlogRoll from '../components/BlogRoll';
import { Jumbotron, Image } from 'react-bootstrap';

export const IndexPageTemplate = ({ title, subheading, image, body }) => {
  const jumbotronStyles = {
    backgroundImage: `url(${
      !!image.childImageSharp ? image.childImageSharp.fluid.src : image
    })`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100%',
    minHeight: '350px',
    color: '#fff'
  };

  return (
    // <Jumbotron fluid style={jumbotronStyles}>
    //   {/* <Image fluid src={!!image.childImageSharp ? image.childImageSharp.fluid.src : image} /> */}
    //   <h1>{title}</h1>
    // </Jumbotron>
    <div>
      <Image
        fluid
        src={!!image.childImageSharp ? image.childImageSharp.fluid.src : image}
      />
      {title && <h1 className="text-center">{title}</h1>}
      {subheading && <h3 className="text-center">{subheading}</h3>}
      {body && <div className="copy">{body}</div>}
    </div>
  );
};

IndexPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  heading: PropTypes.string,
  subheading: PropTypes.string,
  body: PropTypes.string
};

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;

  return (
    <Layout>
      <IndexPageTemplate
        image={frontmatter.image}
        title={frontmatter.title}
        heading={frontmatter.heading}
        subheading={frontmatter.subheading}
        mainpitch={frontmatter.mainpitch}
        description={frontmatter.description}
        intro={frontmatter.intro}
      />
    </Layout>
  );
};

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object
    })
  })
};

export default IndexPage;

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        title
        image
        heading
        subheading
      }
    }
  }
`;

// Old image portion of query
// image {
//   childImageSharp {
//     fluid(maxWidth: 2048, quality: 100) {
//       ...GatsbyImageSharpFluid
//     }
//   }
// }