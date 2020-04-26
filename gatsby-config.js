module.exports = {
	siteMetadata: {
		title: `belye nochi`,
		description: ``,
		author: `clemado1`,
		interest: [`Web Development`, `rust`, `Web Assembly`],
	},
	plugins: [
		`gatsby-plugin-typescript`,
		{
			resolve: `gatsby-plugin-generate-typings`,
			options: {
				dest: `./src/graphql-types.d.ts`,
			},
		},
		`gatsby-plugin-react-helmet`,
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				name: `assets`,
				path: `${__dirname}/assets`,
			},
		},
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				name: `posts`,
				path: `${__dirname}/posts`,
			},
		},
		`gatsby-plugin-postcss`,
		`gatsby-transformer-remark`,
		`gatsby-transformer-sharp`,
		`gatsby-plugin-sharp`,
		{
			resolve: `gatsby-plugin-manifest`,
			options: {
				name: `belye nochi`,
				short_name: `belye nochi`,
				start_url: `/`,
				background_color: `#663399`,
				theme_color: `#663399`,
				display: `minimal-ui`,
				icon: `src/images/favicon.png`, // This path is relative to the root of the site.
			},
		},
		// this (optional) plugin enables Progressive Web App + Offline functionality
		// To learn more, visit: https://gatsby.dev/offline
		// `gatsby-plugin-offline`,
	],
};
