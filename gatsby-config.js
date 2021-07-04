const path = require('path');
require('dotenv').config();

module.exports = {
  siteMetadata: {
    title: 'Miraglia / Quirin 2020',
    description:
      'Megan Miraglia & JC Quirin: Stronger Together'
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sass',
    {
      // keep as first gatsby-source-filesystem plugin for gatsby image support
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/static/img`,
        name: 'uploads'
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages'
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/img`,
        name: 'images'
      }
    },
    {
      resolve: 'gatsby-transformer-cloudinary',
      options: {
        cloudName: process.env.CLOUDINARY_CLOUD_NAME,
        apiKey: process.env.CLOUDINARY_API_KEY,
        apiSecret: process.env.CLOUDINARY_API_SECRET,

        // This folder will be created if it doesn’t exist.
        uploadFolder: 'gatsby-cloudinary'
      }
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          // {
          //   resolve: 'gatsby-remark-relative-images',
          //   options: {
          //     name: 'uploads',
          //   },
          // },
          {
            resolve: 'gatsby-remark-images-anywhere',
            options: {
              staticDir: 'static',
              // createMarkup: ({
              //   src,
              //   srcSet,
              //   sizes,
              //   aspectRatio,
              //   alt,
              //   base64,
              //   presentationWidth
              // }) => {
              //   return `<custom-image src="${src}" srcset="${srcSet}" sizes="${sizes}" aspectratio="${aspectRatio}" alt="${alt}" base64="${base64}" presentationwidth="${presentationWidth}"></custom-image>`;
              // },
              sharpMethod: 'fluid'
              // Additional sharp image arguments: https://www.gatsbyjs.org/packages/gatsby-plugin-sharp/
              // maxWidth: 650,
            }
          },
          // {
          //   resolve: 'gatsby-remark-images',
          //   options: {
          //     // It's important to specify the maxWidth (in pixels) of
          //     // the content container as this plugin uses this as the
          //     // base for generating different widths of each image.
          //     maxWidth: 2048
          //   }
          // },
          {
            resolve: 'gatsby-remark-copy-linked-files',
            options: {
              destinationDir: 'static'
            }
          },
          {
            resolve: 'gatsby-remark-google-analytics-track-links',
            options: {
              // target: "someValue",
              // rel: "noopener noreferrer",
              // className: "theClassIdLikeInstead"
            }
          },
          {
            resolve: 'gatsby-plugin-anchor-links',
            options: {}
          }
          // {
          //   resolve: 'gatsby-remark-external-links',
          //   options: {
          //     target: '_blank',
          //     rel: 'nofollow'
          //   }
          // }
        ]
      }
    },
    {
      resolve: 'gatsby-plugin-netlify-cms',
      options: {
        modulePath: `${__dirname}/src/cms/cms.js`
      }
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-158282710-1'
      }
    },
    // {
    //   resolve: 'gatsby-plugin-purgecss', // purges all unused/unreferenced css rules
    //   options: {
    //     develop: true, // Activates purging in npm run develop
    //     content: [
    //       path.join(process.cwd(), 'node_modules/react-bootstrap/**/!(*.d).{ts,js,jsx,tsx}')
    //     ]
    //     // purgeOnly: ['/all.scss'], // applies purging only on our main css file
    //   },
    // }, // must be after other CSS plugins
    'gatsby-plugin-netlify' // make sure to keep it last in the array
  ]
};
