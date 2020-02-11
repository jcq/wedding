import React from 'react';
import Img from 'gatsby-image';
import { useStaticQuery, graphql } from 'gatsby';

export const Hero = () => {
  const data = useStaticQuery(graphql`
    query {
      file(name: { eq: "jc-megan" }) {
        childCloudinaryAsset {
          fluid {
            aspectRatio
            base64
            sizes
            src
            srcSet
          }
        }
      }
    }
  `);
  const image = data?.file?.childCloudinaryAsset;

  return image ? <Img fluid={image.fluid} alt="Megan and JC" /> : null;
};
