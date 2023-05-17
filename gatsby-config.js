module.exports = {
	siteMetadata: {
		title: `belye nochi`,
		description: ``,
		author: {
			name: `clemado1`,
			summary: ``,
		},
		interest: [`web development`, `rust`, `wasm`, `book`],
	},
	plugins: [

		`gatsby-plugin-image`,
		{
		  resolve: `gatsby-source-filesystem`,
		  options: {
			name: `posts`,
			path: `${__dirname}/posts`,
		  },
		},
		{
		  resolve: `gatsby-source-filesystem`,
		  options: {
			name: `assets`,
			path: `${__dirname}/assets`,
		  },
		},
		'gatsby-plugin-postcss',
		{
		  resolve: `gatsby-transformer-remark`,
		  options: {
			plugins: [
			  {
				resolve: `gatsby-remark-images`,
				options: {
				  maxWidth: 630,
				},
			  },
			  {
				resolve: `gatsby-remark-responsive-iframe`,
				options: {
				  wrapperStyle: `margin-bottom: 1.0725rem`,
				},
			  },
			  `gatsby-remark-prismjs`,
			],
		  },
		},
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
	],
};
