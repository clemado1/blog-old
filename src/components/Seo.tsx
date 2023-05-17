/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import * as React from "react";
import { useStaticQuery, graphql } from "gatsby";

const SEO = ({ description, title, children }) => {
	const { site } = useStaticQuery(
		graphql`
			query {
				site {
					siteMetadata {
						title
						description
					}
				}
			}
		`,
	);

	const metaDescription = description || site.siteMetadata.description;

	return (
		<>
		  	<title>{`${title} | ${site.siteMetadata.title}`}</title>
		  	<meta name="description" content={metaDescription} />
		  	<meta property="og:title" content={title} />
		  	<meta property="og:title" content={title} />
			<meta property="og:description" content={metaDescription} />
			<meta property="og:type" content="website" />
			{children}
		</>
	  );
}


export default SEO;