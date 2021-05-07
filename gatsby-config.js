module.exports = {
  siteMetadata: {
    title: `Ivie Admin`,
    description: `Ivie A. Backoffice`,
    author: `Simon Dosda`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    {
      resolve: "gatsby-source-strapi",
      options: {
        apiURL: process.env.GATSBY_API_URL,
        contentTypes: ["product"],
        queryLimit: 1000,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
  ],
};
