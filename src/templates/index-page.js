import React from 'react';
import PropTypes from 'prop-types';
import { Link, graphql } from 'gatsby';

import Content, { HTMLContent } from '../components/Content';

import Layout from '../components/Layout';
import { Image, Button } from 'react-bootstrap';

export const IndexPageTemplate = ({
  title,
  subheading,
  image,
  contentComponent,
  content
}) => {
  const PageContent = contentComponent || Content;

  // const jumbotronStyles = {
  //   backgroundImage: `url(${
  //     !!image.childImageSharp ? image.childImageSharp.fluid.src : image
  //   })`,
  //   backgroundRepeat: 'no-repeat',
  //   backgroundSize: '100%',
  //   minHeight: '350px',
  //   color: '#fff'
  // };

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
      {content && (
        <PageContent className="content text-center mt-3" content={content} />
      )}
      <p className="text-center">
        <Button as={Link} to="/rsvp" variant="danger">
          RSVP by April 27, 2020
        </Button>
      </p>
    </div>
  );
};

IndexPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  heading: PropTypes.string,
  subheading: PropTypes.string,
  content: PropTypes.string
};

const IndexPage = ({ data }) => {
  const { frontmatter, html } = data.markdownRemark;

  return (
    <Layout>
      <IndexPageTemplate
        image={frontmatter.image}
        title={frontmatter.title}
        heading={frontmatter.heading}
        subheading={frontmatter.subheading}
        contentComponent={HTMLContent}
        content={html}
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
      html
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
