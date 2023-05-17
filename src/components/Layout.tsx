import * as React from "react";
import { useStaticQuery, graphql } from "gatsby";

import Header from "./Header";
import "../styles/layout.css";

const Layout = ({ children }) => {
	const data = useStaticQuery(graphql`
		query SiteTitleQuery {
			site {
				siteMetadata {
					title
				}
			}
		}
	`);

	return (
		<>
			<meta
				name="robots"
				content="noindex,nofollow"
				charSet="UTF-8"
			></meta>
			<Header siteTitle={data.site.siteMetadata.title} />
			<div
				style={{
					margin: `0 auto`,
					maxWidth: 960,
					padding: `0 1.0875rem 1.45rem`,
				}}
			>
				<main>{children}</main>
			</div>
		</>
	);
};

export default Layout;
