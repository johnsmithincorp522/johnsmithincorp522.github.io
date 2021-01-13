module.exports = {
  siteMetadata: {
     siteUrl: `https://thetechreview.tk`,
	    },
     plugins: [`gatsby-plugin-feed`],
  plugins: [
    {
      resolve: `gatsby-source-wordpress-experimental`,
      options: {
        url:
          `http://webtenders-server.ddns.net/graphql`,
        schema: {
         requestConcurrency: 25,
         previewRequestConcurrency: 20,
       }
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `assets`,
        path: `${__dirname}/content/assets`,
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
              site {
              siteMetadata {
              title
              description
              siteUrl
                  }
              }
          }
        `,
      feeds: [
          {
          serialize: ({ query: { site, allWpPost } }) => {
          return allWpPost.edges.map(edge => {
          return Object.assign({}, edge.node, {
          description: edge.node.excerpt,
          date: edge.node.date,
          url: site.siteMetadata.siteUrl + edge.node.slug,
          guid: site.siteMetadata.siteUrl + edge.node.slug,
          custom_elements: [{ "content:encoded": edge.node.content }],
            })
           })
          },
      query: ` {
	                allWpPost(sort: {order: DESC, fields: date}) {
	                   edges {
                             node {
                               date
                               title
                               content
                        excerpt
                         slug
			 }
                        }
                  }
                }
              `,
      output: "/rss.xml",
      title: `RSS Feed`,
           },
       ],
      },
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: [
          "G-2CBQ6PWNJG", // Google Analytics / GA
        ],
      },
    },

  {
    resolve: "gatsby-plugin-google-tagmanager",
    options: {
      id: "GTM-NFMBKW5",
      includeInDevelopment: false,
      defaultDataLayer: { platform: "gatsby" },

    },
  },
  {
    resolve: `gatsby-plugin-sharp`,
    options: {
       // Available options and their defaults:
       base64Width: 20,
       forceBase64Format: `webp`, // valid formats: png,jpg,webp
       useMozJpeg: process.env.GATSBY_JPEG_ENCODER === `MOZJPEG`,
       stripMetadata: true,
       defaultQuality: 50,
       failOnError: true,
    },
  },

 /*  {
     resolve: `gatsby-theme-i18n`,
     options: {
       defaultLang: `zh`,
       configPath: require.resolve(`./i18n/config.json`),
     },
   }, */

    /**
     * The following two plugins are required if you want to use Gatsby image
     * See https://www.gatsbyjs.com/docs/gatsby-image/#setting-up-gatsby-image
     * if you're curious about it.
     */
    `gatsby-transformer-sharp`,

    {
      // See https://www.gatsbyjs.com/plugins/gatsby-plugin-manifest/?=gatsby-plugin-manifest
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Gaming Origin`,
        short_name: `GO`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `content/assets/gatsby-icon.png`,
      },
    },

    // See https://www.gatsbyjs.com/plugins/gatsby-plugin-react-helmet/?=gatsby-plugin-react-helmet
    `gatsby-plugin-react-helmet`,

    /**
     * this (optional) plugin enables Progressive Web App + Offline functionality
     * To learn more, visit: https://gatsby.dev/offline
     */
     `gatsby-plugin-offline`,
  ],
}
